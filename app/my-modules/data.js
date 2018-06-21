var models = require('./db');
/*
données (pas persistées)
*/
let ohlc1minute;

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

var addPair = function(pair, conf, devise) {
    //ajout des infos pour mise en base
    pr = { provider: conf.provider, devise: devise, interval: 240, data: pair }
    var newPair = new models.Pair(pr);

    newPair.save(function(err, p) {
        if (err) return console.error(err);
        console.log(JSON.stringify(p) + " -> SAVED");
    });
}


let retrieveData = function() {
  krakenPublicMarketData
    .postRequest("OHLC", { pair: config.DEVISES, interval: 240 })
    .then(function(responseBody) {
      ohlc1minute = responseBody.result[config.DEVISES];

        // sauvegarde en db
        responseBody.result[config.DEVISES].map( item => addPair(item, krakenConfig, config.DEVISES) );
    })
    .catch(error => console.log(error));
};

let getOhlc1minute = function() {
    //console.log("!! getOhlc1minute !!"+ JSON.stringify(ohlc1minute))
  return ohlc1minute;
};

module.exports.retrieveData = retrieveData;
module.exports.getOhlc1minute = getOhlc1minute;
