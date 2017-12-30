// Module dependencies
'use strict';
var express  = require('express'),
mysql        = require('mysql'),
bodyParser   = require('body-parser')

// require the bcrypt module
const bcrypt = require('bcrypt');

// Local and server mysql hosts.
 var mysqlHost = '127.0.0.1'; // Local
// var mysqlHost = '192.168.0.128'; // Server


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

// Database setup
var con = mysql.createConnection({
  host : mysqlHost,
  user: "root",
  password: "test@123",
  multipleStatements: true,
  connectionLimit: 15,
  queueLimit: 50,
  acquireTimeout: 1000000
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


// Main route sends our HTML file
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Authenticate the user.
app.post('/authenticate', function (req, res) {

  var username = req.body.username;
  var password = req.body.password;

  con.query('SELECT * FROM rtracker.aa_user WHERE username = ?',[username], function (error, results, fields) {
    if ( error ) {
      res.json({
        status:false,
        message:'there is some error with query'
      });
    } else {
      if ( results.length > 0 ) {
        bcrypt.compare(password, results[0].password, function(err, ress) {
          console.log(ress);
          if ( ress ) {
            con.query('SELECT Employee_Name FROM rtracker.employee_details WHERE Employee_Id = ?', [results[0].username], function (error1, results1, fields1) {
              if ( error1 ) {
                res.json({
                  status: true,
                  message: 'User Employee Not found!',
                  role: results[0].role,
                  empid: results[0].username,
                  empname: 'Not found.'
                });
              } else {
                if ( results1.length > 0 ) {
                  res.json({
                    status: true,
                    message: 'User authentication is successful!',
                    role: results[0].role,
                    empid: results[0].username,
                    empname: results1[0].Employee_Name
                  });
                } else {
                  res.json({
                    status: true,
                    message: 'User not found!',
                    role: results[0].role,
                    empid: results[0].username,
                    empname: 'Not found.'
                  });
                }
              }
            });
          } else {
            res.json({
              status:false,
              message:"Username and password does not match."
            });
          }

        });

      } else {
        res.json({
          status:false,
          message:"Username does not exists."
        });
      }
    }
  });
});


app.get('/employeeIdName', function (req, res) {
  var id = req.params.Search_Emp;
  con.query('SELECT Employee_Id, Employee_Name FROM dev_hris.employee', function(err, rows, fields) {
    if (!err){
      var response = [];

      if (rows.length != 0) {
        response.push({'result' : 'success', 'data' : rows});
      } else {
        response.push({'result' : 'error', 'msg' : 'No Results Found'});
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(response));
    } else {
      res.status(400).send(err);
    }
  });
});

// Begin listening
app.listen(3100, function() {
    console.log("Express server listening on port 3100");
});
