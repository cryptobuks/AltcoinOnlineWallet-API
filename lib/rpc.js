


// daemon rpc call

var http = require("http");


function performHttpRequest(instance, jsonData, callback){

    var jsonData = serializedRequest(jsonData);

    var options = {
        hostname: (typeof(instance.host) === 'undefined' ? '127.0.0.1' : instance.host),
        port    : instance.port,
        method  : 'POST',
        auth    : instance.user + ':' + instance.password,
        headers : {
            'Content-Length': jsonData.length
        }
    };

    var parseJson = function(res, data){
        var dataJson;

        if (res.statusCode === 401){
            console.log('error', 'Unauthorized RPC access - invalid RPC username or password');
            return;
        }

        try{
            dataJson = JSON.parse(data);
        }
        catch(e){
            if (data.indexOf(':-nan') !== -1){
                data = data.replace(/:-nan,/g, ":0");
                parseJson(res, data);
                return;
            }
            console.log('error', 'Could not parse rpc data from daemon instance  ' + instance.index
                + '\nRequest Data: ' + jsonData
                + '\nReponse Data: ' + data);

        }
        if (dataJson)
            callback(dataJson.error, dataJson[0], data);
    };

    var req = http.request(options, function(res) {
        var data = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function(){
            parseJson(res, data);
        });
    });

    req.on('error', function(e) {
        if (e.code === 'ECONNREFUSED')
            callback({type: 'offline', message: e.message}, null);
        else
            callback({type: 'request error', message: e.message}, null);
    });

    req.end(jsonData);
};


function serializedRequest(cmdArray){

    var requestJson = [];

    requestJson.push({
        method: cmdArray[0],
        params: cmdArray[1],
        id: Date.now() + Math.floor(Math.random() * 10) 
    });

    return JSON.stringify(requestJson);

}

exports.request = performHttpRequest;