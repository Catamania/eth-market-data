let models = require('./db');
let config = require("./config");
//let krakenPublicMarketData = require("../my-kraken-api/krakenPublicMarketData");
//let krakenConfig = require("../my-kraken-api/krakenConfig");
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
  console.log (" !! OHLC 3");

  if (provider.has.fetchOHLCV) {
    (async () => {
      console.log(" -> Asking data from : "+provider.name+", "+devise);
      let result = await provider.fetchOHLCV (devise, interval+'m')

      console.log(" -> Saving data from : "+provider.name+", "+devise);
      result.map( item => addPair(item, provider, devise, interval) );
    }) ()
  } else {
    console.log (" !! NO OHLC...");
  }
};


let startJob = function(provider, devise, interval) {
  console.log (" !! OHLC 2");
  let cronJob = cron.job(interval.cronstr, function () {
    ohlcAlim (provider, devise, interval.int);
  }, function () {
    /* This function is executed when the job stops */
  },
  true);
  cronJob.start();
}

//startJob(exchange["bittrex"], config.DEVISES[0], config.INTERVALS[0]);
//ohlcAlim (exchange["bittrex"], config.DEVISES[0], config.INTERVALS[0].int);

let startCronJobs = function() {
  console.log (" !! OHLC 1");
  let delay = 0
  let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));


  (async () => {
    for (let i = 0; i < config.INTERVALS.length; i++) {
      //interval = config.INTERVALS[i];
      
      for (let p in exchange) {
        //provider = exchange[p];

        for (let j = 0; j < config.DEVISES.length; j++) {
          //devise = config.DEVISES[j];

          // wait 2s between each provider call
          await sleep (delay * 2000)
          delay++
          startJob(exchange[p], config.DEVISES[j], config.INTERVALS[i])
        }

      }

    }
  }) ()
}


module.exports.startCronJobs = startCronJobs;
