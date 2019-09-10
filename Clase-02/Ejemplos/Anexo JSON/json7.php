<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Consumir un JSON desde PHP</title>
</head>

<body>
<?php
/*
PHP puede interpretar datos provenientes de una cadena con notación JSON, de modo que se puedan guardar en variables y luego utilizarlas en los scripts del lado del servidor. 

Primero vamos a mostrar un objeto definido con JSON mediante Javascript, para hacer unas comprobaciones y saber si está bien construido. 
*/
?>
<script>
	var objJson = {
	   nombre: "Juan",
	   idCliente: 22,
	   observaciones: null,
	   producto: {
		  id: 5,
		  nombre: "smartphone LG"
	   }
	}
	alert(objJson.nombre)
	alert(objJson.producto.nombre)
</script>
<?php
/*
Ahora vamos a crear una variable PHP con la cadena para hacer este objeto y lo cargaremos en una variable PHP interpretando el JSON. Para ello PHP dispone de una función llamada json_decode() que recibe la cadena con notación JSON y devuelve un objeto, o cualquier otro tipo de variable, que estuviera representada en el JSON. 
*/
$str_obj_json = '{
   "nombre": "Juan",
   "idCliente": 22,
   "observaciones": null,
   "producto": {
      "id": 5,
      "nombre": "smartphone LG"
   }
}';
$obj_php = json_decode($str_obj_json);

/* Ahora podríamos mostrar el contenido de esa variable con la función de PHP print_r() */
print_r($obj_php);

//Podemos acceder a las propiedades de este objeto, de esta manera:

echo "Una propiedad cualquiera:" . $obj_php->nombre; 
?> 
</body>
</html>
