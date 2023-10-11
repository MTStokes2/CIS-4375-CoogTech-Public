const express = require("express");
const router = express.Router();
const config = require('../src/config/config')
const testModel = require('../models/models')

//Test Route to find all, sends an OK to browser if anything returns and logs what was returned in the console
router.get('/', (req, res) =>
    testModel.findAll()
    .then(tests => {
        console.log(tests)
        res.sendStatus(200);
    })
    .catch(err => console.log(err)));



module.exports = router;