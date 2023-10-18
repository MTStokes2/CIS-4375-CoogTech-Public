const express = require("express");
const router = express.Router();
const config = require('../src/config/config')

let {Admins_Model} = require('../models/modelAssociations')
let {Products_Model} = require('../models/modelAssociations')
let {Customers_Model} = require('../models/modelAssociations')

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
router.put('/Products', async (req, res) => {
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

    
module.exports = router;