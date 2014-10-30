


var Coin = require("./lib/daemon").Coin;

var config = require("./config.json");


var c = new Coin(config.daemons[0]);

c.init();

c.request("getnewaddress",[''], function(data){

    console.log(data)
});

