


var Coin = require("./lib/daemon").Coin;

var config = require("./config.json");


var c = new Coin(config.daemons[0]);

c.init();

c.request("getnewaddress",[''], function(err, data, data1){

    console.log(data)
});

console.log(config.daemons[0]);