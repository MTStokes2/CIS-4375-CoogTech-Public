const express = require("express");
const router = express.Router();
const config = require('../src/config/config')

let {Products_Model} = require('../models/modelAssociations')


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
        Customers_Model.update(
            {
            CityID: req.body.CityID,
            StateID: req.body.StateID,
            ZipCode: req.body.ZipCode,
            CustomerLastName: req.body.CustomerLastName,
            CustomerFirstName: req.body.CustomerFirstName,
            CustomerAddress: req.body.CustomerAddress,
            CustomerPhone: req.body.CustomerPhone,
            CustomerEmail: req.body.CustomerEmail
        },{
            where: {
            CustomerID: customer.CustomerID
            },
        });

        res.status(200).json({ message: 'Information Updated' });

    }} catch (err) {
        console.log(err)
    }
  });

//Update a Customer's Username
router.put('/ChangeUsername', async (req, res) => {
    try {
  
        const customer = await Customers_Model.findOne({
        where: {
            CustomerID: req.body.CustomerID,
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

//Update a Customer's Password
router.put('/ChangePassword', async (req, res) => {
    try {
  
        const customer = await Customers_Model.findOne({
        where: {
            CustomerID: req.body.CustomerID,
        },
        });
        
        if (customer) {
        Passwords_Model.update(
            {
            Password: req.body.Password
        },{
            where: {
            CustomerID: customer.CustomerID
            },
        });

        res.status(200).json({ message: 'Password Changed' });

    }} catch (err) {
        console.log(err)
    }
  });

module.exports = router;