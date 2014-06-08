<?php
include 'item.php';
require 'jsonwrapper/jsonwrapper.php';

// The JSON standard MIME header.
header('Content-type: application/json; charset=utf-8');

$document_xml = simplexml_load_file("info.xml");
$cities['d'] = Array();

if(stripos($_SERVER["CONTENT_TYPE"], "application/json") === 0) {
	$_POST["parent"] = json_decode(file_get_contents("php://input"))->parent;
	
	//print_r($_POST["parent"]);
}

$id_pays =  (!isset($_POST['parent'])? 1 : $_POST['parent']);


foreach($document_xml->children() as $p) {
	if((int)$p->id_pays == (int)$id_pays) {		
		foreach($p->villes->ville as $v) {
			$item = new item((string)$v->id_ville, (string)$v->nom_ville);
			array_push ($cities['d'], $item);
		}
		break;
	}
}

echo json_encode($cities);
?>