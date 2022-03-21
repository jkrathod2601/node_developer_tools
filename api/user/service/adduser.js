let jwt=require("jsonwebtoken");
const crypto = require('crypto');

module.exports.adduser = async (body_data) => {
  return new Promise((resolve, reject) => {
    console.log(body_data);
    let key=crypto.randomBytes(16).toString('hex')
    db.user
      .create({
        ...body_data,
        token:jwt.sign({...body_data,ip:crypto.randomBytes(16).toString('hex')},key,{expiresIn:"1h"}),
        refreshtoken:jwt.sign({...body_data,ip:crypto.randomBytes(16).toString('hex')},key,{expiresIn:"2h"}),
        veryfication_token:jwt.sign({user_id:body_data.id,ip:crypto.randomBytes(16).toString('hex')},framework.jwtkey),
        key:key
      })
      .then((data) => {
        resolve("data added successfully");
      })
      .catch((error) => {
        resolve(error);
      });
  });
};
