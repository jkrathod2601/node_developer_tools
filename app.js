const { exec } = require("child_process");
require("dotenv").config();
require('./core/global')
require('./core/automig')
//require('./core/databasesync')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer=require('multer')
const csrf=require('csurf')
var cors = require('cors')
const axios=require('axios')
const passport=require('passport')
var cookieSession = require('cookie-session')

var app = express();
let routeset=require('./core/setautoroute');
const core_route=require('./core/core_controller')
const auth_route=require('./core/authentication/auth_google')

const filestorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'savefile')
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+file.originalname)
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(multer({storage:filestorage}).single('file'))
app.use(cookieParser('abcdefghijk'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf({cookie:true}));
app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

app.use(passport.initialize());
app.use(passport.session());


app.use(core_route)
app.use(routeset)
app.use(auth_route)
require('./database/models/index')




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

