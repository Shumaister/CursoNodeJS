var http=require('http');
var url=require('url');
var fs=require('fs');

var mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

//definimos un objeto vacío donde almacenaremos los nombres de los recursos y los contenidos de los mismos
var cache={};

var servidor=http.createServer(function(pedido,respuesta){
    var objetourl = url.parse(pedido.url);
	var camino='static'+objetourl.pathname;
	if (camino=='static/')
		camino='static/index.html';
	//Cuando se dispara un pedido de recurso y se ejecuta la función anónima que le pasamos al método createServer procedemos mediante un if a verificar si el objeto cache almacena una propiedad que coincide con la ruta del recurso
	//si el contenido está almacenado en la cache cuando escribimos dentro de la respuesta el dato a devolver procedemos a extraerlo del objeto 'cache' y accedemos a la propiedad que coincide con el recurso pedido.
	//sino se ejecuta el otro bloque donde verificamos que el recurso exista y procedemos a su lectura del disco y lo guardamos en el objeto cache para la siguiente lectura
	if (cache[camino]) {
		var vec = camino.split('.');
		var extension=vec[vec.length-1];
		var mimearchivo=mime[extension];
		respuesta.writeHead(200, {'Content-Type': mimearchivo});

		respuesta.write(cache[camino]);
		respuesta.end();
		console.log('Recurso recuperado del cache:'+camino);       		
	} else {
		fs.exists(camino,function(existe){
			if (existe) {
				fs.readFile(camino,function(error,contenido){
					if (error) {
						respuesta.writeHead(500, {'Content-Type': 'text/plain'});
						respuesta.write('Error interno');
						respuesta.end();					
					} else {
						cache[camino]=contenido;
						var vec = camino.split('.');
						var extension=vec[vec.length-1];
						var mimearchivo=mime[extension];
						respuesta.writeHead(200, {'Content-Type': mimearchivo});
						respuesta.write(contenido);
						respuesta.end();
						console.log('Recurso leido del disco:'+camino);
					}
				});
			} else {
				respuesta.writeHead(404, {'Content-Type': 'text/html'});
				respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
				respuesta.end();
			}
		});
	}
});

servidor.listen(8888);

console.log('Servidor web iniciado');