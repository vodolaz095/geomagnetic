var geomagnetic = require('./../index.js');
geomagnetic(function(err, data){
  if(err) throw err;
  console.log(data);
});
