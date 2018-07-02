/*
config globale
*/

//const DEVISES = 'XETHZEUR';
const DEVISES = ['BTC/USD', 'ETH/EUR'];
const INTERVALS = [
		{int: 30, cronstr: "0 */30 * * * *"}, 
		{int: 60, cronstr: "0 0 */1 * * *"}, 
		{int: 120, cronstr: "0 0 */2 * * *"}
	];

module.exports.DEVISES = DEVISES;
module.exports.INTERVALS = INTERVALS;