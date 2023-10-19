const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const config = require('./config/config')
const http = require("http")
const socketIo = require("socket.io")


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
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", (message) => {
    // Handle incoming messages
    console.log("Received message:", message);
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
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