let models = require('./db');
let config = require("./config");
let cron = require('cron');

let ccxt = require ('ccxt');
let exchange = {
//    kraken : new ccxt.kraken (),
//    allcoin : new ccxt.allcoin (),
    bittrex : new ccxt.bittrex ()
  };



let addPair = function(pair, provider, devise, interval) {
  //ajout des infos pour mise en base
  let newPair = new models.Pair({ 
    provider: provider.name, 
    devise: devise, 
    interval: interval, 
    time: pair[0],
    data: pair 
  });

  newPair.save(function(err, p) {
    if (err) return console.error(err);
    //console.log(JSON.stringify(p) + " -> SAVED");
    });
};


let ohlcAlim = function(provider, devise, interval) {
  if (provider.has.fetchOHLCV) {
    (async () => {
      console.log(" -> Asking data from : "+provider.name+", "+devise);
      let result = await provider.fetchOHLCV (devise, interval.int+'m').catch(
        (err) => {
          console.log(err);
        }
      );

      if (Array.isArray(result)) {
        console.log(" -> Saving data from : "+provider.name+", "+devise);
        result.map( item => addPair(item, provider, devise, interval.int) );
      }
    }) ()
  } else {
    console.log (" !! NO OHLC...");
  }
};


let startJob = function(provider, devise, interval) {
  console.log ("First call to "+provider+", for devise "+devise+" and interval "+interval.int);
  ohlcAlim (provider, devise, interval);

  let cronJob = cron.job(interval.cronstr, function () {
    ohlcAlim (provider, devise, interval);
  });

  console.log ("Starting cron job on "+provider+", for devise "+devise+" and interval "+interval.int);
  cronJob.start();
}


let forEachTrade = function(msg, cb) {
  console.log (msg);
  let delay = 0
  let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));

  (async () => {
    for (let i = 0; i < config.INTERVALS.length; i++) {
      for (let p in exchange) {
        for (let j = 0; j < config.DEVISES.length; j++) {
          // wait 2s between each provider call
          await sleep (delay * 2000)
          delay++
          cb(exchange[p], config.DEVISES[j], config.INTERVALS[i])
        }

      }

    }
  }) ()
}

let startCronJobs = function() {
  forEachTrade (" !! Starting cron jobs", startJob);
}


let startDevMode = function() {
  models.Pair.findProvider(function(err, d) {
      if (d.length > 0) {
        console.log("Mongo already populate, available pairs : "+JSON.stringify(d));
      } else {
        console.log("No data found !");
        forEachTrade ("populating database ...", ohlcAlim);
      }
    });
}


module.exports.startCronJobs = startCronJobs;
module.exports.startDevMode = startDevMode;
