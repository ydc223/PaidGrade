var express = require('express');
var http = require('http');
var path = require('path');
//fs - the filesystem module that allow to read/write from the disk
var fs =  require('fs');
var i18n = require('i18n');
var mongoose = require('mongoose');
var User = require('./user');


var app = new express();
app.set('port', 8080);

mongoose.connect('mongodb://localhost/myappdatabase');

// i18n.configure({
//   // setup some locales - other locales default to en silently
//   locales: ['uk', 'en'],
//
//
//   // where to store json files - defaults to './locales'
//   directory: __dirname + '/locales'
// });
//
//
// // i18n init parses req for language headers, cookies, etc.
// app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));

var myServer = http.createServer(app);
myServer.listen(app.get('port'), function(){
	console.log('server x started on port', app.get('port'));
});

app.get('/submit', function(req, res, err){
  if(err)
    console.log(err);

  var new_response = new User(req.query);
  console.log(req.query);

  // obj.push(new_comment);
  // console.log(obj);

  new_response.save(function(err) {
    if (err) throw err;
    User.find({}, function(err, users) {
      if (err) throw err;

      // object of all the users
      //console.log(users);
    });
  })

    console.log('User saved successfully!');
  });
