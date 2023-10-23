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



io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for room joining with role information, CustomOrderID, and username
  socket.on('join room', (data) => {
    console.log('Join room event received:', data);
    try {
    const { CustomOrderID, role, username } = data;

    // Perform a lookup in the Usernames table to get CustomerID or AdminID based on the provided username
    let userIDField;
    if (role === 'customer') {
      userIDField = 'CustomerID';
    } else if (role === 'admin') {
      userIDField = 'AdminID';
    }

    Usernames_Model.findOne({ where: { Username: username } })
      .then((user) => {
        if (!user) {
          // Handle the case when the user is not found based on the provided username
          socket.emit('chat message', { text: 'Invalid username.' });
          return;
        }

        const userID = user[userIDField];

        // Search for an existing chat room with the given CustomOrderID
        
        Chat_Model.findOne({ where: { CustomOrderID } })
          .then((chat) => {
            let chatID;

            if (chat) {
              // If a chat room with the CustomOrderID exists, use its ChatID
              chatID = chat.ChatID;
            } else {
              // If not, create a new chat room and use its generated ChatID
              return Chat_Model.create({ CustomOrderID })
                .then((newChat) => newChat.ChatID);
            }

            // Join the specified room with the retrieved or newly created ChatID
            socket.join(chatID);

            // Emit a welcome message based on the user's role
            socket.emit('chat message', { text: `Welcome! Username: ${username} CustomerOrderID: ${CustomOrderID} Role: ${role} CustomerID: ${userID} ChatID: ${chatID}.` });
            
          })
          .catch((error) => {
            console.error('Error searching for chat room:', error);
          });
      })
      .catch((error) => {
        console.error('Error searching for user:', error);
      });
    } catch (error) {
      console.error('Error handling join room event:', error);
    }
  });

  // Listen for new messages in the room
  socket.on('chat message', (data) => {
    console.log('chat message event received:', data);
    const { customOrderID, role, username, message } = data;

    let userIDField;
    if (role === 'customer') {
      userIDField = 'CustomerID';
    } else if (role === 'admin') {
      userIDField = 'AdminID';
    }

    Usernames_Model.findOne({ where: { Username: username } })
      .then((user) => {
        if (!user) {
          socket.emit('chat message', { text: 'Invalid username.' });
          return;
        }

        const userID = user[userIDField];

        Chat_Model.findOne({ where: { CustomOrderID: customOrderID } })
          .then((chat) => {
            let chatID;

            if (chat) {
              chatID = chat.ChatID;
            } else {
              return Chat_Model.create({ CustomOrderID: customOrderID })
                .then((newChat) => newChat.ChatID);
            }

            if (role === 'customer') {
              Customer_Chat_Model.create({
                ChatID: chatID,
                CustomerID: userID,
                CustomerMessages: message,
              })
                .then(() => {
                  io.to(chatID).emit('chat message', {
                    message,
                    role,
                    userID,
                    chatID,
                    username,
                    createdAt: new Date(),
                  });
                })
                .catch((error) => {
                  console.error('Error saving customer message:', error);
                });
            } else if (role === 'admin') {
              Admin_Chat_Model.create({
                ChatID: chatID,
                AdminID: userID,
                AdminMessages: message,
              })
                .then(() => {
                  io.to(chatID).emit('chat message', {
                    message,
                    role,
                    userID,
                    chatID,
                    username,
                    createdAt: new Date(),
                  });
                })
                .catch((error) => {
                  console.error('Error saving admin message:', error);
                });
            }
          })
          .catch((error) => {
            console.error('Error searching for chat room:', error);
          });
      })
      .catch((error) => {
        console.error('Error searching for user:', error);
      });
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