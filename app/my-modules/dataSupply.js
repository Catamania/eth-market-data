let models = require('./db');

function getDevise(cb) {
    models.Pair.findDevises(function(err, d) {
      if (d) {
        console.log("Sending availlable devise");
        console.log("DATA -> "+JSON.stringify(d));
        cb(d);
      } else {
        console.log("No devises found !");
      }
    });
};


function getProvider(cb) {
    models.Pair.findProvider(function(err, d) {
      if (d) {
        console.log("Sending availlable provider");
        console.log("DATA -> "+JSON.stringify(d));
        cb(d);
      } else {
        console.log("No devises found !");
      }
    });
};


function getInterval(cb) {
    models.Pair.findInterval(function(err, d) {
      if (d) {
        console.log("Sending availlable Interval");
        console.log("DATA -> "+JSON.stringify(d));
        cb(d);
      } else {
        console.log("No devises found !");
      }
    });
};


function getPairsByTime(from, to, devise, interval, provider, cb) {
    models.Pair.findByTime(from, to, devise, interval, provider, function(err, d) {
      if (d) {
        console.log("Sending availlable devise");
        //console.log("DATA -> "+JSON.stringify(d));
        cb( d.map(item => item.data) );
      } else {
        console.log("No devises found !\n" + err);
      }
    });
};


function getMinMax(devise, interval, provider, cb) {
    models.Pair.findMinMax(devise, interval, provider, function(err, d) {
      if (d) {
        console.log("Sending Min Max");
        console.log("DATA -> "+JSON.stringify(d));
        cb(d[0].value);
      } else {
        console.log("No data found !");
      }
    });
};


module.exports.getMinMax = getMinMax;
module.exports.getInterval = getInterval;
module.exports.getProvider = getProvider;
module.exports.getDevise = getDevise;
module.exports.getPairsByTime = getPairsByTime;
