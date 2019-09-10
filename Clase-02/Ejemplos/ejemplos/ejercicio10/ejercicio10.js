//Requerimos los tres modulos http, url, fs
var http=require('http');
var url=require('url');
var fs=require('fs');

//creamos el servidor de peticiones http
var servidor=http.createServer(function(pedido,respuesta){
	//llamamos al método parse del objeto 'url' y le pasamos como parámetro la propiedad url del objeto pedido que llega a la función
    var objetourl = url.parse(pedido.url);
    //Obtenemos las distintas partes de la url en un objeto literal para facilitar extraer solo la ruta y nombre del archivo HTML.
	//Inicializamos una variable con el nombre de la subcarpeta que contiene los archivos HTML y le concatenamos la ruta y nombre del archivo HTML solicitado
    var camino='static'+objetourl.pathname;
    //Si la ruta es localhost:8888 servimos el index
    if (camino=='static/')
        camino='static/index.html';
    //sino verificamos la existencia del archivo solicitado a traves de fs.exists. El primer parametro de exists es la ruta a verificar y el segundo una funcion anonima que devuelve true or false dependiendo si el archivo existe o no. Si existe lo leemos y devolvemos su contenido sino mostramos pagina de error 404.
    fs.exists(camino,function(existe){
        if (existe) {
            fs.readFile(camino,function(error,contenido){
                if (error) {
                	//error interno en la lectura del archivo, el archivo existe pero hubo algun error interno en la lectura del mismo
                    respuesta.writeHead(500, {'Content-Type': 'text/plain'});
                    respuesta.write('Error interno');
                    respuesta.end();                    
                } else {
                    respuesta.writeHead(200, {'Content-Type': 'text/html'});
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
});

servidor.listen(8888);

console.log('Servidor web iniciado');