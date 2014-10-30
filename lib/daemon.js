

var util = require('util');
var EventEmitter = require("events").EventEmitter;


var request = require("./rpc").request,
    helper = require("./util");

var config = require("../config.json");

function Coin(instance){

    this.name = instance.name;

    this.config = instance;
    this.symbol = instance.symbol;
    
    EventEmitter.call(this);
}

util.inherits(Coin, EventEmitter);

Coin.prototype.request = function(method, params, callback){

    if(typeof params === "function"){
        callback = params;
    }else if( !Array.isArray(params)){
        callback(helper.rpcerror("param must be Array"));
    }

    if(config.allows.indexOf(method) === -1){
        callback(helper.rpcerror("error method"));
    }

    request(this.config, [method, params], callback);
};

Coin.prototype.init = function(){

    var me = this;

    this.request("getinfo", function(err, data){
        if(!err){
            me.info = data.result;
        }
    });
};



exports.Coin = Coin;