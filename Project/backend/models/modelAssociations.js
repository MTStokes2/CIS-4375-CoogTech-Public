//Some of our tables have a circular dependancy. This file allows us to create the foreign keys after they were both initialized
//An example is the Usernames and Passwords table (They both reference each other)

let Models = require('./models')

//Importing all of the Models
let Customers_Model = Models.Customers_Model
let Admins_Model = Models.Admins_Model
let Usernames_Model = Models.Usernames_Model
let Passwords_Model = Models.Passwords_Model
let City_Model = Models.City_Model
let State_Model = Models.State_Model
let Status_Model = Models.Status_Model
let Customer_Chat_Model = Models.Customer_Chat_Model
let Admin_Chat_Model = Models.Admin_Chat_Model
let Chat_Model = Models.Chat_Model
let Orders_Model = Models.Orders_Model
let Custom_Orders_Model = Models.Custom_Orders_Model
let Combo_Orders_Model = Models.Combo_Orders_Model
let Products_Model = Models.Products_Model
let Order_Products_Model = Models.Order_Products_Model
let Custom_Products_Model = Models.Custom_Products_Model
let Custom_Products_Order_Model = Models.Custom_Products_Order_Model
let Feedback_Model = Models.Feedback_Model
let Reports_Model = Models.Reports_Model


Customers_Model.hasOne(Usernames_Model)
Customers_Model.hasOne(Passwords_Model)

Admins_Model.hasOne(Usernames_Model)
Admins_Model.hasOne(Passwords_Model)

State_Model.hasMany(City_Model, {foreignKey: 'StateID'})
City_Model.belongsTo(State_Model, {foreignKey: 'StateID'})


//There is probably a better and cleaner way to do this....
module.exports = {
    Customers_Model,
    Admins_Model,
    Usernames_Model,
    Passwords_Model,
    City_Model,
    State_Model,
    Status_Model,
    Customer_Chat_Model,
    Admin_Chat_Model,
    Chat_Model,
    Orders_Model,
    Custom_Orders_Model,
    Combo_Orders_Model,
    Products_Model,
    Order_Products_Model,
    Custom_Products_Model,
    Custom_Products_Order_Model,
    Feedback_Model,
    Reports_Model
}
