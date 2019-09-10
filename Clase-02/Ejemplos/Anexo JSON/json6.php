<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Documento sin t&iacute;tulo</title>
</head>

<body>
<?php
/*Para crear una cadena para expresar un objeto u otro tipo de variable con JSON en PHP se dispone de una función llamada json_encode(), que recibe lo que deseamos convertir en notación JSON y devuelve una cadena de texto con el JSON producido.

Podemos convertir en JSON cualquier cosa que necesitemos, como una cadena, una variable numérica, un array -normal o asociativo- y objetos con todo tipo de datos dentro.  

Algunos ejemplos:
*/

$mivariable = "hola";
print_r(json_encode($mivariable)); 

$miArray = array(1,4,6,8,3,34.8,9,43);
print_r(json_encode($miArray)); 

$miArray = array("manzana"=>"verde", "uva"=>"Morada", "fresa"=>"roja");
print_r(json_encode($miArray));

/* Podríamos utilizar esa cadena para crear una variable Javascript y por supuesto podremos acceder a cualquier valor del JSON
*/

?>
<script>
var obj = '<?php echo json_encode($miArray);?>';
JSONFrutas = JSON.parse(obj);
alert(JSONFrutas.manzana);
</script>
</body>
</html>
