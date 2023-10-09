const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express()
app.use(morgan('combined')) //logs connections
app.use(bodyParser.json())
app.use(cors()) ///!


app.post('/register', (req, res) => {
  username = req.body.username
    res.send({
        message: req.body
    })
})


//declare port number for the api
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
  });

console.log("Database connection Success!")

//error handler
app.use(function (err, req, res, next) {
    // logs error and error code to console
    console.error(err.message, req);
    if (!err.statusCode)
      err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });