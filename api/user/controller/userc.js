// const Car=require('../../../models/car')

const db = require("../../../database/models/index")
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

module.exports.done=async(req,res)=>{
    // Car.findAll({raw:true}).then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err)
    // })
    // console.log(db)
    await db.cars.create({
        name:"jay",
        price:"1.0.20.3"
    }).then((data)=>{
        console.log(data)
    }).catch((err)=>{
        console.log(err)
    })

    // process.kill(process.pid, 'SIGINT')
}


module.exports.formdata=(req,res)=>{
    console.log("called")
    console.log(req.file)
}


// // without daatabase
// module.exports.refreshtoken=async(req,res)=>{
//     // if access token expire then only give refresh token
//     try{
//         const data_token=await jwt.verify(req.signedCookies["refresh_token"],req.cookies["_csrf"])
//         let refreshtoken=jwt.sign({username:data_token.username,age:"26"},req.cookies["_csrf"],{expiresIn:"1h"})
//         let accesstoken=jwt.sign({username:data_token.username,role:"admin"},"123456",{expiresIn: "1h"})
//         res.cookie("refresh_token",refreshtoken,{ maxAge: 900000, httpOnly: true,signed: true})
//         console.log(framework.chalk.green("successfully generated new refresh token"))
//         res.send(accesstoken)
//     }catch(err){
//         console.log(framework.chalk.red(err))
//     }
// }

// module.exports.login = (req,res)=>{
//     console.log(req.body)
//     if(req.body.username=="jay" && req.body.password=="2601"){
//         // console.log(req.cookies["_csrf"])
//         let refreshtoken=jwt.sign({username:req.body.username},req.cookies["_csrf"],{expiresIn: "1h"})
//         res.cookie("refresh_token",refreshtoken,{ maxAge: 900000, httpOnly: true ,signed: true})
//         res.render('index',{
//             title: 'jay'
//         })
//     }else{
//         res.render('login',{title:"enter right username",csrftoken:req.csrfToken()})
//     }
// }

// with data base
// module.exports.login = async(req,res)=>{
//     try{
//        let refreshtoken_user=jwt.sign({username:req.body.username},req.cookies["_csrf"],{expiresIn: "2h"})
//        await db.user.create({
//             name:req.body.username,
//             role:req.body.role,
//             refreshtoken:refreshtoken_user,
//             key:crypto.randomBytes(16).toString('hex')
//         }).then((data)=>{
//             let accesstoken_user=jwt.sign({username:req.body.name,role:req.body.role,uid:data.dataValues.id},framework.jwtkey,{expiresIn: "1h"})
//             res.cookie("refresh_token",refreshtoken_user,{ maxAge:3650*24*60*60, httpOnly: true ,signed: true})
//             res.cookie("access_token",accesstoken_user,{ maxAge: 3650*24*60*60, httpOnly: true ,signed: true})
//             res.render('index',{title: req.body.username})
//             console.log(framework.chalk.green("useradded successfully"))
//         })
//     }catch(e){
//         console.log(framework.chalk.red(e))
//     }
// }


// module.exports.refreshdatabase=async(req,res)=>{
//     try{
//         let key_id=req.params.id
//     await db.user.findAll({where:{key:key_id},raw:true}).then((data)=>{
//         if(data.length==1){
//             // console.log(data[0].refreshtoken)
//             // console.log(req.signedCookies["refresh_token"])
//             if(data[0].refreshtoken==req.signedCookies["refresh_token"]){
//                 const data_token=jwt.verify(req.signedCookies["refresh_token"],req.cookies["_csrf"])
//                 console.log(data_token)
//                 let access_token=jwt.sign({role:data[0].role,uid:data[0].id,username:data[0].name},framework.jwtkey,{expiresIn: "1h"})
//                 console.log(access_token)
//                 let refresh_token=jwt.sign({uid:data[0].id},req.cookies["_csrf"],{expiresIn: "2h"})
//                 console.log(refresh_token)
//                 db.user.update({refreshtoken:refresh_token,key:crypto.randomBytes(16).toString('hex')},{where:{key:key_id}}).
//                 then((data)=>{
//                     res.cookie("refresh_token",refresh_token,{ maxAge:3650*24*60*60, httpOnly: true ,signed: true})
//                     res.cookie("access_token",access_token,{ maxAge: 3650*24*60*60, httpOnly: true ,signed: true})
//                     res.send("refresh token updated successfully")
//                 })
//             }else{
//                 res.send("second try for authentication you logout from all devices")
//             }
//         }else{
//             res.end("access denied");
//         }
//     })
//     }
//     catch(err){
//         console.log(framework.chalk.red(err))
//     }
    
// }



module.exports.getip=(req,res)=>{
    console.log(req.headers["x-forwarded-for"])
    res.send(req.headers["x-forwarded-for"])
}


module.exports.giveloginpage=(req,res)=>{
    res.render('login',{title:"",csrftoken:req.csrfToken()})
}

