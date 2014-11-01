

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

    var name = this.name;

    if(typeof params === "function"){
        
        callback = params;

    }else if( !Array.isArray(params)){
        logger.warning("wallet", name , "error", "params must be Array");
        return callback(0);
    }

    if(config.allows.indexOf(method) === -1){
        logger.warning("wallet", name , "error", "method is not allow");
        return callback(0);
    }


    request(this.config, [method, params], function(err, data){

        if(err){
            logger.error("wallet", name ,err.type, err.message);
        }

        callback(data || 0);
    });
};

Coin.prototype.init = function(){

    var me = this;

    me.accounts = {};

    this.request("getinfo", function(data){
        me.info = data.result;
    });
};











module.exports = Coin;