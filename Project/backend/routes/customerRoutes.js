const express = require("express");
const router = express.Router();
const config = require('../src/config/config')

let {Customers_Model} = require('../models/modelAssociations')

//GET all Customers
router.get('/', (req, res) =>
    Customers_Model.findAll()
    .then(customers => {
        console.log(customers)
        res.json(customers);
    })
    .catch(err => console.log(err)));


    
module.exports = router;