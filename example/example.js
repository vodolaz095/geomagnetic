var magnetic = require('./../index.js');
magnetic(function(err, data){
  if(err) throw err;
  console.log(data);
});
