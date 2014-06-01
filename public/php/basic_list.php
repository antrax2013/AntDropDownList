<?php

include_once 'item.php';

// Prevent caching.
//header('Cache-Control: no-cache, must-revalidate');
//header('Expires: Mon, 01 Jan 1996 00:00:00 GMT');

// The JSON standard MIME header.
header('Content-type: application/json; charset=utf-8');

$countries['d'] = Array();

array_push ($countries['d'], new item(0, 'France'),new item(1, 'Allemagne'), new item(2, 'Bresil'), new item(3, 'Espagne'));

echo json_encode($countries);

//echo "{'d':[{'Value':0,'Text':'France','Selected':false},{'Value':1,'Text':'Allemagne','Selected':false},{'Value':2,'Text':'Bresil','Selected':false},{'Value':3,'Text':'Espagne','Selected':false}]}";
?>