const validateerror = (ele, index) => {
  console.log("-----------------------------");
  console.error(index + 1);
  console.log(framework.chalk.red("check your middlewares"));
  console.log(framework.chalk.yellow("middlewares ==> ", ele.middlewares));

  console.log(framework.chalk.red("check your controller"));
  console.log(framework.chalk.yellow("controller ==>>", ele.controller));

  console.log(framework.chalk.yellow("method ==>", ele.method));
  console.log(framework.chalk.yellow("path ==>", ele.path));
  console.log("-----------------------------");
};

module.exports = validateerror;