const jwt = require("jsonwebtoken");
const db = require("../../database/models");

// login =>veryfication_token{ip,usid},(key) => unlimited
//         accesstokne({ip,usid,role})(user_key) => 1h

// veryfication_token{ip,usid},(key) => unlimited
// refresh_token(ip,userid,role)(user_key)=24h

exports.validate = (access_array)=>{
    return async(req,res,next)=>{
        // console.log(req.headers)
        try {
            if(access_array.length>0){
                // const daat_veryfine = jwt.verify(req.headers.veryfication_token, framework.jwtkey)
                // let userid = daat_veryfine.user_id
                // const token_key=await db.user.findAll({raw:true},{where: {userid:userid}})
                try {
                    const tokne_data=jwt.verify(req.signedCookies['access_token'],framework.jwtkey)
                    if(access_array.includes(tokne_data.role)){
                        console.log(framework.chalk.green('successfully loginf'))
                        next()
                    }else{
                        res.send("unauthorized user")
                    }
                } catch (error) {
                        res.send(error.message)
                        console.log(framework.chalk.red(error.message))
                }
            }else{
                next()
            }

        } catch (error) {
            res.send(error.message)
        }
    }
}


