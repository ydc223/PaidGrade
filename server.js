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

mongoose.connect('mongodb://46.101.192.178/bribedatabase');

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

	new_response.save(function(err) {
    if (err) throw err;
    User.find({}, function(err, users) {
      if (err) throw err;

      // object of all the users
      console.log(users);
    });
  })

	var obj = JSON.parse(fs.readFileSync('./public/data/bribe.json'));

  obj.push(req.query);
  console.log(obj);
  fs.writeFile('public/data/bribe.json', JSON.stringify(obj), function(err){
    if(err)
      throw err;
    else{
      console.log('added a new report to the database');
      // res.setHeader("Content-Type", "application/json");
      // res.json(obj);
      res.end();
    }

  // obj.push(new_comment);
  // console.log(obj);


    console.log('User saved successfully!');
  });
});
