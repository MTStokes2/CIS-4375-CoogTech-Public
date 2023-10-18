const express = require("express");
const router = express.Router();
const config = require('../src/config/config')

const testModel = require('../models/models')
let {Usernames_Model, Passwords_Model, Customers_Model} = require('../models/modelAssociations')

//Test Route to find all, sends an OK to browser if anything returns and logs what was returned in the console
router.get('/test', (req, res) =>
    testModel.findAll()
    .then(tests => {
        console.log(tests)
        res.sendStatus(200);
    })
    .catch(err => console.log(err)));

router.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
    });


//SignUp
router.post('/SignUp', async (req, res) => {

    try {
        //Adds Customer's information to Customers Table
        Customers_Model.create(
            {
            CustomerID: req.body.CustomerID,
            CityID: req.body.CityID,
            StateID: req.body.StateID,
            ZipCode: req.body.ZipCode,
            CustomerLastName: req.body.CustomerLastName,
            CustomerFirstName: req.body.CustomerFirstName,
            CustomerAddress: req.body.CustomerAddress,
            CustomerPhone: req.body.CustomerPhone,
            CustomerEmail: req.body.CustomerEmail
            })
        
        //Adds Customer's Username to Usernames Table
        Usernames_Model.create(
            {
            UsernameID: req.body.UsernameID,
            CustomerID: req.body.CustomerID,
            AdminID: req.body.AdminID,
            Username: req.body.Username
            })
        
        //Adds Customer's Password to Passwords Table
        Passwords_Model.create(
            {
            PasswordID: req.body.PasswordID,
            CustomerID: req.body.CustomerID,
            AdminID: req.body.AdminID,
            Password: req.body.Password
            })
        
        //Sends 200 when and a message that the Customer was Signed Up
        res.status(200).json({ message: 'SignUp successful' });
    } catch(err) {
        console.log(err)
    }
});


//Login
router.post('/Login', async (req, res) => {
  
    try {
        //First searches for a Username what matches with the username provided
        const customer = await Usernames_Model.findOne({
        where: {
            Username: req.body.Username,
        },
        });
        
        console.log('Customer:', customer)
        //If the customer exists (they have a username that matches)
        if (customer) {
        //checks to see if the password matches with the provided password and the CustomerID matches with the Username table's
        const matchedPassword = await Passwords_Model.findOne({
            where: {
            CustomerID: customer.CustomerID,
            Password: req.body.Password,
            },
        });

        //If there is a match for both cases then the login is successful
        if (matchedPassword) {
            // Username and Password match with CustomerID
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Password does not match
            res.status(401).json({ message: 'Incorrect password' });
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

//Get all Passwords
router.get('/Passwords', (req, res) =>
    Passwords_Model.findAll()
    .then(passwords => {
        res.json(passwords);
    })
    .catch(err => console.log(err)));

//Get all Usernames
router.get('/Usernames', (req, res) =>
    Usernames_Model.findAll()
    .then(usernames => {
        res.json(usernames);
    })
    .catch(err => console.log(err)));


module.exports = router;