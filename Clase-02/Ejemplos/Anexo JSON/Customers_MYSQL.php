<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "base_clientes");

$result = $conn->query("SELECT nombres, direccion, telefono, email FROM clientes");

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"Nombre":"'  . $rs["nombres"] . '",';
    $outp .= '"Direccion":"'   . $rs["direccion"]        . '",';
    $outp .= '"Telefono":"'   . $rs["telefono"]        . '",';
    $outp .= '"Email":"'. $rs["email"]     . '"}';
}
$outp .="]";

$conn->close();

echo($outp);
?>