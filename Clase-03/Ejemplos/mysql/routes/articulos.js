var express = require('express');
var router = express.Router();

//incluimos el paquete bd con la conexion a la tabla sql
var bd=require('./bd');

//Creación de la tabla
//La ruta articulos/creartabla la capturamos mediante el método get del objeto routes y solo indicamos '/creartabla' ya que en el archivo app.js indicamos app.use('/articulos',articulos)
//Dentro del callback del método get llamamos al método query del objeto bd borramos la tabla articulos si ya existe y la creamos con tres campos.
//Luego pedimos que se muestre la plantilla 'mensajearticulos' y le pasamos como parámetro un objeto literal con un atributo llamado mensaje.
router.get('/creartabla', function(req, res, next) {
   bd.query('drop table if exists articulos',function (error,resultado){
        if (error) {
          console.log(error);                
          return;
        }
   });    
   bd.query('create table articulos ('+
                       'codigo int primary key auto_increment,'+
                       'descripcion varchar(50),'+
                       'precio float'+
                    ')', function (error,resultado){
        if (error) {            
          console.log(error);                
          return;
        }  
  });    
  res.render('mensajearticulos',{mensaje:'La tabla se creo correctamente.'});  
});


//Alta de registros
//Capturamos la ruta del alta y mostramos la plantilla correspondiente 
router.get('/alta', function(req, res, next) {
  res.render('altaarticulos');
});

//Cuando se presiona el botón submit procedemos a capturar dicha ruta donde procedemos a cargar los datos en la tabla de la base de datos
router.post('/alta', function(req, res, next) {
      var registro={
          descripcion:req.body.descripcion,
          precio:req.body.precio
        };
      bd.query('insert into articulos set ?',registro, function (error,resultado){
          if (error){
              console.log(error);
              return;
          }
      });    
  res.render('mensajearticulos',{mensaje:'La carga se efectuo correctamente'});
});


//Listado de registros
//Capturamos la ruta articulos/listado. Recuperamos los datos de la tabla sql y se los pasamos a la plantilla listararticulos.hbs
router.get('/listado', function(req, res, next) {
  bd.query('select codigo,descripcion,precio from articulos', function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        }    
        res.render('listararticulos',{articulos:filas});
  });
});


//Consulta
router.get('/consulta', function(req, res, next) {
  res.render('consultaarticulos');
});


router.post('/consulta', function(req, res, next) {
  bd.query('select descripcion,precio from articulos where codigo=?',req.body.codigo, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('listadoconsulta',{articulos:filas});
            } else {
                res.render('mensajearticulos',{mensaje:'No existe el codigo de articulo ingresado'});
            }    
        });
});


//Modificacion
router.get('/modificacion', function(req, res, next) {
  res.render('consultamodificacion');
});


router.post('/modificar', function(req, res, next) {
  bd.query('select descripcion,precio,codigo from articulos where codigo=?',req.body.codigo, function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                return;
            }
            if (filas.length>0) {
                res.render('formulariomodifica',{articulos:filas});
            } else {
                res.render('mensajearticulos',{mensaje:'No existe el codigo de articulo ingresado'});
            }    
        });
});


router.post('/confirmarmodifica', function(req, res, next) {
  var registro={
          descripcion:req.body.descripcion,
          precio:req.body.precio
      };    
  bd.query('UPDATE articulos SET ? WHERE ?',[registro,{codigo:req.body.codigo}], function(error,filas){
            if (error) {            
                console.log('error en la consulta');
                console.log(error);
                return;
            }
            res.render('mensajearticulos',{mensaje:'El articulo fue modificado'});
        });
});


module.exports = router;
