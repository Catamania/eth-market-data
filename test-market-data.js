let config = require("./my-modules/config");
let krakenPublicMarketData = require("./my-kraken-api/krakenPublicMarketData");
let data = require("./my-modules/data");

krakenPublicMarketData.postRequest("OHLC", { pair: config.DEVISES })
  .then(function(responseBody) {
    data.ohlc1minute = responseBody.result[config.DEVISES];
  })
  .catch(error => console.log(error));
