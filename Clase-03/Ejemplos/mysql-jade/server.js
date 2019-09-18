var express = require('express');
var mysql = require('mysql');
 
var app = express();
 
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});


var client = mysql.createClient({
  host: 'localhost',
  user: 'root',
  password: '',
});

client.database = 'basenode';

app.get('/', function(req, res) {
	
	client.query('SELECT id, nombre, ciudad FROM universidades',
			function selectCb(err, results, fields) {
				if (err) {
					throw err;					
				}

				res.render('index.jade', { universidades: results });
			}
		);
});


app.post('/nueva', function(req, res) {

	client.query('INSERT INTO universidades (nombre, ciudad) VALUES (?, ?)', [req.body.nombre, req.body.ciudad],
			function() {
				res.redirect('/');
			}
		);
});


app.get('/editar/:id', function(req, res) {
	client.query('SELECT id, nombre, ciudad FROM universidades WHERE id = ?', [req.params.id],
			function selectCb(err, results, fields) {
				if (err) {
					throw err;					
				}
				
				res.render('editar.jade', { universidad: results[0] });
			}
		);
});

app.post('/actualizar', function(req, res) {
	client.query('UPDATE universidades SET nombre = ?, ciudad = ? WHERE id = ?', [req.body.nombre, req.body.ciudad, req.body.id],
			function() {			
				res.redirect('/');
			}
		);
});

app.get('/borrar/:id', function(req, res) {
	client.query('DELETE FROM universidades WHERE id = ?', [req.params.id],
		function() {
			res.redirect('/');
		}
	);
});


app.listen(3333,function(){
	console.log("App Started on PORT 3333");
});

