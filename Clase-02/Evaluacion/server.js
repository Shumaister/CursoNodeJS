var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var mime = { 'html': 'text/html', 'css': 'text/css', 'jpg': 'image/jpg', 'ico': 'image/x-icon', 'mp3': 'audio/mpeg3', 'mp4': 'video/mp4' };

var servidor = http.createServer(function (pedido, respuesta) {
    var objetourl = url.parse(pedido.url);
    var camino = 'public' + objetourl.pathname;

    if (camino == 'public/')
        camino = 'public/index.html';
        
    encaminar(pedido, respuesta, camino);
});

servidor.listen(8888);


function encaminar(pedido, respuesta, camino) {
    console.log(camino);
	/*El parámetro camino puede tener alguno de estos dos valores:
	public/index.html
	public/recuperardatos

	Si el parámetro tiene el primer valor: 'public/index.html' luego se ejecuta el default del switch. Es decir retorna la página estática index.html como ya hemos visto.

	Si el parámetro 'camino' tiene el valor: 'public/recuperardatos' procede a llamar a la función recuperar y le pasa los dos objetos 'pedido' y 'respuesta'.
	*/
    switch (camino) {
        case 'public/enviarmail': {
            recuperar(pedido, respuesta);
            break;
        }
        default: {
            fs.exists(camino, function (existe) {
                
                console.log(camino);
                
                if (existe) {
                    fs.readFile(camino, function (error, contenido) {
                        if (error) {
                            respuesta.writeHead(500, { 'Content-Type': 'text/plain' });
                            respuesta.write('Error interno');
                            respuesta.end();
                        } else {
                            var vec = camino.split('.');
                            var extension = vec[vec.length - 1];
                            var mimearchivo = mime[extension];
                            respuesta.writeHead(200, { 'Content-Type': mimearchivo });
                            respuesta.write(contenido);
                            respuesta.end();
                        }
                    });
                } else {
                    respuesta.writeHead(404, { 'Content-Type': 'text/html' });
                    respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');
                    respuesta.end();
                }
            });
        }
    }
}

//la función recuperar  se encarga de recuperar los dos datos del formulario y generar un archivo HTML para retornarlo al navegador
function recuperar(pedido, respuesta) {
    var info = '';
    /*El objeto 'pedido' tiene un método llamado on. Debemos llamar este método dos veces, la primera pasando un string con el valor 'data' y una función anónima que se irá llamando a medida que lleguen los datos al servidor desde el navegador.
    A medida que llegan los datos se concatenan en la variable info. La variable info contiene entonces los datos con una estrauctura similar a nombre=juan&clave=123456 como estamos acostumbrados cuando trabajamos con PHP.
    Con el metodo parse del objeto querystring lo dejamos en un objeto literal con esta estructura:
    {
    	nombre:'juan',
    	clave:'123456'
  	} 
  	para poder acceder a cada componente
	*/
    pedido.on('data', function (datosparciales) {
        info += datosparciales;
    });
    pedido.on('end', function () {
        var formulario = querystring.parse(info);
        respuesta.writeHead(200, { 'Content-Type': 'text/html' });
        var pagina = '<!doctype html><html><head></head><body>' +
            'Nombre de usuario:' + formulario['nombre'] + '<br>' +
            'Clave:' + formulario['clave'] + '<br>' +
            '<a href="index.html">Retornar</a>' +
            '</body></html>';
        respuesta.end(pagina);
    });
}

console.log('Servidor web iniciado');