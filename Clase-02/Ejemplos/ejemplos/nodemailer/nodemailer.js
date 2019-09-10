var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

smtpTransport.sendMail({
   from: "Veronica Pineyro <veronicapineyro@gmail.com>", // sender address
   to: "Veronica <veropineyro@hotmail.com>", // comma separated list of receivers
   subject: "Hello ✔", // Subject line
   text: "Prueba de envio con nodejs. Hello world ✔" // plaintext body
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});