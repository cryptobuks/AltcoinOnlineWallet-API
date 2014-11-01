


var async = require("async");



// init all wallets data, and cache it
// data contains:
//     transactions
//     accounts balance
//     accounts address
//     
// init daemon instance

var instances = [], accounts = ['aki'];
var config = require("../config.json"),
    coin = require("./daemon");

var daemons = config.daemons;

var storage = {};


async.each(accounts, function(account){

    storage[account] = {};

});

async.each(daemons, function(cf){

    var instance = new coin(cf);
    instance.init();
    instances.push(instance);

});

function getbalance(instance, account){

    instance.request("getbalance", [account], function(data){
        instance.accounts[account].balance = data && data.result;
    });
}

function listtransactions(instance, account){

    instance.request("listtransactions", [account], function(data){
        instance.accounts[account].transactions = data && data.result.reverse();
    });
}

function getaccountaddress(instance, account){

    instance.request("getaccountaddress", [account], function(data){
        instance.accounts[account].address = data && data.result;
    });
}



function intaccount(instance, account){
    instance.accounts[account] = {};
    
    refresh(instance, account);
    getaccountaddress(instance, account);

    storage[account][instance.name] = instance.accounts[account];

}

function refresh(instance, account){

    getbalance(instance, account);
    listtransactions(instance, account);
};



function update(){

    async.each(instances, function(instance){

        async.each(accounts, function(account){

            intaccount(instance, account);

        });

    });


}


require("./eventcenter");

// redis.add("bitmark","aki")

update();


setInterval(function(){

    update();

},30000);
// listtransactions(instances[0], "");


module.exports = function(name){
    
    return storage[name];
};






