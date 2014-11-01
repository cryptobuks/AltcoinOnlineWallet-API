

//// cache all accounts

var redis = require("redis"),
    client = redis.createClient();


// prefix 

var prefix = "altonwallets_";


var accounts = {};


function get(callback){

    getValue("accounts", function(err, data){
        if(data) accounts = data;
        callback(accounts);
    });
}


// @param data  this is accounts

function add(coin, name){

    if( !accounts[coin] ){
        accounts[coin] = {};
    }

    accounts[coin][name] = {};
    setValue("accounts", accounts);
    global.eventcenter.emit("newaccount", name);
}


function set(coin, name, data){
    accounts[coin][name] = data;
    setValue("accounts", accounts);
    getValue("accounts", function(err, data){console.log(data)})

        global.eventcenter.emit("newaccount", name);
    }


function queryAll(){

    return accounts || {};
}



var redis = {};


redis.add = add;
redis.set = set;
redis.get = get;
redis.queryAll = queryAll;

module.exports = redis;



function getValue(key, callback){

    client.get(prefix+key, function(err, data){
        callback( err ? {} : JSON.parse(data));
    });
}

function setValue(key, value){

    client.set(prefix+key, JSON.stringify(value));
}
