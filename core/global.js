// add here global mpm package that require in every file 
const framework={}
const fs=require('fs')
const chalk=require('chalk')
const path=require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global.Sequelize=require('sequelize');

// adding npm global package
framework.chalk=chalk
framework.path=path
framework.fs=fs
framework.express=express
framework.cookieParser=cookieParser
framework.logger=logger
framework.jwtkey='xabdshasidbajdsiuadbanbccjatfdbasjdvyuasdbkjasbdkjhayds'


// adding global services from root folder
let files = fs.readdirSync(path.join(__dirname, '../service'));
let service={}
files.forEach( fileName => {
    let [file_a_name]=fileName.split('.')
    service[file_a_name]=require(`../service/${fileName}`);
});
framework.service=service


// adding glolbal function 
const functionpath=path.join(__dirname,"../function")
const ufunction={}
const definefunction=(objecttostore,path)=>{
    let all_file_folder=fs.readdirSync(path)
    all_file_folder.forEach((f_name)=>{
        if(fs.statSync(path+'/'+f_name).isFile()){
            let [file_name]=f_name.split(".")
            objecttostore[file_name]=require(path+'/'+f_name)
        }else{
            objecttostore[f_name]={}
            definefunction(objecttostore[f_name],path+"/"+f_name)
        }
    })
}
definefunction(ufunction,functionpath)
framework.ufunction=ufunction


// adding global core function
corefunction={}
const core_function_path=path.join(__dirname,"../core/function")
let all_core_function=fs.readdirSync(core_function_path)
all_core_function.forEach((f_name)=>{
    let [file_name]=f_name.split(".")
    corefunction[file_name]=require(core_function_path+"/"+f_name)
})
framework.corefunction=corefunction




// adding module function and service
let module_path=path.join(__dirname,"../api")
let module_file=fs.readdirSync(module_path)
module_file.forEach((ele)=>{
    let function_path=`${module_path}/${ele}/function`
    let service_path=`${module_path}/${ele}/service`
    modulefunction={}
    moduleservice={}
    const definefunction=(objecttostore,path)=>{
        let all_file_folder=fs.readdirSync(path)
        all_file_folder.forEach((f_name)=>{
            if(fs.statSync(path+'/'+f_name).isFile()){
                let [file_name]=f_name.split(".")
                objecttostore[file_name]=require(path+'/'+f_name)
            }else{
                objecttostore[f_name]={}
                definefunction(objecttostore[f_name],path+"/"+f_name)
            }
        })
    }
    definefunction(modulefunction,function_path)
    definefunction(moduleservice,service_path)
    framework[ele]={
        modulefunction:modulefunction,
        moduleservice:moduleservice
    }
})


// devlaring the global framework file and access in any page
global.framework=framework



