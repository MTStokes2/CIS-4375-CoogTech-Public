# CIS-4375-CoogTech
This was a project for the Project Management class. The project involved working with a local business called the "CraftShack". "CraftShack" was a craft shop that mainly dealt with custom Tshirts and Snacks. Client wanted an application to easily manage orders and communicate with customers about the designs they wanted to have on the custom Tshirt.

The Project utilizes:
- Sequelize
- Express
- Json Web Token
- Socket.IO
- DotENV
- AWS S3 Buckets
- VUE


## Features
### Customer Side
- Storefront
- Shopping Cart
- Order History
- Live Chat

### Admin Side
- Calendar
- Order Management
- Order Status Management
- Live Chat
- Product Management
- Reports

### General
- Encrypted Passwords
- JWT

## Known Issues
- When Creating a new Custom Order from the customer side the page requires a 2-3 refreshes in order to fully sync with the database and store the messages send on the socket.
- Frontend didnt use an ENV file therefore all of the API calls are hardcoded.
- When sending an image in the Live Chat a refresh will properly scale the image (Stored in the database adjusted but isnt done before being sent on the socket).
- Only supported by Firefox (Recent update to Chrome interferes with the cookie).
- Doesnt form well on small screens.
- The Storefront wasn't designed in a way that supports the same shirts with different sizes and colors.

## Unsupported Features
### Payment Processing
  We planned to utilize Stripe to handle payments.
### Mobile Devices
  Using some sort of React based frontend might have been better for this aspect.
