const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/fse', {useNewUrlParser: true});

let db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Bringing Model
let Employee = require('./models/employee');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Employee API')
});

app.get('/employees', (req, res) => {
  Employee.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('content-type','application/json');
      res.end(JSON.stringify(data));
      //res.send(data);
    }
  });
});

app.get('/employees/:id', (req, res) => {
  let empid = parseInt(req.params.id);
  let query = {"empid": empid }
  console.log(query);
  
  Employee.find(query, (err, data) => {
    if (err) {
      res.end(JSON.stringify({ message : 'Unable process the request', errorCode: 400}));
    } else {
      res.setHeader('content-type','application/json');
      if (data.length > 0 ) {
        res.end(JSON.stringify(data));  
      } else {
        res.end("{'Error':'Employee Not Found'}");
      }
    }
  });
});

app.post('/employees/add', (req, res) => {
  
  let empName = req.body.name;
  let empSalary = req.body.salary;
  let empObj = {"id":2, "name":empName, "salary": empSalary};
  
  Employee.create(empObj, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Created..');
      res.setHeader('content-type','application/json');
      res.end('Created');  
    }
  });
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Server started...")
});
