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
    database : 'rtracker'
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


app.get('/employeeIdName/:data', function (req, res) {
  var id = req.params.data;
  var sqlQuery = "SELECT * FROM rtracker.employee_details where Employee_Id='"+id+"'";
  con.query(sqlQuery, function(err, rows, fields) {
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


app.get('/claimDetails', function (req, res) {
  con.query('SELECT * FROM rtracker.reimbursement_details', function(err, rows, fields) {
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

app.post('/api/addClaim', function (req, res) {
    var result = {};
    console.log(req.body.Claim_Id);

    var claimid = req.body.Claim_Id;

    console.log(claimid);

    if(req.body.Status == null) {
      var modelData = {
          Employee_Id : req.body.Employee_Id,
          Claim_Amount : req.body.Claim_Amount,
          Expense_Details : null,
          Status : "Submitted",
          Date_Of_Receipt : req.body.Date_Of_Receipt,
          Approved_Amount : null,
          Approved_Date : null,
          Comment : null
       }

      knex1.transaction(function (t) {
          console.log("Adding the Claim details for accept state");
          return knex1('reimbursement_details')
              .transacting(t)
              .insert(modelData)
              .then(function (response) {
                  // console.log("Adding the Projects Details");
                  // return knex1('aa_projects')
                  // .transacting(t)
                  // .insert(modelData2)
                  // .then(function (response) {
                  //
                  // })
                  console.log("Added claim details");
              })
          .then(t.commit)
          .catch(t.rollback)
      })

      .then(function (success) {
          result['data'] = req.body;
          result['result'] = 'success';
          result['message'] = 'Claim details added successfully!';
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send( result );
      })
      .catch(function (error) {
          console.log(error);
      });
    }
    else {
      var modelData = {
          Employee_Id : req.body.Employee_Id,
          Claim_Amount : req.body.Claim_Amount,
          Expense_Details : req.body.Expense_Details,
          Status : req.body.Status,
          Date_Of_Receipt : req.body.Date_Of_Receipt,
          Approved_Amount : req.body.Approved_Amount,
          Approved_Date : req.body.Approved_Date,
          Comment : req.body.Comment
       }

      knex1.transaction(function (t) {
          console.log("updating the Claim details for accept state");
          return knex1('reimbursement_details')
              .transacting(t)
              .update(modelData)
              .where('Claim_Id', '=', claimid )
              .then(function (response) {
                  // console.log("Adding the Projects Details");
                  // return knex1('aa_projects')
                  // .transacting(t)
                  // .insert(modelData2)
                  // .then(function (response) {
                  //
                  // })
                  console.log("Updated claim details");
              })
          .then(t.commit)
          .catch(t.rollback)
      })

      .then(function (success) {
          result['data'] = req.body;
          result['result'] = 'success';
          result['message'] = 'Claim details updated successfully!';
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send( result );
      })
      .catch(function (error) {
          console.log(error);
      });
    }

})

app.get('/claimDetails/:data', function (req, res) {
  var result = {};
  var Claim = req.params.data;
  knex1.select(
       '*'
   )
   .from('reimbursement_details')
   .where('Claim_Id', Claim)
   .timeout(10000, {cancel: true})
   .map(function (row) { return row; })
   .then(function (data = []) {
       result = data;
       result['result'] = 'success';
       result['message'] = 'data fetched successfully!';
       res.setHeader('Content-Type', 'application/json');
       res.status(200).send( result );
   })
});

app.post('/sendMail', function(req,res) {

  var To_Name = req.body.Employee_Email;
  var claimid = req.body.Claim_Id;
  var comment = req.body.Comment;
  var approvedAmount = req.body.Approved_Amount;
  var approvedDate = req.body.Approved_Date

  console.log("check condition");
  console.log(req.body.Status);

  if (req.body.Status == null) {
      var text = '<p>Hi</p><p>Your reimbursement claim with <b> claim no:'+claimid+' </b> is being Processed'
  }
  else if (req.body.Status == 'Accept') {
    var text = '<p>Hi</p><p>Your reimbursement claim with <b> claim no:'+claimid+' </b> has been accepted with comments as <b> '+comment+' </b> for an amount of <b> INR '+approvedAmount+' </b> and the same would be disbursed by <b>'+approvedDate+'.</b> </p><p>Regards<br>Accounts Team</p>'
  }
  else {
    var text = '<p>Hi</p><p>Your reimbursement claim with <b>  claim no:'+claimid+' </b> has been rejected with comments as <b> '+comment+' </b><p>Regards<br>Accounts Team</p>'
  }
  console.log(To_Name);
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport(

     {
      type: 'smtp', 
      host: 'smtp.office365.com',
      port: 587,
      //secure: true, // use SSL
      secure: false, //disable SSL
      requireTLS: true,//Force TLS
      tls: {
          rejectUnauthorized: false
        },
       logger: true,
       debug: true,
  });

  var mailOptions = {
    from: 'yogesh.shanmukhappa@affineanalytics.com',
    to: To_Name,
    subject: 'Reimbursement claim:'+claimid,
    text: 'Status update for your claim',
    html: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

})


// Begin listening
app.listen(3100, function() {
    console.log("Express server listening on port 3100");
});
