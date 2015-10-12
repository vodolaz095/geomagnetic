var
  should = require('should'),
  geomagnetic = require('./../index.js');

describe('geomagnetic#getPrimary', function () {
  var
    error,
    data;
  before(function (done) {
    geomagnetic.getPrimary(function (e, d) {
      error = e;
      data = d;
      done(e);
    });
  });

  it('should not throw error', function () {
    should.not.exist(error);
  });

  it('should return array of data', function () {
    data.should.be.an.instanceOf(Array);
    data.length.should.be.above(1);
  });

  it('every array element should have proper data structure', function () {
    var now = new Date().getTime();
    data.map(function (element) {
      /*
       { timestamp: 1381183560000,
       time: Sun May 04 2014 03:05:00 GMT+0400 (MSK),
       Hp: -100000,
       He: -100000,
       Hn: -100000,
       total: -100000,
       units: 'nanotesla (nT)' } ]
       */

      element.should.have.property('timestamp');
      element.timestamp.should.be.above((now - 24 * 60 * 60 * 1000));
      element.timestamp.should.be.below((now + 24 * 60 * 60 * 1000));
      element.time.should.be.a.Date;


      element.should.have.property('Hp');
      if (element.Hp != -100000) {
        element.Hp.should.be.above(-300);
        element.Hp.should.be.below(300);
      }

      element.should.have.property('He');
      if (element.He != -100000) {
        element.He.should.be.above(-300);
        element.He.should.be.below(300);
      }

      element.should.have.property('Hn');
      if (element.Hn != -100000) {
        element.Hn.should.be.above(-300);
        element.Hn.should.be.below(300);
      }

      element.should.have.property('total');
      if (element.total != -100000) {
        element.total.should.be.above(0);
        element.total.should.be.below(300);
      }
      element.should.have.property('units', 'nanotesla (nT)');
    });
  });
});

describe('geomagnetic#getSecondary', function () {
  var
    error,
    data;
  before(function (done) {
    geomagnetic.getSecondary(function (e, d) {
      error = e;
      data = d;
      done(e);
    });
  });

  it('should not throw error', function () {
    should.not.exist(error);
  });

  it('should return array of data', function () {
    data.should.be.an.instanceOf(Array);
    data.length.should.be.above(1);
  });

  it('every array element should have proper data structure', function () {
    var now = new Date().getTime();
    data.map(function (element) {
      /*
       { timestamp: 1381183560000,
       time: Sun May 04 2014 03:05:00 GMT+0400 (MSK),
       Hp: -100000,
       He: -100000,
       Hn: -100000,
       total: -100000,
       units: 'nanotesla (nT)' } ]
       */

      element.should.have.property('timestamp');
      element.timestamp.should.be.above((now - 24 * 60 * 60 * 1000));
      element.timestamp.should.be.below((now + 24 * 60 * 60 * 1000));
      element.time.should.be.a.Date;


      element.should.have.property('Hp');
      if (element.Hp != -100000) {
        element.Hp.should.be.above(-300);
        element.Hp.should.be.below(300);
      }

      element.should.have.property('He');
      if (element.He != -100000) {
        element.He.should.be.above(-300);
        element.He.should.be.below(300);
      }

      element.should.have.property('Hn');
      if (element.Hn != -100000) {
        element.Hn.should.be.above(-300);
        element.Hn.should.be.below(300);
      }

      element.should.have.property('total');
      if (element.total != -100000) {
        element.total.should.be.above(0);
        element.total.should.be.below(300);
      }
      element.should.have.property('units', 'nanotesla (nT)');
    });
  });
});
