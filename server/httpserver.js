


var http = require("http"), fs = require("fs"), url = require("url");

var getinfo = require("../lib/core");


http.createServer(function (req, res) {

    var u = url.parse(req.url);


    if(u.pathname.lastIndexOf('.html') > -1){
        return html(u.pathname, res);
    }

    if(u.pathname.lastIndexOf('.css') > -1){
        return css(u.pathname, res);
    }

    if(u.pathname.lastIndexOf('.js') > -1){
        return js(u.pathname, res);
    }

    if(u.pathname.lastIndexOf('.swf') > -1){
        return swf(u.pathname, res);
    }


    res.writeHead(200, {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
    res.end(JSON.stringify(getinfo("aki")));

}).listen(1337, '127.0.0.1');



function html(uri, res){

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync("../website/html"+uri).toString());
}

function css(uri, res){

    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(fs.readFileSync("../website/assets"+uri).toString());
}

function js(uri, res){

    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(fs.readFileSync("../website/assets"+uri).toString());
}

function swf(uri, res){
    res.writeHead(200, {'Content-Type': 'application/x-shockwave-flash'});
    res.end(fs.readFileSync("../website/assets"+uri).toString());
}


















