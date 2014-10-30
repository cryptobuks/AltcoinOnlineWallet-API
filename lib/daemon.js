

var util = require('util');
var EventEmitter = require("events").EventEmitter;

var config = require("../config.json");


var request = require("./rpc").request,
    helper  = require("./util"),
    APILogger = require("./logger");


var logger = new APILogger({
        logLevel: config.logLevel,
        logColors: config.logColors
    });


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

    var name = this.name;

    request(this.config, [method, params], function(err, data){

        if(err){
            logger.error("wallet", name ,err.type, err.message);
        }

        callback(data || {});
    });
};

Coin.prototype.init = function(){

    var me = this;

    this.request("getinfo", function(data){
        me.info = data.result;
    });
};


exports.Coin = Coin;