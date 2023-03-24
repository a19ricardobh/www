<?php
// Array con provincias
$provincias = array('Álava', 'Albacete', 'Alicante', 'Almería', 'Ávila', 'Badajoz', 'Illes Balears', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Castellón', 'Ciudad Real', 'Córdoba', 'A Coruña', 'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'León', 'Lleida', 'La Rioja', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Ourense', 'Asturias', 'Palencia', 'Las Palmas', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Cantabria', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza', 'Ceuta', 'Melilla');

// Recoge el parametro id
$id = $_REQUEST["id"];
$coincidencias = "";

// Busca todos los valores del array si $id es diferente de ""
if ($id !== "") {
  $id = strtolower($id);
  $longitud=strlen($id);
  foreach($provincias as $nombre) {
    if (stristr($id, substr($nombre, 0, $longitud))) {
      if ($coincidencias === "") {
        $coincidencias = $nombre;
      } else {
        $coincidencias .= ", $nombre";
      }
    }
  }
}

echo $coincidencias === "" ? "No puedo proporcionar ninguna sugerencia" : $coincidencias;
?> 