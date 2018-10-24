'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


// **TODO************************
// on submit I receive file name and size in bytes in JSON
// use multer npm package to handle file uploading

// EXAMPLE
// 
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
// 
// <form action="/profile" method="post" enctype="multipart/form-data">
//   <input type="file" name="avatar" />
// </form>
// 
// app.post('/profile', upload.single('avatar'), function (req, res, next) {});
// 
// req.file is the `avatar` file
// req.body will hold the text fields, if there were any


// **START WITH STANDARD HANDLER
// app.post('/api/fileanalyse', function(req, res){  
  // **first just return greeting
  // res.json({greetings: "Hello, API"});
  // WORKS
  // **next try to get req
  // res.json({reqBody: req.body});
  // IS EMPTY = {} - DOES NOT EVEN INCLUDE "reqBody" as below!
  // MAKES SENSE AS req.body NOW HANDLED BY MULTER SO NOT ACCESSIBLE?
// });

// **NOW ADD upload TO POST HANDLER
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  // **same as before - first just return greeting
  // res.json({greetings: "Hello, API"});
  // WORKS
  // **and also repeat - next try to get req
  // res.json({reqBody: req.body});
  // IS EMPTY = {"reqBody": {}} - BUT SHOWS "reqBody" AT LEAST
  // STILL MAKES SENSE AS NO TEXT FIELDS IN POST - JUST A SINGLE FILE - SO ACCESSIBLE BUT EMPTY?
  
  // **now try to get req.file
  // res.json({
  //   reqBody: req.body,
  //   reqFile: req.file
  // });
  // WORKS - returns following:
  // {
  //   "reqBody": {},
  //   "reqFile": {
  //     "fieldname": "upfile",
  //     "originalname": "test.txt",
  //     "encoding": "7bit",
  //     "mimetype": "text/plain",
  //     "destination": "uploads/",
  //     "filename": "7d86b3408fb1e91912ad061f27110219",
  //     "path": "uploads/7d86b3408fb1e91912ad061f27110219",
  //     "size": 0
  //   }
  // }
  
  // Key - Description - Note
  // fieldname - Field name specified in the form	
  // originalname - Name of the file on the user's computer	
  // encoding - Encoding type of the file	
  // mimetype - Mime type of the file	
  // size - Size of the file in bytes	
  // destination - The folder to which the file has been saved - DiskStorage
  // filename - The name of the file within the destination - DiskStorage
  // path - The full path to the uploaded file - DiskStorage
  // buffer - A Buffer of the entire file - MemoryStorage
  
  // f**inally repeat to provide file name and size in bytes in JSON as required
  res.json({
    file_name: req.file.originalname,
    file_size_bytes: req.file.size
  });
  
  
});


// OKUser stories:
// OK-I can submit a form that includes a file upload.
// OK-The from file input field has the "name" attribute set to "upfile". We rely on this in testing.
// OK-When I submit something, I will receive the file name and size in bytes within the JSON response
// OKUsage:
// OK-Go to the main page, and upload a file using the provided form.
// OKHint:
// OK-To handle the file uploading you should use the multer npm package.

// <form enctype="multipart/form-data" method="POST" action="/api/fileanalyse">
//   <input id="inputfield" type="file" name="upfile">
//   <input id="button" type="submit" value="Upload">
// </form>

// Choose and Upload file
// https://miniature-stoat.glitch.me/api/fileanalyse
// Cannot POST /api/fileanalyse


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
