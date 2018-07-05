// map function
let map = function(){
  emit(1, // Or put a GROUP BY key here
        {
          min: this.time,
          max: this.time
        }
    );
}

// reduce function
let reduce = function(key, values){
  let a = values[0]; // will reduce into here
    for (let i=1/*!*/; i < values.length; i++){
        let b = values[i]; // will merge 'b' into 'a'

        a.min = Math.min(a.min, b.min);
        a.max = Math.max(a.max, b.max);
    }

    return a;
}

let command = function (devise, interval, provider) {
  // condition
  let query = { 
    'devise': devise,
    'interval': interval,
    'provider': provider
  };

  // map-reduce command
  return {
    mapreduce: "pairs", // the name of the collection we are map-reducing
    map: map.toString(), // a function for mapping
    reduce: reduce.toString(), // a function  for reducing
    query: query, // filter conditions
    out: {inline: 1}  // doesn't create a new collection, includes the result in the output obtained
  };
}

//module.exports.map = map;
//module.exports.reduce = reduce;
module.exports.command = command;