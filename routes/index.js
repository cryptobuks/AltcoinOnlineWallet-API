


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


var core = require("../lib/core");

router.get('/wallet', function(req, res) {
    res.json(core.getinfo("aki"));
});

router.post('/send', function(req, res) {


    var payload = req.body;

    payload.amount = parseFloat(payload.amount);

    if(!(payload.amount > 0)) return res.emsg("amount is error");

    core.validateaddress(payload.coin, payload.address, function(data){
        
        if(data.result.isvalid){

            core.sendfrom(payload.coin, "aki", payload.address, payload.amount, function(data){
                global.eventcenter.emit("update", payload.coin, "aki");
                res.smsg(data);
            });
        }else{
            res.emsg("address is invild");
        }
    });

    
});



module.exports = router;




