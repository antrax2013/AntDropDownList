<?php
include 'item.php';
require 'jsonwrapper/jsonwrapper.php';

// The JSON standard MIME header.
header('Content-type: application/json; charset=utf-8');

$array['d'] = Array();
$execpt = "";

if(stripos($_SERVER["CONTENT_TYPE"], "application/json") === 0) {
    $_POST["execpt"] = json_decode(file_get_contents("php://input"))->execpt;
}

if(isset($_POST['execpt'])) $execpt = $_POST['execpt'];


if($execpt != 'Flash') array_push ($array['d'], new item(1, 'Flash'));
if($execpt != 'Matter') array_push ($array['d'], new item(2, 'Matter'));
if($execpt != 'Dusty') array_push ($array['d'], new item(3, 'Dusty'));
if($execpt != 'Sargent') array_push ($array['d'], new item(4, 'Sargent'));

echo json_encode($array);
?>