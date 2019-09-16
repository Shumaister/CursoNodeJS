var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var nodemailer = require("nodemailer");

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
    switch (camino) {
        case 'public/enviarmail': {
            console.log("Entro al enviar mail");
            enviarMail(pedido, respuesta);
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
function enviarMail(pedido, respuesta) {
    var info = '';
    pedido.on('data', function (datosparciales) {
        info += datosparciales;
    });

    pedido.on('end', function () {
        var formulario = querystring.parse(info);

        console.log("Entramo a mandar mail.");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gabrielmaiori@gmail.com',
                pass: '**'
            }
        });

        const mailOptions = {
            from: formulario['mailOrigen'], 
            to: 'gabrielmaiori@gmail.com', 
            subject: formulario['asunto'], 
            html: formulario['cuerpoMail'] 
        };
        var pagina ='';

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
            {
                respuesta.writeHead(502, { 'Content-Type': 'text/html' });
                console.log(err);
            }
            else
            {
                console.log(info);

                respuesta.writeHead(200, { 'Content-Type': 'text/html' });
                pagina = '<!doctype html><html><head></head><body>' +
                '<h3>Se enviado con exito su mensaje!! Gracias por su contacto!</h3>' +
                '<a href="index.html">Volver</a>' +
                '</body></html>';
            }
            respuesta.end(pagina);
        });
    });
}

console.log('Servidor web iniciado');