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
//             Customers Model                        //
//---------------------------------------------------//
const Customers_Model = database.define('CUSTOMERS', {
    CustomerID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    UsernameID: {
        type: Sequelize.INTEGER
    },
    PasswordID: {
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
    UsernameID: {
        type: Sequelize.INTEGER
    },
    PasswordID: {
        type: Sequelize.INTEGER
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
//                 City Model                        //
//---------------------------------------------------//
const City_Model = database.define('CITY', {
    CityID: {
        type: Sequelize.INTEGER,
        primaryKey: true
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
//                Orders Model                       //
//---------------------------------------------------//
const Orderss_Model = database.define('ORDERS', {
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

module.exports = {Test_Model, Customers_Model, Admins_Model, Usernames_Model, Passwords_Model, City_Model, State_Model}