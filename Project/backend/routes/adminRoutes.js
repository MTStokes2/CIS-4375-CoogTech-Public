const express = require("express");
const router = express.Router();
const config = require('../src/config/config')

let {Admins_Model} = require('../models/modelAssociations')
let {Products_Model} = require('../models/modelAssociations')
let {Customers_Model} = require('../models/modelAssociations')
let {Status_Model} = require('../models/modelAssociations')
let {State_Model} = require('../models/modelAssociations')
let {City_Model} = require('../models/modelAssociations')

//GET all Admins
router.get('/', (req, res) =>
    Admins_Model.findAll()
    .then(admins => {
        console.log(admins)
        res.json(admins);
    })
    .catch(err => console.log(err)));

//GET all Customers
router.get('/Customers', (req, res) =>
    Customers_Model.findAll()
    .then(customers => {
        console.log(customers)
        res.json(customers);
    })
    .catch(err => console.log(err)));


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
        console.log(products)
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
        Products_Model.update(
            {
            ProductName: req.body.ProductName,
            ProductType: req.body.ProductType,
            ProductColor: req.body.ProductColor,
            ProductSize: req.body.ProductSize,
            ProductPrice: req.body.ProductPrice,
            ProductStock: req.body.ProductStock,
            ProductImage: req.body.ProductImage
        },{
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
        console.log(Orders)
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
        Orders_Model.update(
            {
            StatusID: req.body.StatusID,
            CityID: req.body.CityID,
            StateID: req.body.StateID,
            ZipCode: req.body.ZipCode,
            Address: req.body.Address,
            Total: req.body.Total,
            DateOrdered: req.body.DateOrdered,
            DateDelivered: req.body.DateDelivered,
            DateScheduled: req.body.DateScheduled
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

//Update an Order (Update Status)
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
            StatusID: req.body.StatusID
        },{
            where: {
            OrderID: order.OrderID
            },
        });

        res.status(200).json({ message: 'Order Status Updated' });

    }} catch (err) {
        console.log(err)
    }
  });

//Get All Custom Orders
router.get('/CustomOrders', (req, res) =>
    Custom_Orders_Model.findAll()
    .then(CustomOrders => {
        console.log(CustomOrders)
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
        Custom_Orders_Model.update(
            {
            StatusID: req.body.StatusID,
            ChatID: req.body.ChatID,
            CityID: req.body.CityID,
            StateID: req.body.StateID,
            ZipCode: req.body.ZipCode,
            Address: req.body.Address,
            Total: req.body.Total,
            DateOrdered: req.body.DateOrdered,
            DateDelivered: req.body.DateDelivered,
            DateScheduled: req.body.DateScheduled
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

//Update an Order (Update Status)
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
            StatusID: req.body.StatusID
        },{
            where: {
            CustomOrderID: customorder.CustomOrderID
            },
        });

        res.status(200).json({ message: 'Custom Order Status Updated' });

    }} catch (err) {
        console.log(err)
    }
  });

//Get All Feedback
router.get('/Feedback', (req, res) =>
    Feedback_Model.findAll()
    .then(Feedback => {
        console.log(Feedback)
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
        //Sends 200 when and a message that the Status was added
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
        //Sends 200 when and a message that the City was added
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
        //Sends 200 when and a message that the State was added
        res.status(200).json({ message: 'State Added' });
    } catch(err) {
        console.log(err)
    }
});

module.exports = router;