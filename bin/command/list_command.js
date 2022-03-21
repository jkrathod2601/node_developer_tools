const chalk=require('chalk')

let list_obj={}

list_obj["for adding a module structure in API folder"]="npm run add_module"



for(let i in list_obj){
    console.log(chalk.blue(i),"------>",chalk.green(list_obj[i]))
}
