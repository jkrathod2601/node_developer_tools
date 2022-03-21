const auth_midlle=require('../../../core/middleware/auth_midlle')

// adding user
module.exports.done1=async(req,res)=>{
    console.log(framework.chalk.yellow("usercontroller is calling controller"))
    res.send(await framework.user.moduleservice.adduser.adduser(req.body))
}

// validate user
module.exports.done2=async(req,res)=>{
    console.log(framework.chalk.yellow("usercontroller is calling controller check login"))
    framework.user.moduleservice.validateuser.validateuser(req.body)
}



