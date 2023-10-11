const Sequelize = require('sequelize')
const config = require('../src/config/config')

//Documentation for the models
// https://sequelize.org/docs/v6/core-concepts/model-basics/

//Database
const database = config.database

//Test Model used as an example
const Test_Model = database.define('TEST', {
    idTEST: {
        type: Sequelize.CHAR,
        primaryKey: true
    },
    TESTcol: {
        type: Sequelize.CHAR
    },
    TESTcol1: {
        type: Sequelize.CHAR
    },
    TESTcol2: {
        type: Sequelize.CHAR
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);


module.exports = Test_Model