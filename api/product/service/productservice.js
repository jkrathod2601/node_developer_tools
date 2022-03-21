const Product=require("../../../model/productmodel")

module.exports.addproduct = (getproduct) => {
  console.log(framework.chalk.yellow("add product service is calling"));
  let { id, name } = getproduct;
  console.log(id, name);
  return new Promise(async (resolve, reject) => {
    Product.create({
      id: id,
      name: name ?? "",
    })
      .then((data) => {
        console.log(chalk.greenBright(data));
        resolve("added sucessfully");
      })
      .catch((err) => {
        reject("product id is allready in database");
      });
  });
};

module.exports.getproductdata = () => {
  console.log(framework.chalk.yellow("getproductdata service calling"));
  return new Promise(async(resolve,reject)=>{
        db.user.findAll({raw:true}).then((data)=>{
          resolve(data)
      }).catch((err)=>{
          reject(err)
      })
  })
};

module.exports.updateproduct = (id, getting_product_data) => {
  console.log(framework.chalk.yellow("updateproduct service calling"));
  let {name}=getting_product_data
  console.log(name)
  return new Promise(async(resolve,reject)=>{
      Product.update({
        id:id,
        name:name
      },{where:{id:id}}).then((data)=>{
          console.log(data)
          resolve("updated sucessfully")
      }).catch((err)=>{
          reject(err)
      })
  })
};

module.exports.deleteproduct = (id) => {
  console.log(framework.chalk.yellow("deleteproduct service calling"));
  return new Promise(async(resolve,reject)=>{
      Product.destroy({where:{id:id}}).then((data)=>{
          resolve(`data deleted successfully and affected row is ${data}`)
      }).catch((err)=>{
          reject(err)
      })
  })
};

module.exports.singleproductfind = (id) => {
  console.log(framework.chalk.yellow("singleproductfind service calling"));
  return new Promise((resolve,reject)=>{
      Product.findAll({where:{id:id},raw:true}).then((data)=>{
          resolve(data)
      }).catch((err)=>{
          reject(err)
      })
  })
};
