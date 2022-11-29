const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var axios = require('axios');

const mysql = require('mysql');
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
 }));

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : password,
    database : 'HWPlanner'
});

// Connect
db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('MySQL Connected...');
})

// Insert an assignment
app.post('/add', function(req,res) {
    let post = {name: req.body.HWName, course: req.body.course, dueDate: req.body.dueDate, priority: req.body.priority, comments: req.body.comments};
    let sql = 'INSERT INTO assignments SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);    
        //res.send('Assignment added...');
        res.sendFile(`${__dirname}/client/public/middlePage.html`);
    });
})

// Update an assignment NOT DONE WRITING
app.post('/edit/:id', function(req,res) {
    let post = {name: req.body.HWName, course: req.body.course, dueDate: req.body.dueDate, priority: req.body.priority, comments: req.body.comments};
    let sql = 'UPDATE assignments SET ? WHERE ';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);    
        res.send('Assignment Edited...');
    });
})

// Display all assignments by default order
app.get('/getassignments', (req, res) => {
    let sql = 'SELECT * FROM assignments';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send({assignments: results});
    });
})

// Display all assignments by due date
app.get('/getassignmentsbyduedate', (req, res) => {
    let sql = 'SELECT * FROM assignments ORDER BY dueDate';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send({assignments: results});
        //res.sendFile(`${__dirname}/client/public/middlePage.html`);
    });
})

// Delete assignment with id number input
app.post('/delete', (req, res) => {
    let sql = `DELETE FROM assignments WHERE id = ${req.body.HWid}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        //res.send('Assignment deleted');
        res.sendFile(`${__dirname}/client/public/middlePage.html`);
    })
})

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route for testing
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});