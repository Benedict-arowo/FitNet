const {Sequelize, DataTypes} = require("sequelize")
const CONFIG = require('../config/dbConfig')
const userModel = require("../../model/user")

const sequelize = new Sequelize (
    CONFIG.DB_NAME,
    CONFIG.DB_USER,
    CONFIG.DB_PASSWORD,
    {
        host: CONFIG.DB_HOST,
        dialect: CONFIG.DB_DIALECT
    }
)

sequelize.authenticate()
.then(()=>{
    console.log("Connection successful")
}).catch((err)=>{
    console.log(err)
})

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize


db.users = userModel(sequelize, DataTypes)

db.sequelize.sync({force:false})
.then(()=>{
    console.log("Table sync successful")
}).catch((err) =>{
    console.log(err)
})

module.exports = db