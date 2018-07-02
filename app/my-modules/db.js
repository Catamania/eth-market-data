'use strict';

let mongoose = require('mongoose');

let port = process.env.DB_PORT || '27017';
let host = process.env.DB_HOST || 'db';
let mongo_pass = process.env.MONGO_PASSWORD || '';
let mongo_user = process.env.MONGO_USERNAME || '';
let mongo_db = process.env.MONGO_DATABASE || '';

let url = 'mongodb://' + mongo_user + ':' + mongo_pass + '@' + host + ':' + port + '/' + mongo_db;
//console.log ("user:"+mongo_user+" pwd:"+mongo_pass+" db:"+mongo_db+"\n"+url)

/**
 * Initialize the connection.
 * @method init
**/
mongoose.connect(url, {
    server: {
        autoReconnect: true,
        reconnectTries: 30,
        reconnectInterval: 1000
    }
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB to: " + url);
});



let pairSchema = require('./pair')(mongoose);

// find 
pairSchema.statics.findByTime = function (from, to, devise, interval, provider, cb) {
    return this.find({
            time: { 
                $gte: from, 
                $lte: to
            }, 
            devise: devise,
            interval: interval,
            provider: provider
        }).
    select({ data: 1 }).
    exec(cb);
};

// find availlable provider
pairSchema.statics.findProvider = function (cb) {
    return this.find().distinct('provider', cb);
};

// find availlable devises
pairSchema.statics.findDevises = function (cb) {
    return this.find().distinct('devise', cb);
};

// find availlable interval
pairSchema.statics.findInterval = function (cb) {
    return this.find().distinct('interval', cb);
};


let Pair = mongoose.model('Pair', pairSchema);

exports.Pair = Pair;

//db.pairs.find({devise:"XETHZEUR"})