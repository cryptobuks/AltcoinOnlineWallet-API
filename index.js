var otplib = require('otplib');

var secret = otplib.google.secret(),
    qrcode = otplib.google.qrcode('aki@uuzcloud', 'service', secret);

var code = otplib.google.generate(secret);

console.log(secret)

