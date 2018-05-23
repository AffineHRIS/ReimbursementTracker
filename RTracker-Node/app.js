// Module dependencies
'use strict';
var express  = require('express'),
mysql        = require('mysql'),
bodyParser   = require('body-parser'),
dataUploader = require('./data-uploader');
// require the bcrypt module
const bcrypt = require('bcrypt');

var json2xls = require('json2xls');
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
          // console.log(ress);
          if ( ress ) {
            con.query('SELECT Employee_Name FROM rtracker.employee_details WHERE Employee_Id = ?', [results[0].username], function (error1, results1, fields1) {
              if ( error1 ) {
                res.json({
                  status: true,
                  message: 'User Employee Not found!',
                  role: results[0].role,
                  empid: results[0].username,
                  empname: results[0].username
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
                    empname: results[0].username
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

app.post('/claimDetails', function (req, res) {
    var From = req.body.from;
    var To = req.body.to;
    var Type = req.body.type;
    var emp_list = req.body.emp_list;
    var list_of_emp = [];

    emp_list.forEach((val, index) => {
        list_of_emp.push(val.id );
    });
    var emp_res = "'"+list_of_emp.join("','")+"'";
    if (list_of_emp.length == 0 && Type!=undefined){
      var sqlQuery = `SELECT a.Claim_Id,a.Employee_Id,a.Claim_Amount,a.Amount_Type,a.Expense_Details,a.Status,a.Comment,a.Date_Of_Receipt,a.Approved_Amount
          ,a.Approved_Date,a.Expense_Type,a.Project_Name,a.Created_At,a.Modified_At,b.Employee_Name, b.Email_Id FROM
          ( select * from rtracker.reimbursement_details WHERE (Date_Of_Receipt between '`+From+`' and '`+ To +`')) a
          left join
          (select * from rtracker.employee_details
          group by Employee_Id) b
          on a.Employee_Id = b.Employee_Id
          where Amount_Type='`+Type+`'
          ORDER BY Claim_Id DESC`
    }
    else if (list_of_emp.length >= 1 && Type!=undefined ){
      var sqlQuery = `SELECT a.Claim_Id,a.Employee_Id,a.Claim_Amount,a.Amount_Type,a.Expense_Details,a.Status,a.Comment,a.Date_Of_Receipt,a.Approved_Amount
          ,a.Approved_Date,a.Expense_Type,a.Project_Name,a.Created_At,a.Modified_At,b.Employee_Name, b.Email_Id FROM
          ( select * from rtracker.reimbursement_details WHERE (Date_Of_Receipt between '`+From+`' and '`+ To +`') AND Employee_Id IN (`+emp_res+`)) a
          left join
          (select * from rtracker.employee_details
          group by Employee_Id) b
          on a.Employee_Id = b.Employee_Id
          where Amount_Type='`+Type+`'
          ORDER BY Claim_Id DESC`
    }
    else if (list_of_emp.length >= 1 && Type == undefined ){
      var sqlQuery = `SELECT a.Claim_Id,a.Employee_Id,a.Claim_Amount,a.Amount_Type,a.Expense_Details,a.Status,a.Comment,a.Date_Of_Receipt,a.Approved_Amount
          ,a.Approved_Date,a.Expense_Type,a.Project_Name,a.Created_At,a.Modified_At,b.Employee_Name, b.Email_Id FROM
          ( select * from rtracker.reimbursement_details WHERE (Date_Of_Receipt between '`+From+`' and '`+ To +`') AND Employee_Id IN (`+emp_res+`)) a
          left join
          (select * from rtracker.employee_details
          group by Employee_Id) b
          on a.Employee_Id = b.Employee_Id
          ORDER BY Claim_Id DESC`
    }
    else {
      var sqlQuery = `SELECT a.Claim_Id,a.Employee_Id,a.Claim_Amount,a.Amount_Type,a.Expense_Details,a.Status,a.Comment,a.Date_Of_Receipt,a.Approved_Amount
          ,a.Approved_Date,a.Expense_Type,a.Project_Name,a.Created_At,a.Modified_At,b.Employee_Name, b.Email_Id FROM
          ( select * from rtracker.reimbursement_details WHERE Date_Of_Receipt between '`+From+`' and '`+ To +`') a
          left join
          (select * from rtracker.employee_details
          group by Employee_Id) b
          on a.Employee_Id = b.Employee_Id
          ORDER BY Claim_Id DESC`
    }
    // console.log(Type);
    // console.log(sqlQuery);
  con.query(sqlQuery, function(err, rows, fields) {
    if (!err){
      var response = [];

      if (rows.length != 0) {
        response.push({'result' : 'success', 'data' : rows});
      } else {
        response.push({'result' : 'error', 'msg' : 'No Results Found', 'data' : rows});
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(response));
    } else {
      res.status(400).send(err);
    }
  });
});


app.post('/api/addClaim', function (req, res) {

  var returnResult = function( emailSentStatus ) {
    var result = {};
    result['data'] = req.body.selectedRow;
    result['result'] = 'success';
    result['message'] = 'Claim details updated successfully!';
    result['email'] = emailSentStatus ? 'Email sent successfully.' : 'Failed to send an email.';

    console.log( result['email'] );
    console.log( result['message'] );

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send( result );
  }

    // Adding claims data based on PaymentData value
    if(req.body.PaymentData.Status == null) {
        var modelData = {
          Employee_Id : req.body.PaymentData.Employee_Id.toUpperCase(),
          Amount_Type : req.body.PaymentData.Amount_Type,
          Claim_Amount : req.body.PaymentData.Claim_Amount,
          Expense_Type : req.body.PaymentData.Expense_Type,
          Expense_Details : req.body.PaymentData.Expense_Details,
          Project_Name : req.body.PaymentData.Project_Name,
          Status : "Submitted",
          Date_Of_Receipt : req.body.PaymentData.Date_Of_Receipt,
          Approved_Amount : null,
          Approved_Date : null,
          Paid_Date : null,
          Comment : null,
          Created_At : new Date(),
          Modified_At : null
        }
        knex1.transaction(function (t) {
          return knex1('reimbursement_details')
              .transacting(t)
              .insert(modelData)
              .then(function (response) {
                   req.body['Claim_Id'] = response[0];
                   return knex1.raw(`
                     INSERT INTO employee_details (Employee_Id,Employee_Name,Email_Id) VALUES('`+modelData.Employee_Id+`','`+req.body.PaymentData.Employee_Name+`','`+req.body.PaymentData.Employee_Email+`') ON DUPLICATE KEY UPDATE
                     Employee_Name='`+req.body.PaymentData.Employee_Name+`', Email_Id='`+req.body.PaymentData.Employee_Email+`'
                   `)
              })
          .then(t.commit)
          .catch(t.rollback)
        })
        .then(function (success) {
          var result = {};
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
      var modelData = [], emailSent = true;
      var insertRowToDatabase = function( i ) {
        if(req.body.selectedRow.length == 0) {

          var claimid = req.body.PaymentData.Claim_Id;
          var dor = req.body.PaymentData.Date_Of_Receipt;
          dor = dor.replace('T',' ').replace('Z', '');
          var apd = req.body.PaymentData.Approved_Date;
          apd = dor.replace('T',' ').replace('Z', '');

          var modelData = {
              Employee_Id : req.body.PaymentData.Employee_Id.toUpperCase(),
              Amount_Type : req.body.PaymentData.Amount_Type,
              Claim_Amount : req.body.PaymentData.Claim_Amount,
              Expense_Type : req.body.PaymentData.Expense_Type,
              Expense_Details : req.body.PaymentData.Expense_Details,
              Project_Name : req.body.PaymentData.Project_Name,
              Status : req.body.PaymentData.Status,
              Date_Of_Receipt : dor,
              Approved_Amount :req.body.PaymentData.Approved_Amount,
              Approved_Date : apd,
              Comment : req.body.PaymentData.Comment,
              Paid_Date : req.body.PaymentData.Paid_Date,
              Modified_At : new Date()
           }
        }
        else {
          var claimid = req.body.selectedRow[i].Claim_Id;
          var dor = req.body.selectedRow[i].Date_Of_Receipt;
          dor = dor.replace('T',' ').replace('Z', '');
          var apd = req.body.selectedRow[i].Approved_Date;
          apd = dor.replace('T',' ').replace('Z', '');

          var modelData = {
              Employee_Id : req.body.selectedRow[i].Employee_Id.toUpperCase(),
              Amount_Type : req.body.PaymentData.Amount_Type,
              Claim_Amount : req.body.selectedRow[i].Claim_Amount,
              Expense_Type : req.body.selectedRow[i].Expense_Type,
              Expense_Details : req.body.selectedRow[i].Expense_Details,
              Project_Name : req.body.selectedRow[i].Project_Name,
              Status : req.body.PaymentData.Status,
              Date_Of_Receipt : dor,
              Approved_Amount :req.body.selectedRow[i].Approved_Amount,
              Approved_Date : apd,
              Comment : req.body.PaymentData.Comment,
              Paid_Date : req.body.PaymentData.Paid_Date,
              Modified_At : new Date()
           }
        }
        knex1.transaction(function (t) {
            return knex1('reimbursement_details')
                .transacting(t)
                .update(modelData)
                .where('Claim_Id', '=', claimid )
                .then(function (response) {
                  var symbol;
                  if(req.body.PaymentData.Amount_Type == "USD" ){
                    symbol = "$";
                  }
                  else {
                    symbol = "₹";
                  }
                    if(req.body.selectedRow.length != 0) {
                      var To_Name = req.body.selectedRow[i].Email_Id;
                      var claimid = req.body.selectedRow[i].Claim_Id;
                      var comment = req.body.PaymentData.Comment;
                      var approvedAmount = req.body.selectedRow[i].Approved_Amount;
                      var approvedDate = req.body.selectedRow[i].Approved_Date;
                      var claimAmount = req.body.selectedRow[i].Claim_Amount;
                      var paidDate = req.body.PaymentData.Paid_Date;
                    }
                    else {
                      var To_Name = req.body.PaymentData.Employee_Email;
                      var claimid = req.body.PaymentData.Claim_Id;
                      var comment = req.body.PaymentData.Comment;
                      var approvedAmount = req.body.PaymentData.Approved_Amount;
                      var approvedDate = req.body.PaymentData.Approved_Date;
                      var claimAmount = req.body.PaymentData.Claim_Amount;
                      var paidDate = req.body.PaymentData.Paid_Date;
                    }
                      if (req.body.PaymentData.Status == null || req.body.PaymentData.Status == 'Submitted') {
                          var text = '<p>Hi</p><p>Your request for reimbursement of an amount of <b>'+symbol+' '+claimAmount+' </b> has been received. Please note <b> claim no:'+claimid+' </b> for reference.</p><p>Regards<br>Accounts Team</p>';
                      }
                      else if (req.body.PaymentData.Status == 'Accept') {
                        var text = '<p>Hi</p><p>Your reimbursement claim with <b> claim no:'+claimid+' </b> has been accepted on <b>'+approvedDate+'</b> for an amount <b> '+symbol+' '+ approvedAmount + '</b>';
                        if ( comment !== null && comment !== undefined && comment.length > 0 ) {
                            text += ' with comment <b>'+comment+'</b>. </p><p>Regards,<br>Accounts Team</p>';
                        } else {
                            text += '.';
                        }
                      }
                      else if (req.body.PaymentData.Status == 'Paid') {
                        var text = '<p>Hi</p><p> <b>An amount of '+symbol+' '+approvedAmount+'</b> has been paid/disbursed on <b> '+paidDate+' </b>against your reimursement claim with <b> claim no:'+claimid+' </b> for an amount of  <b> '+symbol+' '+claimAmount+' </b>. Kindly acknowledge receipt.</p><p>Regards<br>Accounts Team</p>';
                      }
                      else {
                        var text = '<p>Hi</p><p>Your reimbursement claim with <b>  claim no:'+claimid+' </b> is on hold with comments as <b> '+comment+' </b>. Kindly contact us for further information.<p>Regards<br>Accounts Team</p>';
                      }

                      var nodemailer = require('nodemailer');
                      var transporter = nodemailer.createTransport({
                        type: 'SMTP',
                        host: 'smtp-mail.outlook.com',
                        port: 587,
                        secure: false, // disable SSL
                        requireTLS: true, // Force TLS
                        tls: {
                          rejectUnauthorized: false
                        },
                        auth: {
                          user: 'reimbursements@affineanalytics.com',
                          pass: 'Affine$123'
                        },
                        ciphers: 'SSLv3'
                      });

                      var mailOptions = {
                        from: 'reimbursements@affineanalytics.com',
                        to: To_Name,
                        subject: 'Reimbursement claim:'+claimid,
                        text: 'Status update for your claim',
                        html: text
                      };

                      console.log("Sending email...");
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                          emailSent = false;
                          // res.send( { Error : "error" } );
                        } else {
                          emailSent = true;
                          // console.log(To_Name);
                          console.log('Email sent successfully: ' + info.response);
                          // res.status(200).send( { Status : "Mail sent successfully" } );
                        }
                      });
                })
            .then(t.commit)
            .catch(t.rollback)
        })
        .then(function (success) {
          if(req.body.selectedRow.length > 0 ) {
            if ( req.body.selectedRow.length - 1 === i ) {
              returnResult( emailSent );
            } else {
              insertRowToDatabase( i + 1 );
            }
          }
          else {
            returnResult( emailSent );
          }
        })
        .catch(function (error) {
            console.log(error);
        });
      }
      insertRowToDatabase( 0 );
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
  var To_Name = req.body.PaymentData.Employee_Email;
  var claimid = req.body.Claim_Id;
  var comment = req.body.PaymentData.Comment;
  var approvedAmount = req.body.PaymentData.Approved_Amount;
  var approvedDate = req.body.PaymentData.Approved_Date;
  var claimAmount = req.body.PaymentData.Claim_Amount;
  var paidDate = req.body.PaymentData.Paid_Date;

  var symbol;
  if(req.body.PaymentData.Amount_Type == "USD"  ){
    symbol = "$";
  }
  else {
    symbol = "₹";
  }

  if (req.body.PaymentData.Status == null) {
      var text = '<p>Hi</p><p>Your request for reimbursement of an amount of <b> '+symbol+'  '+claimAmount+' </b> has been received. Please note <b> claim no:'+claimid+' </b> for reference.</p><p>Regards<br>Accounts Team</p>';
  }
  else if (req.body.PaymentData.Status == 'Accept') {
    var text = '<p>Hi</p><p>Your reimbursement claim with <b> claim no:'+claimid+' </b> has been accepted on <b>'+approvedDate+'</b> for an amount <b> '+symbol+' '+ approvedAmount + '</b>';
    if ( comment !== null && comment !== undefined && comment.length > 0 ) {
        text += ' with comment <b>'+comment+'</b>. </p><p>Regards,<br>Accounts Team</p>';
    } else {
        text += '.';
    }
  }
  else if (req.body.PaymentData.Status == 'Paid') {
    var text = '<p>Hi</p><p> <b>An amount of '+symbol+' '+approvedAmount+'</b> has been paid/disbursed on <b> '+paidDate+' </b>against your reimursement claim with <b> claim no:'+claimid+' </b> for an amount of  <b> '+symbol+' '+claimAmount+' </b>. Kindly acknowledge receipt.</p><p>Regards<br>Accounts Team</p>';
  }
  else {
    var text = '<p>Hi</p><p>Your reimbursement claim with <b>  claim no:'+claimid+' </b> is on hold with comments as <b> '+comment+' </b>. Kindly contact us for further information.<p>Regards<br>Accounts Team</p>';
  }

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
        auth: {
            user: 'reimbursements@affineanalytics.com',
            pass: 'Affine$123'
        }
  });

  var mailOptions = {
    from: 'reimbursements@affineanalytics.com',
    to: To_Name,
    subject: 'Reimbursement claim:'+claimid,
    text: 'Status update for your claim',
    html: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send( { Error : "error" } );
    } else {
      // console.log(To_Name);
      console.log('Email sent: ' + info.response);
      res.status(200).send( { Status : "Mail sent successfully" } );
    }
  });
})

app.get('/employeeIdList/', function (req, res) {
  var id = req.params.data;
  var sqlQuery = "SELECT * FROM rtracker.employee_details";
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

app.post('/api/updateEmployeeData', function (req, res) {
    console.log("Requested loading employee data: %s", req.body.File_Name);
    var fileName = req.body.File_Name;

    dataUploader.loadData( fileName, req, res, knex1 );
});

// Change user password.
app.post('/api/changePassword', function (req, res) {
    var un = req.body.username,
        cp = req.body.Current_Password,
        np = req.body.New_Password;

        knex1.select('id', 'username', 'password')
        .from('aa_user')
        .where('username', un)
        .timeout(10000, {cancel: true})
        .map(function (row) { return row; })
        .then(function(userDetails = []){
            // console.log( userDetails[0].password );

            if ( userDetails.length ) {
                bcrypt.compare(cp, userDetails[0].password, function(err, ress) {

                    // console.log( ress );

                    if ( ress ) {
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(np, salt);

                        knex1('aa_user')
                        .where('id', userDetails[0].id)
                        .update({
                            password: hash,
                            updated_at: new Date()
                        })
                        .then(function(response){
                            // console.log(response);
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).send({
                                result: 'success',
                                message:'Your password has been changed. Please log in again.'
                            });
                        });

                  } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({
                        result: 'failure',
                        message:'Current password is not valid to change your password.'
                    });
                  }

                });
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({
                    result: 'failure',
                    message:'Sorry, could not change your password. Please contact the administrator.'
                });
            }
        })
        .catch(function (err) {
            console.log('Error: %s', err.toString());
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({
                result: 'failure',
                message:'Some error occured. Please contact the administrator.'
            });
        });
});


// Begin listening
app.listen(3100, function() {
    console.log("Express server listening on port 3100");
});
