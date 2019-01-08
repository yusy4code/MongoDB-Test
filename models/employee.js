const mongoose = require('mongoose');

let empSchema = mongoose.Schema(
    {
        "name":String,
        "salary":Number,
        "phone":Number
    },
    { collection: 'employees'} 
    );

let Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;
