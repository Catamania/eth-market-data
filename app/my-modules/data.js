/*
données (pas persistées)
*/
let ohlc1minute;

let models = require('./db');
let config = require("./config");
let krakenPublicMarketData = require("../my-kraken-api/krakenPublicMarketData");
let krakenConfig = require("../my-kraken-api/krakenConfig");

/*
[
1501299780,
    "160.33295",
    "160.50000",
    "160.00320",
    "160.00320",
"160.24895",
"55.27977004",
32
]
<time>, 
    <open>, 
    <high>, 
    <low>, 
    <close>, 
<vwap>, 
<volume>, 
<count>
*/

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
    ohlc1minute = responseBody.result[devise];

    console.log(" -> Saving data from : "+provider.name+", "+provider.service+", "+config.DEVISES);
    responseBody.result[config.DEVISES].map( item => addPair(item, provider, devise) );
    })
  .catch(error => console.log(error));
};

let getOhlc1minute = function() {
  return ohlc1minute;
};

module.exports.retrieveData = retrieveData;
module.exports.getOhlc1minute = getOhlc1minute;
