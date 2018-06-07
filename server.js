const express = require("express");
const app = express();
const data = require("./my-modules/data");
let cron = require('cron');

/* pour éviter d'attendre 30 min... */
data.retrieveData();

/* pour l'instant que le 4H OHLC, retrieve toutes les 30 min... */
let cronJob = cron.job("0 */30 * * * *", data.retrieveData);
cronJob.start();
console.log('cronJob started');

app.listen(3001, function() {
  console.log("listening on 3001");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/* si besoin : */
app.get("/retrieveData", (req, res) => {
  data.retrieveData();//répond pas, normal...
});

app.get("/ohlc1minute", (req, res) => {
  let size = req.query.size;
  let fullData = data.getOhlc1minute();
  let slicedData = fullData.slice(fullData.length - size, fullData.length);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(slicedData, null, 3));
});
