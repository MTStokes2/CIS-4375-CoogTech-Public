const express = require("express");
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment');
const secret_key = process.env.JWT_SECRET
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporarily stores file
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { fromEnv } = require("@aws-sdk/credential-providers")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")



const router = express.Router();

let {Admins_Model, Custom_Products_Model, Custom_Products_Order_Model} = require('../models/modelAssociations')
let {Products_Model} = require('../models/modelAssociations')
let {Customers_Model} = require('../models/modelAssociations')
let {Status_Model} = require('../models/modelAssociations')
let {State_Model} = require('../models/modelAssociations')
let {City_Model} = require('../models/modelAssociations')
let {Usernames_Model} = require('../models/modelAssociations')
let {Passwords_Model} = require('../models/modelAssociations')
let {Feedback_Model} = require('../models/modelAssociations')
let {Custom_Orders_Model} = require('../models/modelAssociations')
let {Orders_Model} = require('../models/modelAssociations')
let {Order_Products_Model} = require('../models/modelAssociations')

//GET all Admins
router.get('/', (req, res) =>
    Admins_Model.findAll()
    .then(admins => {
        res.json(admins);
    })
    .catch(err => console.log(err)));

// GET all Customers with State and City names
router.get('/Customers', (req, res) => {
    Customers_Model.findAll({
        include: [
            {
                model: State_Model,
                attributes: ['State'],
                where: {
                    StateID: Sequelize.col('CUSTOMERS.StateID')
                },
                required: false // Use 'false' if you want a LEFT JOIN, 'true' for INNER JOIN
            },
            {
                model: City_Model,
                attributes: ['City'],
                where: {
                    CityID: Sequelize.col('CUSTOMERS.CityID')
                },
                required: false // Use 'false' if you want a LEFT JOIN, 'true' for INNER JOIN
            }
        ]
    })
    .then(customers => {
        console.log(customers);
        res.json(customers);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});


//Get Product Details
router.get('/Products/:id', async (req, res) => {
    try {
  
        const ProductDetails = await Products_Model.findOne({
        where: {
            ProductID: req.params.id,
        },
        });

        res.status(200).json({ ProductDetails });

    } catch (err) {
        console.log(err)
    }
  });

//GET all Products
router.get('/Products', (req, res) =>
    Products_Model.findAll()
    .then(products => {
        res.json(products);
    })
    .catch(err => console.log(err)));


// Configure AWS with your credentials
const s3 = new S3Client({
    region: process.env.BUCKET_REGION, // Make sure BUCKET_REGION is defined in your .env file
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Make sure AWS_ACCESS_KEY_ID is defined in your .env file
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Make sure AWS_SECRET_ACCESS_KEY is defined in your .env file
    },
  });
  

// //Add a Product
// router.post('/Products', async (req, res) => {
//     try {
//         //Adds a new Product
//         Products_Model.create(
//             {
//             ProductName: req.body.ProductName,
//             ProductType: req.body.ProductType,
//             ProductColor: req.body.ProductColor,
//             ProductSize: req.body.ProductSize,
//             ProductPrice: req.body.ProductPrice,
//             ProductStock: req.body.ProductStock,
//             ProductImage: req.body.ProductImage
//             })
//         //Sends 200 when and a message that the Product was added
//         res.status(200).json({ message: 'Product Added' });
//     } catch(err) {
//         console.log(err)
//     }
// });
router.post('/Products', async (req, res) => {
    try {
        const { ProductName, ProductType, ProductColor, ProductSize, ProductPrice, ProductStock, ProductImage } = req.body;

        console.log('ProductImage:', ProductImage); // Log the ProductImage to debug

        if (typeof ProductImage !== 'string' || !ProductImage) {
            throw new Error('Invalid or missing image data');
        }

        const matches = ProductImage.match(/^data:(.+);base64,(.*)$/);
        if (!matches) {
            throw new Error('Invalid image data format');
        }

        const contentType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');
        const imageFileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        const s3 = new S3Client({
            region: process.env.BUCKET_REGION,
            credentials: fromEnv(),
        });

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${imageFileName}.${contentType.split('/')[1]}`, // e.g., "imageFileName.jpg"
            Body: buffer,
            ContentType: contentType, // Dynamic based on the image type
        };

        const command = new PutObjectCommand(params);
        const uploadResult = await s3.send(command);

        if (uploadResult.$metadata.httpStatusCode === 200) {
            // The image was uploaded successfully
            const getUrl = new GetObjectCommand(params);
            const imageUrl = await getSignedUrl(s3, getUrl);

            // Create the product with the S3 image URL instead of the base64 string
            const newProduct = await Products_Model.create({
                ProductName,
                ProductType,
                ProductColor,
                ProductSize,
                ProductPrice,
                ProductStock,
                ProductImage: imageUrl, // Store the S3 URL instead of the base64 string
            });

            res.status(200).json({ message: 'Product Added', product: newProduct });
        } else {
            throw new Error('Failed to upload image to S3');
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add product', error: err.message });
    }
});


//Update a Product
router.put('/Products/:id', async (req, res) => {
    try {
  
        const product = await Products_Model.findOne({
        where: {
            ProductID: req.params.id,
        },
        });
        
        if (product) {
        const updatedFields = {};
        const tableFields = ['ProductName', 'ProductType', 'ProductColor', 'ProductSize', 'ProductPrice', 'ProductStock', 'ProductImage'];

        tableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updatedFields[field] = req.body[field];
            }
        });

        Products_Model.update(updatedFields,{
            where: {
            ProductID: product.ProductID
            },
        });

        res.status(200).json({ message: 'Product Updated' });

    }} catch (err) {
        console.log(err)
    }
  });

//Delete a Product
router.delete('/Products', async (req, res) => {
    try {
  
        const product = await Products_Model.findOne({
        where: {
            ProductName: req.body.ProductName,
        },
        });
        
        if (product) {
        Products_Model.destroy(
            {
            where: {
            ProductID: product.ProductID,
            ProductName: req.body.ProductName,
            },
        });

        res.status(200).json({ message: 'Product Deleted' });

    }} catch (err) {
        console.log(err)
    }
  });

//Get All Orders
router.get('/Orders', async (req, res) => {
    try {
        const Orders = await Orders_Model.findAll({
            include: [
                {
                    model: State_Model,
                    attributes: ['State'] // Include only the State attribute from State_Model
                },
                {
                    model: City_Model,
                    attributes: ['City'] // Include only the City attribute from City_Model
                },
                {
                    model: Status_Model,
                    attributes: ['Status'] // Include only the Status attribute from Status_Model
                }
            ]
        });

        if (Orders && Orders.length > 0) {
            res.status(200).json({ Orders });
        } else {
            res.status(401).json({ message: 'No Orders' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Get Order Details
router.get('/Orders/:id', async (req, res) => {
    try {
        const OrderDetails = await Orders_Model.findOne({
            where: {
                OrderID: req.params.id
            },
            include: [
                {
                    model: State_Model,
                    attributes: ['State'] // Include only the State attribute from State_Model
                },
                {
                    model: City_Model,
                    attributes: ['City'] // Include only the City attribute from City_Model
                },
                {
                    model: Status_Model,
                    attributes: ['Status'] // Include only the Status attribute from Status_Model
                }
            ]
        });

        if (OrderDetails) {
            res.status(200).json({ OrderDetails });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Update an Order (Admin)
router.put('/Orders/:id', async (req, res) => {
    try {
  
        const order = await Orders_Model.findOne({
        where: {
            OrderID: req.params.id
        },
        });
        
        if (order) {
        const updatedFields = {};
        const tableFields = ['StatusID', 'CityID', 'StateID', 'ZipCode', 'Address', 'Total', 'DateScheduled','DateDelivered'];

        tableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updatedFields[field] = req.body[field];
            }
        });

        Orders_Model.update(updatedFields,{
            where: {
            OrderID: order.OrderID
            },
        });

        res.status(200).json({ message: 'Order Updated' });

    }} catch (err) {
        console.log(err)
    }
  });

//Delete an Order
router.delete('/Orders/:id', async (req, res) => {
    try {
  
        const order = await Orders_Model.findOne({
        where: {
            OrderID: req.params.id,
        },
        });
        
        if (order) {
        Orders_Model.destroy(
            {
            where: {
            OrderID: order.OrderID
            },
        });

        res.status(200).json({ message: 'Order Deleted' });

    }} catch (err) {
        console.log(err)
    }
  });


//Get All Custom Orders
router.get('/CustomOrders', async (req, res) => {
    try {
        const CustomOrders = await Custom_Orders_Model.findAll({
            include: [
                {
                    model: State_Model,
                    attributes: ['State'] // Include only the State attribute from State_Model
                },
                {
                    model: City_Model,
                    attributes: ['City'] // Include only the City attribute from City_Model
                },
                {
                    model: Status_Model,
                    attributes: ['Status'] // Include only the Status attribute from Status_Model
                }
            ]
        });

        if (CustomOrders && CustomOrders.length > 0) {
            res.status(200).json({ CustomOrders });
        } else {
            res.status(401).json({ message: 'No Custom Orders' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Get Custom Order Details
router.get('/CustomOrders/:id', async (req, res) => {
    try {
        const OrderDetails = await Custom_Orders_Model.findOne({
            where: {
                CustomOrderID: req.params.id
            },
            include: [
                {
                    model: State_Model,
                    attributes: ['State'] // Include only the State attribute from State_Model
                },
                {
                    model: City_Model,
                    attributes: ['City'] // Include only the City attribute from City_Model
                },
/*                 {
                    model: Status_Model,
                    attributes: ['Status'] // Include only the Status attribute from Status_Model
                } */
            ]
        });

        if (OrderDetails) {
            res.status(200).json({ OrderDetails });
        } else {
            res.status(404).json({ message: 'Custom order not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Update a Custom Order (Admin)
router.put('/CustomOrders/:id', async (req, res) => {
    try {
        const customorder = await Custom_Orders_Model.findOne({
            where: {
                CustomOrderID: req.params.id
            },
        });

        if (customorder) {
            const updatedFields = {};
            const tableFields = ['StatusID', 'CityID', 'StateID', 'ZipCode', 'Address', 'Total', 'DateScheduled', 'DateDelivered'];

            tableFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    console.log(`Original ${field} value:`, req.body[field]);
                    if (field === 'DateScheduled' || field === 'DateDelivered') {
                        // Use Moment.js to format the date correctly
                        updatedFields[field] = moment(req.body[field], 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');
                    } else {
                        updatedFields[field] = req.body[field];
                    }
                    console.log(`Formatted ${field} value:`, updatedFields[field]);
                }
            });

            await Custom_Orders_Model.update(updatedFields, {
                where: {
                    CustomOrderID: customorder.CustomOrderID
                },
            });

            res.status(200).json({ message: 'Custom Order Updated' });
        } else {
            res.status(404).json({ message: 'Custom Order not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Delete a Custom Order
router.delete('/CustomOrders/:id', async (req, res) => {
    try {
  
        const customorder = await Custom_Orders_Model.findOne({
        where: {
            CustomOrderID: req.params.id,
        },
        });
        
        if (customorder) {
        Custom_Orders_Model.destroy(
            {
            where: {
            CustomOrderID: customorder.CustomOrderID
            },
        });

        res.status(200).json({ message: 'Custom Order Deleted' });

    }} catch (err) {
        console.log(err)
    }
  });


//Get All Feedback
router.get('/Feedback', (req, res) =>
    Feedback_Model.findAll()
    .then(Feedback => {
        res.json(Feedback);
    })
    .catch(err => console.log(err)));

//Get Feedback Details
router.get('/Feedback/:id', async (req, res) => {
    try {
  
        const FeedbackDetails = await Feedback_Model.findOne({
        where: {
            FeedbackID: req.params.id,
        },
        });

        res.status(200).json({ FeedbackDetails });

    } catch (err) {
        console.log(err)
    }
  });

//Delete Feedback
router.delete('/Feedback/:id', async (req, res) => {
    try {
  
        const feedback = await Feedback_Model.findOne({
        where: {
            FeedbackID: req.params.id,
        },
        });
        
        if (feedback) {
        Feedback_Model.destroy(
            {
            where: {
            FeedbackID: feedback.FeedbackID
            },
        });

        res.status(200).json({ message: 'Feedback Deleted' });

    }} catch (err) {
        console.log(err)
    }
  });


//Add Status
router.post('/Status', async (req, res) => {
    try {
        //Adds a new Status
        Status_Model.create(
            {
            Status: req.body.Status
            })

        res.status(200).json({ message: 'Status Added' });
    } catch(err) {
        console.log(err)
    }
});

//Add City
router.post('/City', async (req, res) => {
    try {
        //Adds a new Status
        City_Model.create(
            {
            City: req.body.City,
            StateID: req.body.StateID
            })

        res.status(200).json({ message: 'City Added' });
    } catch(err) {
        console.log(err)
    }
});

//Add State
router.post('/State', async (req, res) => {
    try {
        //Adds a new Status
        State_Model.create(
            {
            State: req.body.State,
            })

        res.status(200).json({ message: 'State Added' });
    } catch(err) {
        console.log(err)
    }
});

router.post('/AdminSignUp', async (req, res) => {

    try {
  
      const hashedPassword = await bcrypt.hash(req.body.Password, 10)

      const admin = await Admins_Model.create(
        {
        AdminLastName: req.body.AdminLastName,
        AdminFirstName: req.body.AdminFirstName,
        AdminAddress: req.body.AdminAddress,
        AdminPhone: req.body.AdminPhone,
        AdminEmail: req.body.AdminEmail
        });
  
      // Create username for the customer
      const usernames = await Usernames_Model.create({
        AdminID: admin.AdminID,
        Username: req.body.Username
      });
  
      // Create password for the customer (hashed)
      await Passwords_Model.create({
        AdminID: admin.AdminID,
        Password: hashedPassword
      });
  
      // Generate JWT token for the newly registered user
      const token = jwt.sign({ userId: admin.AdminID, username: usernames.Username }, secret_key, { expiresIn: '1h' });
  
      // Send response with token and success message
      res.status(201).json({ message: 'SignUp successful', token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//Get Custom Product Details
router.get('/CustomProducts/:id', async (req, res) => {
    try {
  
        const ProductDetails = await Custom_Products_Model.findOne({
        where: {
            CustomProductID: req.params.id,
        },
        });

        res.status(200).json({ ProductDetails });

    } catch (err) {
        console.log(err)
    }
  });

// Add Custom Product to a Custom Order
router.post('/CustomOrders/:id/products', async (req, res) => {
    const CustomProductID = req.body.CustomProductID;
    const CustomOrderID = req.params.id;

    try {
        // Check if the order and product exist
        const order = await Custom_Orders_Model.findOne({ where: { CustomOrderID: CustomOrderID } });
        const product = await Custom_Products_Model.findOne({ where: { CustomProductID: CustomProductID } });

        if (!order || !product) {
            return res.status(404).json({ message: 'Order or product not found' });
        }

        // Create an entry in Order_Products_Model to associate the product with the order
        await Custom_Products_Order_Model.create({
            CustomOrderID: CustomOrderID,
            CustomProductID: CustomProductID
        });

        res.status(201).json({ message: 'Product added to order successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove a Custom Product from a Custom Order
router.delete('/CustomOrders/:id/products', async (req, res) => {
    const CustomProductID = req.body.CustomProductID;
    const CustomOrderID = req.params.id;

    try {
        // Check if the order and product exist
        const order = await Custom_Orders_Model.findOne({ where: { CustomOrderID: CustomOrderID } });
        const product = await Custom_Products_Model.findOne({ where: { CustomProductID: CustomProductID } });

        if (!order || !product) {
            return res.status(404).json({ message: 'Order or product not found' });
        }

       // Remove an entry in Order_Custom_Products_Model that associates the product with the order
        await Custom_Products_Order_Model.destroy({
            where: {
                CustomOrderID: CustomOrderID,
                CustomProductID: CustomProductID
            }
        });

        res.status(201).json({ message: 'Custom Product removed from order successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//GET all Custom Products
router.get('/CustomProducts', (req, res) =>
    Custom_Products_Model.findAll()
    .then(products => {
        res.json(products);
    })
    .catch(err => console.log(err)));


//Add a Custom Product
router.post('/CustomProducts', async (req, res) => {
    try {
        //Adds a new Product
        Custom_Products_Model.create(
            {
            ChatID: req.body.ChatID,
            CustomProductName: req.body.CustomProductName,
            CustomProductType: req.body.CustomProductType,
            CustomProductColor: req.body.CustomProductColor,
            CustomProductSize: req.body.CustomProductSize,
            CustomProductPrice: req.body.CustomProductPrice,
            CustomProductStock: req.body.CustomProductStock,
            DesignImage: req.body.DesignImage
            })
        //Sends 200 when and a message that the Product was added
        res.status(200).json({ message: 'Custom Product Added' });
    } catch(err) {
        console.log(err)
    }
});

//Update a Custom Product
router.put('/CustomProducts/:id', async (req, res) => {
    try {
  
        const product = await Custom_Products_Model.findOne({
        where: {
            CustomProductID: req.params.id,
        },
        });
        
        if (product) {
        const updatedFields = {};
        const tableFields = ['CustomProductName', 'CustomProductType', 'CustomProductColor', 'CustomProductSize', 'CustomProductPrice', 'CustomProductStock', 'DesignImage'];

        tableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updatedFields[field] = req.body[field];
            }
        });

        Custom_Products_Model.update(updatedFields,{
            where: {
            CustomProductID: product.CustomProductID
            },
        });

        res.status(200).json({ message: 'Product Updated' });

    }} catch (err) {
        console.log(err)
    }
  });

//Delete a Custom Product
router.delete('/CustomProducts/:id', async (req, res) => {
    try {
  
        const product = await Custom_Products_Model.findOne({
        where: {
            CustomProductID: req.params.id,
        },
        });
        
        if (product) {
        Custom_Products_Model.destroy(
            {
            where: {
            CustomProductID: product.CustomProductID,
            CustomProductName: req.body.CustomProductName,
            },
        });

        res.status(200).json({ message: 'Product Deleted' });

    }} catch (err) {
        console.log(err)
    }
  });

//Get orders and custom orders between date range
router.get('/Reports/Between-Dates/', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        

        // Validate the presence of startDate and endDate parameters
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
        }

        // Set time components to match the database format
        const parsedStartDate = moment(startDate, 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const parsedEndDate = moment(endDate, 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');

        console.log(parsedStartDate, parsedEndDate)
        // Retrieve orders within the specified date range
        const orders = await Orders_Model.findAll({
            where: {
                DateOrdered: {
                    [Sequelize.Op.and]: {
                        [Sequelize.Op.gte]: parsedStartDate,
                        [Sequelize.Op.lte]: parsedEndDate,
                    }
                }
            },
            include: [
                { model: City_Model },
                { model: State_Model },
                { model: Status_Model }
            ]
        });

        // Retrieve custom orders within the specified date range
        const customOrders = await Custom_Orders_Model.findAll({
            where: {
                DateOrdered: {
                    [Sequelize.Op.and]: {
                        [Sequelize.Op.gte]: parsedStartDate,
                        [Sequelize.Op.lte]: parsedEndDate,
                    }
                }
            },
            include: [
                { model: City_Model },
                { model: State_Model },
                //{ model: Status_Model }
            ]
        });

        if (!orders.length && !customOrders.length) {
            return res.status(404).json({ error: 'No orders or custom orders found within the specified date range.' });
        }

        res.status(200).json({ orders, customOrders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Gets the Total amount of money made during the time frame
router.get('/Reports/Between-Dates/Total', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        // Format the start and end dates to match the database format
        const parsedStartDate = moment(startDate, 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const parsedEndDate = moment(endDate, 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const orders = await Orders_Model.findAll({
            where: {
                DateOrdered: {
                    [Sequelize.Op.and]: {
                        [Sequelize.Op.gte]: parsedStartDate,
                        [Sequelize.Op.lte]: parsedEndDate,
                    }
                }
            },
        });

        const customOrders = await Custom_Orders_Model.findAll({
            where: {
                DateOrdered: {
                    [Sequelize.Op.and]: {
                        [Sequelize.Op.gte]: parsedStartDate,
                        [Sequelize.Op.lte]: parsedEndDate,
                    }
                }
            },
        });

        // Calculate total amount made from orders
        const ordersTotal = orders.reduce((total, order) => total + order.Total, 0);

        // Calculate total amount made from custom orders
        const customOrdersTotal = customOrders.reduce((total, customOrder) => total + customOrder.Total, 0);

        // Calculate overall total amount made
        const totalAmountMade = ordersTotal + customOrdersTotal;

        res.json({
            orders: orders,
            customOrders: customOrders,
            totalAmountMade: totalAmountMade,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Gets the Top Selling Products during the entered date range
router.get('/Reports/Top-Selling-Products', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const parsedStartDate = moment(startDate, 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const parsedEndDate = moment(endDate, 'MM/DD/YYYY').format('YYYY-MM-DD HH:mm:ss');

        // Validate the presence of startDate and endDate parameters
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
        }

        // Retrieve top-selling products within the specified date range
        const topSellingProducts = await Order_Products_Model.findAll({
            where: {
                createdAt: {
                    [Sequelize.Op.and]: {
                        [Sequelize.Op.gte]: parsedStartDate,
                        [Sequelize.Op.lte]: parsedEndDate,
                    }
                }
            },
            attributes: ['ProductID', [Sequelize.fn('sum', Sequelize.col('Quantity')), 'totalQuantity']],
            group: ['ProductID'],
            order: [[Sequelize.literal('totalQuantity'), 'DESC']],
            limit: 10, // Get top 10 products
            include: [
                {
                    model: Products_Model,
                    attributes: ['ProductName'],
                },
            ],
        });

        res.status(200).json({ topSellingProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Gets all of the Unapproved Custom Orders
router.get('/Reports/Unapproved-Custom-Orders', async (req, res) => {
    try {
        // Retrieve unapproved custom orders
        const unapprovedCustomOrders = await Custom_Orders_Model.findAll({
            where: {
                StatusID: {
                    [Sequelize.Op.not]: [2], // Assuming APPROVED_STATUS_ID is the ID for the approved status
                },
            },
            include: [
                { model: City_Model },
                { model: State_Model },
                { model: Status_Model },
                { model: Customers_Model },
            ],
        });

        res.status(200).json({ unapprovedCustomOrders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Gets all of the Orders and Custom Orders that are Late for Delivery
router.get('/Reports/Late-Deliveries', async (req, res) => {
    try {
        // Get the current date and time
        const currentDate = new Date();

        // Retrieve late custom orders
        const lateCustomOrders = await Custom_Orders_Model.findAll({
            where: {
                DateScheduled: {
                    [Sequelize.Op.lt]: currentDate,
                },
            },
            include: [
                { model: City_Model },
                { model: State_Model },
                { model: Status_Model },
                { model: Customers_Model },
            ],
        });

        // Retrieve late regular orders
        const lateRegularOrders = await Orders_Model.findAll({
            where: {
                DateScheduled: {
                    [Sequelize.Op.lt]: currentDate,
                },
            },
            include: [
                { model: City_Model },
                { model: State_Model },
                { model: Status_Model },
                { model: Customers_Model },
            ],
        });

        res.status(200).json({ lateCustomOrders, lateRegularOrders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Gets the Total sales by each product type
router.get('/Reports/TotalSalesByType', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Validate the presence of startDate and endDate parameters
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start date and end date are required.' });
        }

        // Retrieve total sales of products by type within the specified date range
        const totalSalesByType = await Order_Products_Model.findAll({
            /* where: {
                createdAt: {
                    [Sequelize.Op.between]: [startDate, endDate],
                },
            }, */
            include: [
                {
                    model: Products_Model,
                    attributes: ['ProductType'], // Select the ProductType column for grouping
                },
            ],
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('ProductPrice')), 'totalSales'], // Calculate total sales
            ],
            group: ['ProductType'], // Group by ProductType
        });

        res.status(200).json(totalSalesByType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Top Paying Customer
router.get('/Reports/TopPayingCustomers', async (req, res) => {
    try {
        const topPayingCustomers = await Customers_Model.findAll({
            attributes: [
                'CustomerID',
                'CustomerFirstName',
                'CustomerLastName',
                [
                    Sequelize.literal('COALESCE((SELECT SUM(ORDERS.Total) FROM ORDERS WHERE ORDERS.CustomerID = CUSTOMERS.CustomerID AND ORDERS.DateDelivered IS NOT NULL), 0)'),
                    'totalOrderSpending'
                ],
                [
                    Sequelize.literal('COALESCE((SELECT SUM(CUSTOM_ORDERS.Total) FROM CUSTOM_ORDERS WHERE CUSTOM_ORDERS.CustomerID = CUSTOMERS.CustomerID AND CUSTOM_ORDERS.DateDelivered IS NOT NULL), 0)'),
                    'totalCustomOrderSpending'
                ],
            ],
            order: [
                Sequelize.literal('COALESCE(totalOrderSpending, 0) + COALESCE(totalCustomOrderSpending, 0) DESC')
            ],
            limit: 10
        });

        if (!topPayingCustomers || topPayingCustomers.length === 0) {
            return res.status(404).json({ error: 'No top paying customers found.' });
        }

        res.status(200).json(topPayingCustomers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;