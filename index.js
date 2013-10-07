var http = require('http'),
  dataUrl = 'http://www.swpc.noaa.gov/ftpdir/lists/geomag/Gp_mag_1m.txt';

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

  dts = new Date(parsedData[0], (parsedData[1] - 1), parsedData[2], parsedData[3].substring(0, 2), parsedData[3].substring(2, 4));
  return {
    timestamp: (dts.getTime() + 4 * 60 * 60 * 1000), //because there is 4 hours between  W075 and Unix Timestamp time
    Hp: parseFloat(parsedData[6]),
    He: parseFloat(parsedData[7]),
    Hn: parseFloat(parsedData[8]),
    total: parseFloat(parsedData[9]),
    units: "nanotesla (nT)"
  };
}

module.exports = exports = function (callback) {
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
      callback(new Error('Bad server response with code' + res.statusCode));
    }
  }).on('error', function (e) {
      callback(e);
    });
};
