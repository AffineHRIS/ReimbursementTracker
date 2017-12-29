// Module dependencies
'use strict';

const express   = require('express'),
mysql           = require('mysql'),
bodyParser      = require('body-parser'),
multer          = require('multer'),
path            = require('path'),
bcrypt          = require('bcrypt');


// Local and server mysql hosts.
// var mysqlHost = '127.0.0.1'; // Local
var mysqlHost = '192.168.0.128'; // Server

// Knex initialization and connection
var knex1 = require('knex')({
  client: 'mysql',
  connection: {
    host : mysqlHost,
    user : 'root',
    password : 'test@123',
    database : 'dev_hris'
  },
  pool: { min: 0, max: 7 }
});


// Application initialization and Configuration
var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


//*** Test your scripts here ***//
knex1('employee_address')
.where('Employee_Id', 'AAIN0398')
.del()
.then(function(result){
    console.log( result );
})
.catch(function (error) {
    console.log( error );
});

knex1.destroy();

// Begin listening
app.listen(3000, function (a) {
    console.log("Express server listening on port 3000");
});
