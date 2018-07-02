module.exports = function(mongoose) {
    const pairSchema = mongoose.Schema({
    	provider: String,
        devise: String,
        interval: Number,
        time: Number,
        data: [Number, String, String, String, String, String, String, Number]
    });
    return pairSchema;
}
