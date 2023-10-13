const express = require("express");
const router = express.Router();
const config = require('../src/config/config')

let {Admins_Model} = require('../models/modelAssociations')


//GET all Admins
router.get('/', (req, res) =>
    Admins_Model.findAll()
    .then(admins => {
        console.log(admins)
        res.json(admins);
    })
    .catch(err => console.log(err)));


module.exports = router;