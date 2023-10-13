const express = require("express");
const router = express.Router();
const config = require('../src/config/config')

const testModel = require('../models/models')
let {Usernames_Model} = require('../models/modelAssociations')
let {Passwords_Model} = require('../models/modelAssociations')

//Test Route to find all, sends an OK to browser if anything returns and logs what was returned in the console
router.get('/test', (req, res) =>
    testModel.findAll()
    .then(tests => {
        console.log(tests)
        res.sendStatus(200);
    })
    .catch(err => console.log(err)));

//Get all Passwords
router.get('/Passwords', (req, res) =>
    Passwords_Model.findAll()
    .then(passwords => {
        console.log(passwords)
        res.json(passwords);
    })
    .catch(err => console.log(err)));

//Get all Usernames
router.get('/Usernames', (req, res) =>
    Usernames_Model.findAll()
    .then(usernames => {
        console.log(usernames)
        res.json(usernames);
    })
    .catch(err => console.log(err)));


module.exports = router;