
app.post('/authenticate', function (req, res) {

  var username = req.body.username;
  var password = req.body.password;

  con.query('SELECT * FROM dev_hris.users WHERE username = ?',[username], function (error, results, fields) {
    if ( error ) {
      res.json({
        status:false,
        message:'there is some error with query'
      });
    } else {
      if ( results.length > 0 ) {
        bcrypt.compare(password, results[0].password, function(err, ress) {

          if ( ress ) {

            con.query('SELECT Employee_Name FROM dev_hris.employee WHERE Employee_Id = ?', [results[0].username], function (error1, results1, fields1) {
              if ( error1 ) {
                res.json({
                  status: true,
                  message: 'User authentication is successful!',
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
                    message: 'User authentication is successful!',
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
