'use strict';

var mongoose = require('mongoose');

var port = process.env.DB_PORT || '27017';
var host = process.env.DB_HOST || 'db';
var mongo_pass = process.env.MONGO_PASSWORD || '';
var mongo_user = process.env.MONGO_USERNAME || '';
var mongo_db = process.env.MONGO_DATABASE || '';

var url = 'mongodb://' + mongo_user + ':' + mongo_pass + '@' + host + ':' + port + '/' + mongo_db;
console.log ("user:"+mongo_user+" pwd:"+mongo_pass+" db:"+mongo_db+"\n"+url)
/**
 * Initialize the connection.
 * @method init
**/
mongoose.connect(url, {
    //useMongoClient: true,
    server: {
        autoReconnect: true,
        reconnectTries: 30,
        reconnectInterval: 1000
    }
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB to: " + url);
});

var pairSchema = require('./pair')(mongoose);

// find 
pairSchema.statics.findByDevInt = function (dev, inter, cb) {
    return this.find({
        devise: dev,
        interval: inter
    }, cb);
};

var Pair = mongoose.model('Pair', pairSchema);

exports.Pair = Pair;

//db.pairs.find({devise:"XETHZEUR"})