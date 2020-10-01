<?php
    require_once("../models/modelo.php");
    $services = new Service();
    $datos = $services->getServicios();
    require_once("../views/vista.php");
?>