


var util = require('util');
var EventEmitter = require("events").EventEmitter;


function event(){
    EventEmitter.call(this);
}

util.inherits(event, EventEmitter);


var eventcenter = new event();


global.eventcenter = eventcenter;



