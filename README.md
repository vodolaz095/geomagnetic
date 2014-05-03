Geomagnetic
======================================
Parser for getting Earth magnetic field parameters from
Space Weather Prediction Center -
[http://www.swpc.noaa.gov/](http://www.swpc.noaa.gov/).

[![Build Status](https://travis-ci.org/vodolaz095/geomagnetic.png)](https://travis-ci.org/vodolaz095/geomagnetic)
[![NPM version](https://badge.fury.io/js/geomagnetic.svg)](http://badge.fury.io/js/geomagnetic)

Description
======================================
This is simple pure nodejs data scrapper, that grabs data from here -
[http://www.swpc.noaa.gov/ftpdir/lists/geomag/Gp_mag_1m.txt](http://www.swpc.noaa.gov/ftpdir/lists/geomag/Gp_mag_1m.txt)
and parses them as array.

Usage
======================================

```javascript

    var geomagnetic = require('geomagnetic');
    geomagnetic(function(err,data){
      if(err) throw err;
      console.log(data);
    });

```

will return something like:

```javascript

     [
      { timestamp: 1399158180000,
        time: Sun May 04 2014 03:03:00 GMT+0400 (MSK),
        Hp: 63.7,
        He: 75.2,
        Hn: -7.73,
        total: 98.8,
        units: 'nanotesla (nT)'
      },
      { timestamp: 1399158240000,
        time: Sun May 04 2014 03:04:00 GMT+0400 (MSK),
        Hp: 64.4,
        He: 76.2,
        Hn: -9.04,
        total: 100,
        units: 'nanotesla (nT)'
      },
      { timestamp: 1399158300000,
        time: Sun May 04 2014 03:05:00 GMT+0400 (MSK),
        Hp: 64.5,
        He: 77.1,
        Hn: -9.51,
        total: 101,
        units: 'nanotesla (nT)'
      }
     ]

```

The data is an array of objects with 4 fields:

  `timestamp` - unix timestamp of moment when current measures are taken

  `time` - javascript object of Date of moment when current measures are taken

  `Hp` - component perpendicular to the satellite orbital plane or parallel to the Earth's spin axis

  `He` -  component perpendicular to Hp and directed earthwards

  `Hn` - component perpendicular to both Hp and He, directed eastwards

  `total` - absolute value of magnetic field  - sqrt(Hp^2+He^2+Hn^2).

All data have units in `nanoteslas` - nT.

Note 1: `total` is probably measured by omni directional solenoid system,
not counted from He, Hp, Hn, so there is <5% discrepance.

Note 2: sometimes there is -100000 values for magnetic fields magnitutes.
This is probably the error in data transfer or a way to show that data was
not properly acquired. So, the user of library can simply negate this values.



Copyright
======================================
The MIT License (MIT)

Copyright (c) 2013 Anatolij Ostroumov ostroumov095 at gmail dot com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

