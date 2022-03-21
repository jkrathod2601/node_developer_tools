module.exports.getproduct = async (req, res, next) => {
  console.log(framework.chalk.yellow("get product is calling"));
  await framework.product.moduleservice.productservice
    .getproductdata()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports.addproduct = async (req, res, next) => {
  console.log(framework.chalk.yellow("add product is calling"));
  console.log(req.body);
  await framework.product.moduleservice.productservice
    .addproduct(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.deleteproduct = async (req, res, next) => {
  let id = req.params.id;
  console.log(framework.chalk.yellow("delete product is calling"));
  framework.product.moduleservice.productservice
    .deleteproduct(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.updateproduct = async (req, res, next) => {
  let id = req.params.id;
  console.log(framework.chalk.yellow("update product is calling"));
  framework.product.moduleservice.productservice
    .updateproduct(id, req.body)
    .then((data) => {
      res.status(200).send("updated sucessfully");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.singleproduct = async (req, res, next) => {
  let id = req.params.id;
  console.log(framework.chalk.yellow("single product is calling"));
  framework.product.moduleservice.productservice
    .singleproductfind(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
