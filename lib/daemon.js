

var util = require('util');
var EventEmitter = require("events").EventEmitter;


var request = require("./rpc").request,
    helper = require("./util");

var config = require("config.json");

function Coin(options){

    this.name = instance.name;

    this.config = instance;
    this.symbol = instance.symbol;
    
    EventEmitter.call(this);
}

util.inherits(Coin, EventEmitter);



Coin.prototype.request = function(method, params, callback){}{

    if(typeof params === "function") callback = params;

    if(config.indexOf(method) === -1){
        callback(helper.rpcerror("error method"));
    }

    if(!Array.isArray(params)){
        callback(helper.rpcerror("param must be Array"));
    }

    request(this.config, [method, params], callback);
};

