const Sequelize = require('sequelize');
const sequelize=require('../core/databaseconnector')

const Product=sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

// console.log(User)
module.exports=Product