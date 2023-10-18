const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Sequalize = require('sequelize')
const config = require('./config/config')


const app = express()

app.use(morgan('combined')) //logs connections
app.use(bodyParser.json())
app.use(cors()) ///!

//Database
const database = config.database

//({ force: true }) - This creates the table, dropping it first if it already existed
/*
({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), 
and then performs the necessary changes in the table to make it match the model.
*/
database.sync(console.log("Beginning Database Synchronization.."))
.then(() => console.log("Database Synchronized..."))
.catch(err => console.log('Error: ', err))

//Database connection test
database.authenticate()
.then(() => console.log("Database Connected..."))
.catch(err => console.log('Error: ', err))

//imports the routes and sets up the middle ware for the routes on /test
//localhost:PORT/test
app.use('/', require('../routes/routes'))
app.use('/customerData', require('../routes/customerRoutes'))
app.use('/adminData', require('../routes/adminRoutes'))

app.listen(config.PORT, console.log("Server started listening on port : ", config.PORT));






//error handler
app.use(function (err, req, res, next) {
    // logs error and error code to console
    console.error(err.message, req);
    if (!err.statusCode)
      err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });