const Sequelize = require('sequelize')
const config = require('../src/config/config')

//Documentation for the models
// https://sequelize.org/docs/v6/core-concepts/model-basics/

//Database
const database = config.database

//---------------------------------------------------//
//             Test Model                            //
//---------------------------------------------------//
const Test_Model = database.define('TEST', {
    idTEST: {
        type: Sequelize.INTEGER,
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

//---------------------------------------------------//
//                State Model                        //
//---------------------------------------------------//
const State_Model = database.define('STATE', {
    StateID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    State: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//                 City Model                        //
//---------------------------------------------------//
const City_Model = database.define('CITY', {
    CityID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    StateID: {
        type: Sequelize.INTEGER,
        
    },
    City: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

State_Model.hasMany(City_Model, {foreignKey: 'StateID'})
City_Model.belongsTo(State_Model, {foreignKey: 'StateID'})

//---------------------------------------------------//
//             Customers Model                        //
//---------------------------------------------------//
const Customers_Model = database.define('CUSTOMERS', {
    CustomerID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CityID: {
        type: Sequelize.INTEGER
    },
    StateID: {
        type: Sequelize.INTEGER
    },
    ZipCode: {
        type: Sequelize.STRING
    },
    CustomerLastName: {
        type: Sequelize.STRING
    },
    CustomerFirstName: {
        type: Sequelize.STRING
    },
    CustomerAddress: {
        type: Sequelize.STRING
    },
    CustomerPhone: {
        type: Sequelize.STRING
    },
    CustomerEmail: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//               Admins Model                        //
//---------------------------------------------------//
const Admins_Model = database.define('ADMINS', {
    AdminID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    AdminLastName: {
        type: Sequelize.STRING
    },
    AdminFirstName: {
        type: Sequelize.STRING
    },
    AdminAddress: {
        type: Sequelize.STRING
    },
    AdminPhone: {
        type: Sequelize.STRING
    },
    AdminEmail: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//             Usernames Model                       //
//---------------------------------------------------//
const Usernames_Model = database.define('USERNAMES', {
    UsernameID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CustomerID: {
        type: Sequelize.INTEGER
    },
    AdminID: {
        type: Sequelize.INTEGER
    },
    Username: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//             Passwords Model                       //
//---------------------------------------------------//
const Passwords_Model = database.define('PASSWORDS', {
    PasswordID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CustomerID: {
        type: Sequelize.INTEGER
    },
    AdminID: {
        type: Sequelize.INTEGER
    },
    Password: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//                Status Model                       //
//---------------------------------------------------//
const Status_Model = database.define('STATUS', {
    StatusID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Status: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//           Customer Chat Model                     //
//---------------------------------------------------//
const Customer_Chat_Model = database.define('CUSTOMER_CHAT', {
    CustomerChatID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CustomerID: {
        type: Sequelize.INTEGER
    },
    CustomerMessages: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//              Admin Chat Model                     //
//---------------------------------------------------//
const Admin_Chat_Model = database.define('ADMIN_CHAT', {
    AdminChatID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    AdminID: {
        type: Sequelize.INTEGER
    },
    AdminMessages: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//                Chat Model                         //
//---------------------------------------------------//
const Chat_Model = database.define('CHAT', {
    ChatID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CustomerChatID: {
        type: Sequelize.INTEGER
    },
    AdminChatID: {
        type: Sequelize.INTEGER
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//                Orders Model                       //
//---------------------------------------------------//
const Orders_Model = database.define('ORDERS', {
    OrderID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CustomerID: {
        type: Sequelize.INTEGER
    },
    StatusID: {
        type: Sequelize.INTEGER
    },
    CityID: {
        type: Sequelize.INTEGER
    },
    StateID: {
        type: Sequelize.INTEGER
    },
    ZipCode: {
        type: Sequelize.STRING
    },
    Total: {
        type: Sequelize.FLOAT
    },
    DateOrdered: {
        type: Sequelize.DATE
    },
    DateDelivered: {
        type: Sequelize.DATE
    },
    DateScheduled: {
        type: Sequelize.DATE
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//             Custom Orders Model                   //
//---------------------------------------------------//
const Custom_Orders_Model = database.define('CUSTOM_ORDERS', {
    CustomOrderID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CustomerID: {
        type: Sequelize.INTEGER
    },
    StatusID: {
        type: Sequelize.INTEGER
    },
    ChatID: {
        type: Sequelize.INTEGER
    },
    CityID: {
        type: Sequelize.INTEGER
    },
    StateID: {
        type: Sequelize.INTEGER
    },
    ZipCode: {
        type: Sequelize.STRING
    },
    Total: {
        type: Sequelize.FLOAT
    },
    DateOrdered: {
        type: Sequelize.DATE
    },
    DateDelivered: {
        type: Sequelize.DATE
    },
    DateScheduled: {
        type: Sequelize.DATE
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//              Combo Orders Model                   //
//---------------------------------------------------//
const Combo_Orders_Model = database.define('COMBO_ORDERS', {
    ComboOrderID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    OrderID: {
        type: Sequelize.INTEGER
    },
    CustomOrderID: {
        type: Sequelize.INTEGER
    },
    CombinedTotal: {
        type: Sequelize.FLOAT
    },
    DateOrdered: {
        type: Sequelize.DATE
    },
    DateDelivered: {
        type: Sequelize.DATE
    },
    DateScheduled: {
        type: Sequelize.DATE
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//             Products Model                        //
//---------------------------------------------------//
const Products_Model = database.define('PRODUCTS', {
    ProductID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ProductName: {
        type: Sequelize.STRING
    },
    ProductType: {
        type: Sequelize.STRING
    },
    ProductPrice: {
        type: Sequelize.FLOAT
    },
    ProductStock: {
        type: Sequelize.INTEGER
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//             Order Products Model                  //
//---------------------------------------------------//
const Order_Products_Model = database.define('ORDER_PRODUCTS', {
    OrderProductsID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    OrderID: {
        type: Sequelize.STRING
    },
    ProductID: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//             Custom Products Model                 //
//---------------------------------------------------//
const Custom_Products_Model = database.define('CUSTOM_PRODUCTS', {
    CustomProductID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ChatID: {
        type: Sequelize.INTEGER
    },
    CustomProductName: {
        type: Sequelize.STRING
    },
    CustomProductType: {
        type: Sequelize.STRING
    },
    CustomProductPrice: {
        type: Sequelize.FLOAT
    },
    CustomProductStock: {
        type: Sequelize.INTEGER
    },
    DesignImage: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//         Custom Product Orders Model               //
//---------------------------------------------------//
const Custom_Products_Order_Model = database.define('CUSTOM_PRODUCT_ORDERS', {
    CustomProductOrderID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CustomOrderID: {
        type: Sequelize.INTEGER
    },
    CustomProductID: {
        type: Sequelize.INTEGER
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//                Feedback Model                     //
//---------------------------------------------------//
const Feedback_Model = database.define('FEEDBACK', {
    FeedbackID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CustomerID: {
        type: Sequelize.INTEGER
    },
    Feedback: {
        type: Sequelize.STRING
    },
    Rating: {
        type: Sequelize.INTEGER
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//---------------------------------------------------//
//                Reports Model                      //
//---------------------------------------------------//
const Reports_Model = database.define('REPORTS', {
    ReportID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    AdminID: {
        type: Sequelize.INTEGER
    },
    Scripts: {
        type: Sequelize.STRING
    }},
     {
        freezeTableName: true, //makes sure the sql script uses the defined table name 'TEST' instead of TESTs
        createdAt: false, //Removes the createdAt field from the query since we don't have it in our tables
        updatedAt: false //Removes the updatedAt field from the query since we don't have it in our tables
    }
);

//There is probably a better and cleaner way to do this....
module.exports = {
    Test_Model,
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