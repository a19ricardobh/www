<?php
   //https://zetcode.com/php/json/
   $filename='pastelerias.json';
   $data=file_get_contents($filename);
   header('Content-Type: application/json');
   echo $data;
?>
