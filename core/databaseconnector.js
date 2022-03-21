const Sequelize = require('sequelize');

// console.log("calling database");
const sequelize=new Sequelize(
    process.env.mysql_databse_name,    //database name
    process.env.mysql_databse_username, //username
    process.env.mysql_databse_password,  //password
    {    
    dialect:process.env.databse_dialect,    //type of database name
    host:process.env.mysql_databse_host     //host url
    }
);


// for checking connection
// sequelize.authenticate().then(()=>{
//     console.log("connection create successfully");
// }).catch((err)=>{
//     console.log(err)
// })


module.exports=sequelize;