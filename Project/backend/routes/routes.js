const express = require("express");
const router = express.Router();
const config = require('../src/config/config')

const testModel = require('../models/models')
let {Usernames_Model, Passwords_Model, Customers_Model, Admins_Model, Chat_Model, Customer_Chat_Model, Admin_Chat_Model} = require('../models/modelAssociations')

//Test Route to find all, sends an OK to browser if anything returns and logs what was returned in the console
router.get('/test', (req, res) =>
    testModel.findAll()
    .then(tests => {
        console.log(tests)
        res.sendStatus(200);
    })
    .catch(err => console.log(err)));

router.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
    });


//SignUp
router.post('/SignUp', async (req, res) => {

    try {
        //Adds Customer's information to Customers Table
        Customers_Model.create(
            {
            CityID: req.body.CityID,
            StateID: req.body.StateID,
            ZipCode: req.body.ZipCode,
            CustomerLastName: req.body.CustomerLastName,
            CustomerFirstName: req.body.CustomerFirstName,
            CustomerAddress: req.body.CustomerAddress,
            CustomerPhone: req.body.CustomerPhone,
            CustomerEmail: req.body.CustomerEmail
            }).then(
                customer => {
                    //Adds Customer's Username to Usernames Table
                    Usernames_Model.create(
                        {
                        CustomerID: customer.CustomerID,
                        Username: req.body.Username
                    })
                    
                    //Adds Customer's Password to Passwords Table
                    Passwords_Model.create(
                        {
                        CustomerID: customer.CustomerID,
                        Password: req.body.Password
                    })
                }
            )
        
        
        
        //Sends 200 when and a message that the Customer was Signed Up
        res.status(200).json({ message: 'SignUp successful' });
    } catch(err) {
        console.log(err)
    }
});


//Login
router.post('/Login', async (req, res) => {
  
    try {
        //First searches for a Username what matches with the username provided
        const customer = await Usernames_Model.findOne({
        where: {
            Username: req.body.Username,
        },
        });
        
        //If the customer exists (they have a username that matches)
        if (customer) {
        //checks to see if the password matches with the provided password and the CustomerID matches with the Username table's
        const matchedPassword = await Passwords_Model.findOne({
            where: {
            CustomerID: customer.CustomerID,
            Password: req.body.Password,
            },
        });

        //If there is a match for both cases then the login is successful
        if (matchedPassword) {
            // Username and Password match with CustomerID
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Password does not match
            res.status(401).json({ message: 'Incorrect password' });
        }
        } else {
        // Username not found
        res.status(404).json({ message: 'Username not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//Get all Passwords
router.get('/Passwords', (req, res) =>
    Passwords_Model.findAll()
    .then(passwords => {
        res.json(passwords);
    })
    .catch(err => console.log(err)));

//Get all Usernames
router.get('/Usernames', (req, res) =>
    Usernames_Model.findAll()
    .then(usernames => {
        res.json(usernames);
    })
    .catch(err => console.log(err)));

// Chat history for a specific ChatID
router.get('/Customer/Chat/History/:CustomOrderID', async (req, res) => {
    const { CustomOrderID } = req.params;
  
    try {
      // Check if the chat exists based on CustomOrderID
      const chat = await Chat_Model.findOne({
        where: {
          CustomOrderID: CustomOrderID
        }
      });
  
      if (chat) {
        // If chat exists, get all customer's messages using ChatID
        const chatHistory = await Customer_Chat_Model.findAll({
          where: {
            ChatID: chat.ChatID
          }
          // Include other necessary attributes or associations here
        });
  
        res.json(chatHistory);
      } else {
        res.status(404).json({ error: 'Chat not found for the given CustomOrderID' });
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Chat history 
  //Set up a param that takes the username and bind it to that username table or take the customer id
  //Needs to get all of the chats from the same chatID
  router.get('/chat-history/:customOrderID', async (req, res) => {
    console.log('Received a request for chat history');
    try {

      const chat = await Chat_Model.findAll({
        where: {
          CustomOrderID: req.params.customOrderID
        }
      })


      const customerMessages = await Customer_Chat_Model.findAll({ 
        include: {
          model: Customers_Model,
        include: {
          model: Usernames_Model,
          attributes: [
            'Username'
          ]
          }}
      });

      const adminMessages = await Admin_Chat_Model.findAll({ 
        include: {
          model: Admins_Model,
        include: {
          model: Usernames_Model,
          attributes: [
            'Username'
          ]
          }}
      });
  
      // Combine and sort messages based on timestamps
      const allMessages = [...customerMessages, ...adminMessages].sort((a, b) => a.createdAt - b.createdAt);
  
      res.status(200).json(allMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;