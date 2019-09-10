<?php


define("MYKEY" , "AIzaSyAH_HD9thRAaWnix8G2OUY26Bw7ZuGBi30");

$yt_api_videos = "https://www.googleapis.com/youtube/v3/videos?";

$yt_api_videos = "https://www.googleapis.com/youtube/v3/videos?";

// se construye pedido segun Youtube API v3

$yt_req = $yt_api_videos;
$yt_req .= "part=snippet,contentDetails,status&";
$yt_req .= "chart=mostPopular&";
$yt_req .= "regionCode=AR&";
$yt_req .= "maxResults=10&";
$yt_req .= "key=" . MYKEY;

$data_json = file_get_contents($yt_req);

$data = json_decode($data_json)
?>
<pre>
<?php
	
    print_r($data); 
?>
</pre>;

