var vows = require('vows'),
    should = require('should'),
    geomagnetic = require('./../index.js');

vows.describe('geomagnetic')
    .addBatch({
      'geomagnetic parses the data and' : {
        'topic':function(){
          geomagnetic(this.callback);
        },
        'should not throw error': function(err, data){
          should.not.exist(err);
        },
        'should return array of data': function(err,data){
          data.should.be.an.instanceOf(Array);
          data.length.should.be.above(1);
        },
        'every array element have proper data structure': function(err,data) {
          var now = new Date().getTime();
          data.map(function(element){
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
            element.timestamp.should.be.above((now-24*60*60*1000));
            element.timestamp.should.be.below((now+24*60*60*1000));
            element.time.should.be.a.Date;


            element.should.have.property('Hp');
            if(element.Hp != -100000){
              element.Hp.should.be.above(-300);
              element.Hp.should.be.below(300);
            }

            element.should.have.property('He');
            if(element.He != -100000){
              element.He.should.be.above(-300);
              element.He.should.be.below(300);
            }

            element.should.have.property('Hn');
            if(element.Hn != -100000){
              element.Hn.should.be.above(-300);
              element.Hn.should.be.below(300);
            }

            element.should.have.property('total');
            if(element.total != -100000){
              element.total.should.be.above(0);
              element.total.should.be.below(300);
            }
            element.should.have.property('units','nanotesla (nT)');
          });
        }
      }
    })
    .export(module);
