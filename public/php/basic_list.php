<?php
include 'item.php';
require 'jsonwrapper/jsonwrapper.php';

// The JSON standard MIME header.
header('Content-type: application/json; charset=utf-8');

$countries['d'] = Array();

array_push ($countries['d'], new item(1, 'France'),new item(2, 'Espagne'), new item(3, 'Belgique'));

echo json_encode($countries);
?>