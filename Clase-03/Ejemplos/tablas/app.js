var express = require('express');
var app=express();
var bodyParser = require('body-parser');

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/public'));

//enlazamos el modulo body-parser con Express llamando al método use y pasando lo que devuelve la función urlencoded
//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

//Cuando presionamos el botón 'submit' de nuestro formulario la propiedad action tiene el valor action="mostrarnumeros", esto hace que nuestro programa capture dicha ruta con el siguiente código
app.post('/mostrarnumeros', function (req, res) {
	var num1=req.body.numero1;
	var num2=req.body.numero2;
	num1=parseInt(num1);
	num2=parseInt(num2);
	var pagina='<!doctype html><html><head></head><body>';
	for(var x=num1;x<=num2;x++)
	    pagina += '<a href="/mostrartabla?valor='+x+'">'+x+'</a>'+' - ';
	pagina += '</body></html>';
	res.send(pagina);	
})

//Cuando el usuario presiona el hipervínculo se captura el path del mismo con el siguiente codigo
app.get('/mostrartabla', function (req, res) {
	var num=req.query.valor;
	num=parseInt(num);
	var pagina='<!doctype html><html><head></head><body>';
	for(var x=1;x<=10;x++) {
		var tabla=num * x;
	    pagina += num + ' * ' + x + ' = ' + tabla + '<br>';
	}	
	pagina += '<a href="index.html">Retornar</a>';
	pagina += '</body></html>';
	res.send(pagina);	
})


var server=app.listen(8888,function(){
	console.log('Servidor web iniciado');
});