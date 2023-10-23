const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const config = require('./config/config')
const http = require("http")
const socketIo = require("socket.io")
let {Chat_Model,Customers_Model, Admin_Chat_Model, Customer_Chat_Model, Usernames_Model} = require('../models/modelAssociations');
const { Admins_Model } = require("../models/models");
const Sequelize = require('sequelize')


const app = express()
app.use(cors());
app.use(morgan('combined')) //logs connections
app.use(bodyParser.json())

const ChatServer = http.createServer(app);
const io = socketIo(ChatServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


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



// Socket.io Chat
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', async ({ Username, CustomOrderID, message }) => {

    if (message.trim() === '') {
      // Ignore empty messages
      return;
    }

    const t = await database.transaction(); // Start a transaction
    let existingChat;
    let newChat;

    try {
      // Find existing chat entry for the CustomOrderID
      existingChat = await Chat_Model.findOne({
        where: {
          CustomOrderID: CustomOrderID
        },
        transaction: t
      });

      // If chat does not exist, create a new chat entry
      if (!existingChat) {
        newChat = await Chat_Model.create({
          CustomOrderID: CustomOrderID
        }, {
          transaction: t
        });
      }

      // Use existing chat or newly created chat based on the presence of existingChat variable
      const chatToUse = existingChat || newChat;

      // Find customerID based on username
      const customer = await Usernames_Model.findOne({
        where: {
          Username: Username
        },
        transaction: t
      });

      // Check if it's a customer or an admin and save the message accordingly
      if (customer) {
        // Create customer chat message
        await Customer_Chat_Model.create({
          ChatID: chatToUse.ChatID,
          CustomerID: customer.CustomerID,
          CustomerMessages: message,
        }, {
          transaction: t
        });
      } else {
        console.error('Error finding Customer:', error);
        await t.rollback(); // Rollback the transaction in case of error
      }

      // Commit the transaction
      await t.commit();

      // Broadcast the message to all connected clients
      
    } catch (error) {
      // Handle the error appropriately
      console.error('Error finding/creating chat:', error);
      await t.rollback(); // Rollback the transaction in case of error
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


//imports the routes and sets up the middle ware for the routes on /test
//localhost:PORT/test
app.use('/', require('../routes/routes'))
app.use('/customerData', require('../routes/customerRoutes'))
app.use('/adminData', require('../routes/adminRoutes'))

ChatServer.listen(config.PORT, console.log("Server started listening on port : ", config.PORT));






//error handler
app.use(function (err, req, res, next) {
    // logs error and error code to console
    console.error(err.message, req);
    if (!err.statusCode)
      err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });