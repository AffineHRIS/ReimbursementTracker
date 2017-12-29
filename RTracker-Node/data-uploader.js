// Module dependencies
'use strict';

// Load dependencies
const convertExcel = require('excel-as-json').processFile;

// All methods are defined in methods object
var methods = {

    // Loading basic details of the employees
    loadData: function ( src, req, res, knex1 ) {
        // new Date((r - (25569))*86400*1000)
        convertExcel(src, 'output.json', { sheet: '2' }, function(err, data) {
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
                        Design_At_Joining: empData.Design_At_Joining,
                        Joining_Date: new Date( ( parseInt( empData.Joining_Date ) - 25569 ) * 86400 * 1000 ),
                        Dob_Official: new Date( ( parseInt( empData.Dob_Official ) - 25569 ) * 86400 * 1000 ),
                        Dob_Actual: new Date( ( parseInt( empData.Dob_Actual ) - 25569 ) * 86400 * 1000 ),
                        Gender: empData.Gender,
                        Blood_Group: empData.Blood_Group,
                        Contact_No: empData.Mobile_No,
                        Alternate_Contact_No: empData.Alternate_Contact_No,
                        Nationality: empData.ABC_XYZ,
                        Religion: empData.ABC_XYZ,
                        Photograph: empData.ABC_XYZ,
                        Reporting_Manager: empData.ABC_XYZ,
                        Probation_Period: empData.ABC_XYZ,
                        Work_Location: empData.ABC_XYZ,
                        Source_of_Hire: empData.ABC_XYZ,
                        CTC: empData.ABC_XYZ,
                        Source_Of_Hire_Name: empData.ABC_XYZ,
                        Emergency_Contact_No: empData.Alternate_Contact_No,
                        Emergency_Contact_Name: empData.Emergency_Contact_Name1,
                        Emergency_Contact_Relation: empData.ABC_XYZ,
                        HR_SPOC: empData.ABC_XYZ
                    });
                }


                knex1('test_employee')
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
