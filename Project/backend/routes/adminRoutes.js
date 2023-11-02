const express = require("express");
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET


const router = express.Router();

let {Admins_Model} = require('../models/modelAssociations')
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

//Add a Product
router.post('/Products', async (req, res) => {
    try {
        //Adds a new Product
        Products_Model.create(
            {
            ProductName: req.body.ProductName,
            ProductType: req.body.ProductType,
            ProductColor: req.body.ProductColor,
            ProductSize: req.body.ProductSize,
            ProductPrice: req.body.ProductPrice,
            ProductStock: req.body.ProductStock,
            ProductImage: req.body.ProductImage
            })
        //Sends 200 when and a message that the Product was added
        res.status(200).json({ message: 'Product Added' });
    } catch(err) {
        console.log(err)
    }
});

//Update a Product
router.put('/Products/:id', async (req, res) => {
    try {
  
        const product = await Products_Model.findOne({
        where: {
            ProductName: req.body.ProductName,
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
            ProductID: product.ProductID,
            ProductName: req.body.ProductName,
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
router.get('/Orders', (req, res) =>
    Orders_Model.findAll()
    .then(Orders => {
        res.json(Orders);
    })
    .catch(err => console.log(err)));

//Get Order Details
router.get('/Orders/:id', async (req, res) => {
    try {
  
        const OrderDetails = await Orders_Model.findOne({
        where: {
            OrderID: req.params.id,
        },
        });

        res.status(200).json({ OrderDetails });

    } catch (err) {
        console.log(err)
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
router.get('/CustomOrders', (req, res) =>
    Custom_Orders_Model.findAll()
    .then(CustomOrders => {
        res.json(CustomOrders);
    })
    .catch(err => console.log(err)));

//Get Custom Order Details
router.get('/CustomOrders/:id', async (req, res) => {
    try {
  
        const OrderDetails = await Custom_Orders_Model.findOne({
        where: {
            CustomOrderID: req.params.id,
        },
        });

        res.status(200).json({ OrderDetails });

    } catch (err) {
        console.log(err)
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
        const tableFields = ['StatusID', 'CityID', 'StateID', 'ZipCode', 'Address', 'Total', 'DateScheduled','DateDelivered'];

        tableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updatedFields[field] = req.body[field];
            }
        });

        Custom_Orders_Model.update(updatedFields ,{
            where: {
            CustomOrderID: customorder.CustomOrderID
            },
        });

        res.status(200).json({ message: 'Custom Order Updated' });

    }} catch (err) {
        console.log(err)
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

module.exports = router;