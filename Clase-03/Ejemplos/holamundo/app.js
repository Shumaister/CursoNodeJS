var express=require('express');
var app=express();

app.get('/',function (req,res){
	res.send('<!doctype><html><head></head><body><h1>'+
	         'Mi primer pagina</h1></body></html>');
});

var server=app.listen(8888,function(){
	console.log('Servidor web iniciado');
});