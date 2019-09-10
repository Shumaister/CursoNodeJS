<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Evaluacion uni 2 mod 2 - Youtube - mas populares </title>
<link href="styles.css" rel="stylesheet" type="text/css" />
</head>
<body>
<?php

function prehtml($str)
{
    return htmlspecialchars($str);

}

//
//
// Credential obtenida de manera gratuita segun https://developers.google.com/youtube/registering_an_application
//
//

define("MYKEY" , "AIzaSyAH_HD9thRAaWnix8G2OUY26Bw7ZuGBi30");

// url base para videos

$yt_view_url = "https://www.youtube.com/watch?v=";

// url base 

$yt_api_videos = "https://www.googleapis.com/youtube/v3/videos?";

// se construye pedido segun Youtube API v3

$yt_req = $yt_api_videos;
$yt_req .= "part=snippet,contentDetails,status&";
$yt_req .= "chart=mostPopular&";
$yt_req .= "regionCode=AR&";
$yt_req .= "maxResults=10&";
$yt_req .= "key=" . MYKEY;

//
// se hace consulta 
// IMPORTANTE: el servidor debe tener instalado el modulo openssl y activado allow_url_fopen en php.ini
//
$data_json = file_get_contents($yt_req);

// se decodifica json
$data = json_decode($data_json);


// etc....

date_default_timezone_set("America/Argentina/Buenos_Aires");

echo <<<TABLEhdr
<div align="center"><h1>YOUTUBE videos mas populares ahora</h1></div>
<div align="center">
<table width="920px" border="1" cellpadding="5">
<tr><td width="22%"><b>Fecha</b></td>
<td><b>Descripcion</b></td>
<td><b>Vista</b></td>
<td> &nbsp </td>
<td> Video </td>
TABLEhdr;

foreach ($data->items as $item){ 
    $snippet = $item->snippet;
    $itemFecha = date( "Y-m-d H:m", strtotime($snippet->publishedAt));
    $itemTitle = "<h3>" . prehtml($snippet->title) . "</h3>" . prehtml($snippet->description);
    $itemLink = $yt_view_url . $item->id;
    $itemThumbnail = '<img src="' . $snippet->thumbnails->medium->url . '">';
	$itemIframe = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'.$item->id.'" frameborder="0" allowfullscreen></iframe>';
  
echo <<<ITEM
<tr>
<td> $itemFecha </td>
<td> $itemTitle </td>
<td> <a href="$itemLink"> $itemThumbnail </a></td>
<td> <a href="$itemLink"> Link </a> </td>
<td> $itemIframe </td>
</tr>
ITEM;
    
    
}

echo "</table>";
echo '</div>';
echo "<p>";
echo "<hr>";
echo "<p>";

?>
	        				                        
</body>
</html>