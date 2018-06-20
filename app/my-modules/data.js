var models = require('./db');
/*
données (pas persistées)
*/
let ohlc1minute;

let config = require("./config");
let krakenPublicMarketData = require("../my-kraken-api/krakenPublicMarketData");

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

var addPair = function(pair) {
    var newPair = new models.Pair(pair);

    newPair.save(function(err, p) {
        if (err) return console.error(err);
        console.log(p.devise + " -> SAVED");
        //cb(p, true);
    });
}


let retrieveData = function() {
  krakenPublicMarketData
    .postRequest("OHLC", { pair: config.DEVISES, interval: 240 })
    .then(function(responseBody) {
      ohlc1minute = responseBody.result[config.DEVISES];
      console.log("!! retrieveData !!")

        responseBody.result[config.DEVISES].map(addPair);
    })
    .catch(error => console.log(error));
};

let getOhlc1minute = function() {
  return ohlc1minute;
};

module.exports.retrieveData = retrieveData;
module.exports.getOhlc1minute = getOhlc1minute;
