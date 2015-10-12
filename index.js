'use strict';
var
  http = require('http');

function _getStrings(body) {
  var ret = [],
    strings = body.split("\n");
  strings.map(function (oneString) {
    if (/^\d\d\d\d\s\d\d\s\d\d\s\s\d\d/.test(oneString)) {
      ret.push(oneString);
    }
  });
  return ret;
}

function _parseString(oneString) {
  var parsedData = [],
    dts,
    rows = oneString.split(' ');

  rows.map(function (row) {
    if (row) {
      parsedData.push(row);
    }
  });

//because there is 4 hours between  W075 and Unix Timestamp time
  dts = new Date(new Date(parsedData[0], (parsedData[1] - 1), parsedData[2], parsedData[3].substring(0, 2), parsedData[3].substring(2, 4)).getTime()  + 4 * 60 * 60 * 1000);

  return {
    timestamp: dts.getTime(),
    time: dts,
    Hp: parseFloat(parsedData[6]),
    He: parseFloat(parsedData[7]),
    Hn: parseFloat(parsedData[8]),
    total: parseFloat(parsedData[9]),
    units: "nanotesla (nT)"
  };
}


function _fetch(dataUrl,callback) {
  http.get(dataUrl,function (res) {
    var body = '';
    if (res.statusCode === 200) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        body = body + chunk;
      });
      res.on('end', function () {
        var strings = _getStrings(body);
        if (strings.length > 0) {
          var parsedStrings = strings.map(_parseString);
          callback(null, parsedStrings);
        } else {
          callback(new Error('Unable to parse data!'));
        }
      });
    } else {
      callback(new Error('Bad server response with code ' + res.statusCode));
    }
  }).on('error', function (e) {
      callback(e);
    });
}

exports.getPrimary = function(callback){
  return _fetch('http://services.swpc.noaa.gov/text/goes-magnetometer-primary.txt', callback);
};

exports.getSecondary = function(callback){
  return _fetch('http://services.swpc.noaa.gov/text/goes-magnetometer-secondary.txt', callback);
};