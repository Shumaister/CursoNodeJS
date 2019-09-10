var http=require('http');
var url=require('url');
var fs=require('fs');
var formidable=require('formidable');

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
		case 'public/subir': {
			subir(pedido,respuesta);
			break;
		}	
		case 'public/listadofotos': {
			listar(respuesta);
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


function subir(pedido,respuesta){

	//Creamos un objeto llamando al método IncomingForm
	var entrada=new formidable.IncomingForm();
	//Definimos el path donde se almacenará el archivo en el servidor (tenemos que tener una carpeta llamada upload en la carpeta public)
	entrada.uploadDir='upload';
	//Llamamos al método parse pasando 'pedido' donde se encuentran los datos del archivo adjunto para ser procesado
	entrada.parse(pedido);
	//El evento fileBeing se dispara cuando el archivo se está por grabar en el servidor, aquí definimos el path y nombre del archivo a grabar. Para nuestro problema lo grabamos en la carpeta upload que se encuentra en la carpeta public y el nombre de archivo utilizamos el nombre original que tiene en el cliente y lo podemos sacar del parámetro file
    entrada.on('fileBegin', function(field, file){
        file.path = "./public/upload/"+file.name;
    });	
    //El evento end se dispara cuando el archivo ya se almacenó en el servidor, aquí generamos dinámicamente una página HTML informando de tal situación al visitante
    entrada.on('end', function(){
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		respuesta.write('<!doctype html><html><head></head><body>'+
		                'Archivo subido<br><a href="index.html">Retornar</a></body></html>');		
		respuesta.end();
    });	
}

function listar(respuesta) {
	//Utilizamos el módulo 'fs' llamando a la función readdir que lee todos los archivos de un directorio y luego mediante una función anónima recibimos un error y un vector con todos los archivos de dicho directorio
	fs.readdir('./public/upload/',function (error,archivos){
		var fotos='';
		for(var x=0;x<archivos.length;x++) {
			//generamos una página dinámica con las etiquetas HTML 'img' que hacen referencia a todos los nombres de archivos almacenados en la carpeta upload
			fotos += '<img src="upload/'+archivos[x]+'"><br>';
		}
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		respuesta.write('<!doctype html><html><head></head><body>'+
						fotos+'<a href="index.html">Retornar</a></body></html>');		
		respuesta.end();	  
	});	
}


console.log('Servidor web iniciado');