//requerimos todos los modulo que usara la aplicacion mediante el metodo require
var http=require('http');
var url=require('url');
var fs=require('fs');
var querystring = require('querystring');

var mysql=require('mysql');

//Mediante la variable mysql llamamos a la función createConnection y le pasamos un objeto literal inicializando las propiedades 'host','user','password' y 'database'.
var conexion=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'basenode'
});

//Con la referencia a la conexión llamamos a connect para abrir la conexión con el servidor de base de datos (si hay algún error la función anónima traerá una referencia de dicho error)
conexion.connect(function (error){
	if (error)
		console.log('Problemas de conexion con mysql');
});


var mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

var servidor=http.createServer(function(pedido,respuesta){
    var objetourl = url.parse(pedido.url);
	var camino='public'+objetourl.pathname;
	if (camino=='public/')
		camino='public/index.html';
	encaminar(pedido,respuesta,camino);
});

servidor.listen(8888);


function encaminar (pedido,respuesta,camino) {
	
	switch (camino) {
		case 'public/creartabla': {
			crear(respuesta);
			break;
		}	
		case 'public/alta': {
			alta(pedido,respuesta);
			break;
		}			
		case 'public/listado': {
			listado(respuesta);
			break;
		}
		case 'public/consultaporcodigo': {
			consulta(pedido,respuesta);
			break;
		}							
	    default : {  
			fs.exists(camino,function(existe){
				if (existe) {
					fs.readFile(camino,function(error,contenido){
						if (error) {
							respuesta.writeHead(500, {'Content-Type': 'text/plain'});
							respuesta.write('Error interno');
							respuesta.end();					
						} else {
							var vec = camino.split('.');
							var extension=vec[vec.length-1];
							var mimearchivo=mime[extension];
							respuesta.writeHead(200, {'Content-Type': mimearchivo});
							respuesta.write(contenido);
							respuesta.end();
						}
					});
				} else {
					respuesta.writeHead(404, {'Content-Type': 'text/html'});
					respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
					respuesta.end();
				}
			});	
		}
	}	
}


function crear(respuesta) {
	//llamamos a la función query del objeto conexion que creamos previamente para hacer drop y create de la tabla.
	//Siempre que llamamos a query debemos pasarle además del string con el comando SQL un segundo parámetro que se trata de una función anónima que nos retorna un eventual error y los resultados que genera el comando SQL ejecutado.
	conexion.query('drop table if exists articulos',function (error,resultado){
		if (error)
		  console.log(error);				
	});	
	conexion.query('create table articulos ('+
	                   'codigo int primary key auto_increment,'+
					   'descripcion varchar(50),'+
					   'precio float'+
					')', function (error,resultado){
		if (error) {
		  console.log(error);				
		  return;
		}  
	});
	respuesta.writeHead(200, {'Content-Type': 'text/html'});
	respuesta.write('<!doctype html><html><head></head><body>'+
	                'Se creo la tabla<br><a href="index.html">Retornar</a></body></html>');		
	respuesta.end();	
}


//es llamada al presionar el boton de submit en el formulario de alta
function alta(pedido,respuesta) {
	//Rescata todos los datos del formulario y a llama a la función query de la variable conexion pasando el string con el comando SQL. El segundo parámetro de la función es un objeto literal donde inicializamos todos los campos de la tabla (menos el código de artículo que se genera automáticamente).
	var info='';
    pedido.on('data', function(datosparciales){
         info += datosparciales;
    });
    pedido.on('end', function(){
        var formulario = querystring.parse(info);
	  var registro={
		  descripcion:formulario['descripcion'],
		  precio:formulario['precio']
  	  };
  	  //Si bien en SQL no existe la palabra clave set tengamos en cuenta que la función query procederá a generar un comando insert válido.
  	  conexion.query('insert into articulos set ?',registro, function (error,resultado){
		  if (error) {
		  	  console.log(error);
			  return;
		  }	  
	  });		
      respuesta.writeHead(200, {'Content-Type': 'text/html'});
	  respuesta.write('<!doctype html><html><head></head><body>'+
	                'Se cargo el articulo<br><a href="index.html">Retornar</a></body></html>');		
	  respuesta.end();
    });  	
}


function listado(respuesta) {
	//utilizamos el metodo query para obtener todos los datos de la tabla y mostrarlos en pantalla
	conexion.query('select codigo,descripcion,precio from articulos', function(error,filas){
		if (error) {			
			console.log('error en el listado');
			return;
		}
        respuesta.writeHead(200, {'Content-Type': 'text/html'});
		var datos='';
		for(var f=0;f<filas.length;f++){
			datos+='Codigo:'+filas[f].codigo+'<br>';
			datos+='Descripcion:'+filas[f].descripcion+'<br>';
			datos+='Precio:'+filas[f].precio+'<hr>';
		}
		respuesta.write('<!doctype html><html><head></head><body>');
	    respuesta.write(datos);	
		respuesta.write('<a href="index.html">Retornar</a>');
		respuesta.write('</body></html>');
	    respuesta.end();		
	});
}


function consulta(pedido,respuesta) {
	//rescatamos los valores del formulario y procedemos a llamar al comando SQL select con la clausula where indicando el código tomado del formulario HTML
	var info='';
    pedido.on('data', function(datosparciales){
         info += datosparciales;
    });
    pedido.on('end', function(){
        var formulario = querystring.parse(info);
		var dato=[formulario['codigo']];
		conexion.query('select descripcion,precio from articulos where codigo=?',dato, function(error,filas){
			if (error) {			
				console.log('error en la consulta');
				return;
			}
			respuesta.writeHead(200, {'Content-Type': 'text/html'});
			var datos='';
			if (filas.length>0) {
				datos+='Descripcion:'+filas[0].descripcion+'<br>';
				datos+='Precio:'+filas[0].precio+'<hr>';
			} else {
				datos='No existe un artículo con dicho codigo.';
			}	
			respuesta.write('<!doctype html><html><head></head><body>');
			respuesta.write(datos);	
		    respuesta.write('<a href="index.html">Retornar</a>');			
			respuesta.write('</body></html>');
			respuesta.end();		
		});
	  
    });  	
	
}

console.log('Servidor web iniciado');