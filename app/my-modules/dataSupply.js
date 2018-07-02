let models = require('./db');
/*let config = require("./config");
let krakenPublicMarketData = require("../my-kraken-api/krakenPublicMarketData");
let krakenConfig = require("../my-kraken-api/krakenConfig");

let ccxt = require ('ccxt');


let addPair = function(pair, provider, devise) {
  //ajout des infos pour mise en base
  let newPair = new models.Pair({ 
    provider: provider.name, 
    devise: devise, 
    interval: 240, 
    data: pair 
  });

  newPair.save(function(err, p) {
    if (err) return console.error(err);
      //console.log(JSON.stringify(p) + " -> SAVED");
    });
}

let retrieveData = function(provider = krakenConfig.config, devise = config.DEVISES) {
  krakenPublicMarketData
  .postRequest(provider.service, { pair: devise, interval: 240 })
  .then(function(responseBody) {
    // TODO : remove
    //ohlc1minute = responseBody.result[devise];

    console.log(" -> Saving data from : "+provider.name+", "+provider.service+", "+config.DEVISES);
    responseBody.result[config.DEVISES].map( item => addPair(item, provider, devise) );
    })
  .catch(error => console.log(error));
};


function getData(devise, interval, cb) {
    models.Pair.findByDevInt(devise, interval, function(err, d) {
      if (d) {
        //console.log("DATA -> "+JSON.stringify(d));
        console.log("Sending Data found for devise : "+devise+" with this interval -> "+interval);
        cb(d);
      } else {
        console.log("No Data found for devise : "+devise+" with this interval -> "+interval);
      }
    });
};*/

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

function getPairsByTime(from, to, devise, interval, provider, cb) {
    models.Pair.findByTime(from, to, devise, interval, provider, function(err, d) {
      if (d) {
        console.log("Sending availlable devise");
        console.log("DATA -> "+JSON.stringify(d));
        cb( d.map(item => item.data) );
      } else {
        console.log("No devises found !\n" + err);
      }
    });
};

//module.exports.retrieveData = retrieveData;

module.exports.getDevise = getDevise;
module.exports.getPairsByTime = getPairsByTime;
