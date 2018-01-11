// Module dependencies
'use strict';

// Load dependencies
const convertExcel = require('excel-as-json').processFile;

// All methods are defined in methods object
var methods = {

    // Loading basic details of the employees
    loadData: function ( src, req, res, knex1 ) {
        // new Date((r - (25569))*86400*1000)
        convertExcel(src, 'output.json', { sheet: '1' }, function(err, data) {
            if ( err ) {
                console.log( "JSON conversion failure: #{err}" );
            } else {
                var size = data.length;
                var employee_list = [];

                for (var i = 0; i < size; i++) {
                    var empData = data[i];
                    employee_list.push({
                        Employee_Id: empData.Employee_Id,
                        Employee_Name: empData.Employee_Name,
                        Email_Id: empData.Email_Id
                    });
                }

                knex1('employee_details')
                .insert( employee_list )
                .then(function(result){
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({
                        data: { dataSize: data.length },
                        result: 'success',
                        message:'Employee data has uploaded successfully!'
                    });
                })
                .catch(function (error){
                    console.log(error);
                });

            }
        });
    },

    // Loading basic details of the employees
    loadAll: function ( data ) {
        loadBasic(data);
        loadBank(data);
    },

    // Loading basic details of the employees
    loadBasic: function ( data ) {

    },

    // Loading bank details of the employees
    loadBank: function ( data ) {

    }

};

module.exports = methods;
