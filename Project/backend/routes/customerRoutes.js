const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')

let {Products_Model} = require('../models/modelAssociations')
let {Orders_Model} = require('../models/modelAssociations')
let {Custom_Orders_Model} = require('../models/modelAssociations')
let {Feedback_Model} = require('../models/modelAssociations')
let {Usernames_Model} = require('../models/modelAssociations');
let {Passwords_Model} = require('../models/modelAssociations');
let {Customers_Model} = require('../models/modelAssociations');
const { Customer_Chat_Model } = require("../models/models");
const { validateToken } = require('../src/auth/JWT')

//GET all Products
router.get('/Products', (req, res) =>
    Products_Model.findAll()
    .then(products => {
        res.json(products);
    })
    .catch(err => console.log(err)));


//Maybe use params for all of the CustomerID stuff since it should have one if they are logged in?
//Update a Customer's Information
router.put('/AccountInfo', async (req, res) => {
    try {
        const customer = await Customers_Model.findOne({
            where: {
                CustomerID: req.body.CustomerID,
            },
        });

        if (customer) {
            // Extract only the fields that are present in req.body
            const updatedFields = {};
            const tableFields = ['CityID', 'StateID', 'ZipCode', 'CustomerLastName', 'CustomerFirstName', 'CustomerAddress', 'CustomerPhone', 'CustomerEmail'];

            tableFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    updatedFields[field] = req.body[field];
                }
            });

            // Update only the fields present in updateFields object
            await Customers_Model.update(updatedFields, {
                where: {
                    CustomerID: customer.CustomerID,
                },
            });

            res.status(200).json({ message: 'Information Updated' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Update a Customer's Username
router.put('/ChangeUsername', async (req, res) => {
    try {
  
        const customer = await Customers_Model.findOne({
        where: {
            CustomerEmail: req.body.CustomerEmail,
        },
        });

        if (customer) {
        Usernames_Model.update(
            {
            Username: req.body.Username
        },{
            where: {
            CustomerID: customer.CustomerID
            },
        });

        res.status(200).json({ message: 'Username Changed' });

    }} catch (err) {
        console.log(err)
    }
  });

// Update a Customer's Password
router.put('/ChangePassword', async (req, res) => {
    try {

        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);

        const customer = await Customers_Model.findOne({
            where: {
                CustomerEmail: req.body.CustomerEmail,
            },
        });

        if (customer) {
            // Update the password with the hashed value
            await Passwords_Model.update(
                {
                    Password: hashedPassword,
                },
                {
                    where: {
                        CustomerID: customer.CustomerID,
                    },
                }
            );

            res.status(200).json({ message: 'Password Changed' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//Get All Orders a customer has
router.get('/Orders', validateToken, async (req, res) => {
    const { userId, username, role } = req.user
    try {
        //First searches for a Username what matches with the username provided
        const customer = await Usernames_Model.findOne({
        where: {
            Username: username,
        },
        });

        //If the customer exists
        if (customer) {
        const Customer_Orders = await Orders_Model.findAll({
            where: {
            CustomerID: customer.CustomerID
            },
        });

        //If there is a match 
        if (Customer_Orders && Customer_Orders.length > 0) {
            res.status(200).json({ Customer_Orders });
        } else {
            res.status(401).json({ message: 'No Orders' });
        }
        } else {
        // Username not found
        res.status(404).json({ message: 'Username not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//Get Order Details
router.get('/Orders/:id', async (req, res) => {
    try {
  
        const OrderDetails = await Orders_Model.findOne({
        where: {
            OrderID: req.params.id
        },
        });

        res.status(200).json({ OrderDetails });

    } catch (err) {
        console.log(err)
    }
  });

//Update an Order (Customer)
router.put('/Orders/:id', async (req, res) => {
    try {
  
        const order = await Orders_Model.findOne({
        where: {
            OrderID: req.params.id
        },
        });
        
        if (order) {
        Orders_Model.update(
            {
            CityID: req.body.CityID,
            StateID: req.body.StateID,
            ZipCode: req.body.ZipCode,
            Address: req.body.Address
        },{
            where: {
            OrderID: order.OrderID
            },
        });

        res.status(200).json({ message: 'Order Updated' });

    }} catch (err) {
        console.log(err)
    }
  });

//Add an Order
router.post('/Orders', async (req, res) => {
    try {

        const customer = await Usernames_Model.findOne({
            where: {
                Username: req.body.Username,
            },
        });

        //Adds a new Order
        Orders_Model.create(
            {
            CustomerID: customer.CustomerID,
            StatusID: req.body.StatusID,
            CityID: req.body.CityID,
            StateID: req.body.StateID,
            ZipCode: req.body.ZipCode,
            Address: req.body.Address,
            Total: req.body.Total,
            DateOrdered: req.body.DateOrdered,
            DateScheduled: req.body.DateScheduled
            })

        res.status(200).json({ message: 'Order Added' });
    } catch(err) {
        console.log(err)
    }
});

//Get All Custom Orders a customer has
router.get('/CustomOrders', validateToken, async (req, res) => {
    const { userId, username, role } = req.user
    try {
        //First searches for a Username what matches with the username provided
        const customer = await Usernames_Model.findOne({
        where: {
            Username: username,
        },
        });
        
        console.log('Customer:', customer)
        //If the customer exists
        if (customer) {
        const Customer_Orders = await Custom_Orders_Model.findAll({
            where: {
            CustomerID: customer.CustomerID
            },
        });

        //If there is a match 
        if (Customer_Orders) {
            res.status(200).json({ Customer_Orders });
        } else {
            res.status(401).json({ message: 'No Custom Orders' });
        }
        } else {
        // Username not found
        res.status(404).json({ message: 'Username not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//Get Custom Order Details
router.get('/CustomOrders/:id', async (req, res) => {
    try {
  
        const OrderDetails = await Custom_Orders_Model.findOne({
        where: {
            CustomOrderID: req.params.id
        },
        });

        res.status(200).json({ OrderDetails });

    } catch (err) {
        console.log(err)
    }
  });

//Update an Order (Customer)
router.put('/CustomOrders/:id', async (req, res) => {
    try {
  
        const customorder = await Custom_Orders_Model.findOne({
        where: {
            CustomOrderID: req.params.id
        },
        });
        
        if (customorder) {
        Custom_Orders_Model.update(
            {
            CityID: req.body.CityID,
            StateID: req.body.StateID,
            ZipCode: req.body.ZipCode,
            Address: req.body.Address
        },{
            where: {
            CustomOrderID: customorder.CustomOrderID
            },
        });

        res.status(200).json({ message: 'Custom Order Updated' });

    }} catch (err) {
        console.log(err)
    }
  });

//Add a Custom Order
router.post('/CustomOrders', async (req, res) => {
    try {

        const customer = await Usernames_Model.findOne({
            where: {
                Username: req.body.Username,
            },
        });

        //Adds a new Custom Order
        Custom_Orders_Model.create(
            {
            CustomerID: customer.CustomerID,
            StatusID: req.body.StatusID,
            CityID: req.body.CityID,
            StateID: req.body.StateID,
            ZipCode: req.body.ZipCode,
            Address: req.body.Address,
            Total: req.body.Total,
            DateOrdered: req.body.DateOrdered,
            DateScheduled: req.body.DateScheduled
            })

        res.status(200).json({ message: 'Custom Order Added' });
    } catch(err) {
        console.log(err)
    }
});

//Add Feedback
router.post('/Feedback', async (req, res) => {
    try {

        const customer = await Usernames_Model.findOne({
            where: {
                Username: req.body.Username,
            },
        });

        //Adds Feedback
        Feedback_Model.create(
            {
            CustomerID: customer.CustomerID,
            Feedback: req.body.Feedback,
            Rating: req.body.Rating
            })

        res.status(200).json({ message: 'Feedback Added' });
    } catch(err) {
        console.log(err)
    }
});

// Handle customer messages
router.post('/customer/message', async (req, res) => {
  
    try {
      // Save customer message to CustomerChat table
      const customerMessage = await Customer_Chat_Model.create({
        ChatID: req.body.ChatID,
        CustomerID: req.body.CustomerID,
        CustomerMessages: req.body.CustomerMessage,
      });

        const room = `chat_${ChatID}`;
        io.to(room).emit('customerMessage', { CustomerID, message });
  
      // Send success response
      res.status(201).json({ message: 'Customer message saved and broadcasted successfully' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;