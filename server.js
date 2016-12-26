var express  = require('express');
var app      = express();
var http     = require('http');
var fs       = require('fs');
var request = require('request');
var path    = require('path');
var jsonfile = require('jsonfile'); //Write json to file
var open = require('open');

function checkFileExist(fileName, callback) {
    fs.exists(fileName, function(exists) {

      if(exists) {

        callback();

      } else {
        fs.writeFile(fileName, {flag: 'wx'}, function(err, data) {

          callback();

        });
      }

    });
}

exports.feeds = function(req, res) {
  var feeds = [];
  var dataToWrite = getData();
  dataToWrite.forEach(function(feed, i) {
    feeds.push(feed);
  });
  res.json({
    feeds: feeds
  });
};

function getData() {
  request({url: 'http://api.population.io:80/1.0/population/2015/Vietnam/', json: true}, function(err, res, json) {
    var fileName = 'public/data.json';
    jsonfile.writeFile(fileName, json);
    console.log(json);
    return json;
  });
}

app.listen(8000, function() {
  open('http://localhost:8000');
});
// app.use(express.static('/'));
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  getData();
  response.sendFile(path.join(__dirname + '/index.html'));

});
