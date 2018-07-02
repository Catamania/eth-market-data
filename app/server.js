const express = require("express");
const app = express();
const dataAlim = require("./my-modules/dataAlim");
const dataSupply = require("./my-modules/dataSupply");

//dataAlim.startCronJobs()
//console.log('cronJob started');

app.listen(3001, function() {
  console.log("listening on 8088");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/* si besoin : */
app.get("/retrieveData", (req, res) => {
  //data.retrieveData();//répond pas, normal...
  console.log(" !! !! "+JSON.stringify(req.query))
});

app.get("/ohlc1minute", (req, res) => {
  let size = req.query.size;
  console.log(" !! !! "+JSON.stringify(req.query))
  //data.getOhlc1minute();
  /*let fullData = data.getOhlc1minute(function (fullData) {
  	let slicedData = fullData.slice(fullData.length - size, fullData.length).map(item => item.data);
  	res.setHeader("Content-Type", "application/json");
  	res.send(JSON.stringify(slicedData, null, 3));
  });*/
  
});

app.get("/devises", (req, res) => {

  dataSupply.getDevise(function (d) {
  	//let slicedData = d.slice(fullData.length - size, fullData.length).map(item => item.data);
  	res.setHeader("Content-Type", "application/json");
  	res.send(JSON.stringify(d, null, 3));
  });
  
});

app.get("/:provider/:devise/:interval", (req, res) => {
	let from = parseInt(req.query.from);
	let to = parseInt(req.query.to);
	let interval = parseInt(req.params.interval);
	let devise = req.params.devise.replace('-', '/');

	console.log("params -> "+JSON.stringify(req.params));

  dataSupply.getPairsByTime(from, to, devise, interval, req.params.provider, function (d) {
  	//let slicedData = d.slice(fullData.length - size, fullData.length).map(item => item.data);
  	res.setHeader("Content-Type", "application/json");
  	res.send(JSON.stringify(d, null, 3));
  });
  
});