

let {Customers_Model} = require('./models')
let {Admins_Model} = require('./models')
let {Usernames_Model} = require('./models')
let {Passwords_Model} = require('./models')
let {State_Model} = require('./models')
let {City_Model} = require('./models')

Customers_Model.hasOne(Usernames_Model)
Customers_Model.hasOne(Passwords_Model)

Admins_Model.hasOne(Usernames_Model)
Admins_Model.hasOne(Passwords_Model)

State_Model.hasMany(City_Model, {foreignKey: 'StateID'})
City_Model.belongsTo(State_Model, {foreignKey: 'StateID'})


module.exports = {Customers_Model, Admins_Model, Usernames_Model, Passwords_Model, State_Model, City_Model}
