// const { exec } = require('child_process');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

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

const migrationfile_array=framework.fs.readdirSync(framework.path.join(__dirname, '../api/'))
// console.log(migrationfile_array)
let miration_global_string=""
migrationfile_array.forEach((ele)=>{
    miration_global_string=miration_global_string+`api/${ele}/migrations/*.js,`
})

const seeder_array=framework.fs.readdirSync(framework.path.join(__dirname, '../api/'))
// console.log(migrationfile_array)
let seeder_global_string=""
migrationfile_array.forEach((ele)=>{
  seeder_global_string=seeder_global_string+`api/${ele}/seeders/*.js,`
})


const umzug = new Umzug({
    migrations: {
        glob: `{${miration_global_string},database/migrations/*.js}`
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  });

  const seeder = new Umzug({
    migrations: { glob: 
      `{${seeder_global_string},database/seeders/*.js}`
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  });


  const seederadd=async()=>{
    // await seeder.down({ to: 0 })
    const seeder_add=await seeder.pending()
    if (seeder_add.length > 0) {
        console.log(framework.chalk.blue("this is your remaining seeders"));
        seeder_add.forEach((ele) => {
          console.log(framework.chalk.inverse(ele.name));
        });
        readline.question("are you ready to add  all seeder? y / n", async (ans) => {
          if (ans == "y") {
            await seeder.up();
            // framework.express().listen(3000,()=>{
            //   console.log(framework.chalk.green("server stared successfully"))
            // })
          } else {
            console.log("start development");
            // framework.express().listen(3000,()=>{
            //   console.log(framework.chalk.green("server stared successfully"))
            // })
          }
        });
    }
  }

const run = async () => {
    //migrations   
  // await umzug.down({ to: 0 });
  const migrations = await umzug.pending();
  if (migrations.length > 0) {
    console.log(framework.chalk.blue("this is your remaining migration"));
    await migrations.forEach((ele) => {
      console.log(framework.chalk.inverse(ele.name));
    });
    await readline.question(
      "are you ready to migrate all? y / n",
      async (ans) => {
        if (ans == "y") {
          const migrations_done = await umzug.up();
          seederadd()
        } else {
          console.log("start development");
          // framework.express().listen(3000,()=>{
          //   console.log(framework.chalk.green("server stared successfully"))
          // })
        }
      }
    );
  }


    //   seeders
    
};

run();


// let migration_file_path=framework.path.join(__dirname,"../migrations")

// let migrationfile_array=framework.fs.readdirSync(migration_file_path)
// // console.log(migrationfile_array)

// exec('npx sequelize db:migrate:status',(err,data)=>{
//     console.log(framework.chalk.yellow(data))
//     console.log("are you ready to migrate this all down file")
//     readline.question(`yes/no ?`, name => {
//         if(name=="yes"){
//             exec("npx sequelize-cli db:migrate", (error, stdout, stderr) => {
//                 if (error) {
//                     console.log(`error: ${error.message}`);
//                     return;
//                 }
//                 if (stderr) {
//                     console.log(`stderr: ${stderr}`);
//                     return;
//                 }
//                 console.log(`stdout: ${stdout}`);
//               });
//         }else{
//             console.log("continue development")
//         }
//     })
// })

