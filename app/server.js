const express = require("express");
const app = express();
const dataAlim = require("./my-modules/dataAlim");
const dataSupply = require("./my-modules/dataSupply");

//dataAlim.startCronJobs()
//console.log('All cronJobs started');

dataAlim.startDevMode();
console.log('Dev mode started');


app.listen(3001, function() {
  console.log("listening on 8088");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


app.get("/devises", (req, res) => {

  dataSupply.getDevise(function (d) {
  	res.setHeader("Content-Type", "application/json");
  	res.send(JSON.stringify(d, null, 3));
  });
  
});

app.get("/providers", (req, res) => {

  dataSupply.getProvider(function (d) {
  	res.setHeader("Content-Type", "application/json");
  	res.send(JSON.stringify(d, null, 3));
  });
  
});

app.get("/intervals", (req, res) => {

  dataSupply.getInterval(function (d) {
  	res.setHeader("Content-Type", "application/json");
  	res.send(JSON.stringify(d, null, 3));
  });
  
});


app.get("/:provider/:devise/:interval", (req, res) => {
	let from = 0;
	let to = 0;

	if (req.query.from && req.query.to) {
		from = parseInt(req.query.from);
		to = parseInt(req.query.to);
	}

	let interval = parseInt(req.params.interval);
	let devise = req.params.devise.replace('-', '/');

	console.log("params -> "+JSON.stringify(req.params)+JSON.stringify(req.query));

  dataSupply.getPairsByTime(from, to, devise, interval, req.params.provider, function (d) {
  	res.setHeader("Content-Type", "application/json");
  	res.send(JSON.stringify(d, null, 3));
  });
  
});



app.get("/:provider/:devise/:interval/bound", (req, res) => {

	let interval = parseInt(req.params.interval);
	let devise = req.params.devise.replace('-', '/');

	dataSupply.getMinMax(devise, interval, req.params.provider, function (d) {
		res.setHeader("Content-Type", "application/json");
		res.send(JSON.stringify(d, null, 3));
	});
  
});


