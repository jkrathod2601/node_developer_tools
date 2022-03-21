// const user_data={
//     "1":{
//         name:"jay",
//         age:20
//     }
// }


// module.exports.adduser=(getuserdata)=>{
//         return new Promise((resolve,reject)=>{
//             let all_id_user_data=Object.keys(user_data)
//             if(all_id_user_data.includes(String(getuserdata.id))){
//                 reject("this id is allready prsent in a database")
//             }else{
//                 user_data[getuserdata.id]={
//                     name:getuserdata.name,
//                     age:getuserdata.age
//                 }
//                 console.log(user_data)
//                 resolve("user added sucessfully")
//             }
//         })
//     }

// module.exports.getusersdata=()=>{
//         return user_data
//     }

//     module.exports.updateuser=(id,getting_user_data)=>{
//         return new Promise((resolve,reject)=>{
//             let all_id_user_data=Object.keys(user_data)
//             if(all_id_user_data.includes(String(id))){
//                 user_data[id]={
//                     name:getting_user_data.name,
//                     age:getting_user_data.age
//                 }
//                 console.log(user_data)
//                 resolve("user updated sucessfully")
//             }else{
                
//                 reject("this id is not prsent in a database")
//             }
//         })
//     }

//     module.exports.deleteuser=(id)=>{
//         return new Promise((resolve,reject)=>{
//             let all_id_user_data=Object.keys(user_data)
//             if(all_id_user_data.includes(String(id))){
//                 delete user_data[id]
//                 resolve("user deleted sucessfully")
//             }else{
//                 reject("this id is not prsent in a database")
//             }
//         })
//     }

//     module.exports.singleuserfind=(id)=>{
//         return new Promise((resolve,reject)=>{
//             let all_id_user_data=Object.keys(user_data)
//             if(all_id_user_data.includes(String(id))){
//                 resolve(user_data[id])
//             }else{
//                 reject("this id is not prsent in a database")
//             }
//         })
//     }
