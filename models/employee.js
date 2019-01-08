const mongoose = require('mongoose');

let empSchema = mongoose.Schema(
    {
        "empid":Number,
        "name":String,
        "salary":Number
    },
    { collection: 'employees'} 
    );

let Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;
