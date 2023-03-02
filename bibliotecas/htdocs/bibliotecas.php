<?php
if (file_exists('bibliotecas.xml')) {
    $xml = file_get_contents('bibliotecas.xml');
    header('Content-type: text/xml; charset=utf-8');
    echo $xml;
} else {
    exit('Error abriendo bibliotecas.xml.');
}
?>
