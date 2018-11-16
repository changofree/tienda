<?php
  error_reporting(E_ALL);
  ini_set('display_errors', '1');

  require_once '../vendor/autoload.php';

  $NumeroPedido = $_GET["pedido"];
  $Precio = $_GET["precio"];
  $Token = $_GET["access_token"];
  $Email = $_GET["email"];
  $Tel = $_GET["tel"];
  $Nombre = $_GET["nombre"];
  $DNI = $_GET["dni"];
  $Envio = $_GET["envio"];

  MercadoPago\SDK::setAccessToken($Token);

  $preference = new MercadoPago\Preference();
  
  # Setting item      
  $item = new MercadoPago\Item();
  $item->title = "Tienda ChangoFree - ".$NumeroPedido;
  $item->quantity = 1;
  $item->currency_id = "ARS";
  $item->unit_price = $Precio;

  # Setting payer
  $payer = new MercadoPago\Payer();
  $payer->email = $Email;
  $payer->name = $Nombre;
  $payer->identification = array(
      "type" => "DNI",
    "number" => $DNI
  );
  $payer->phone = array(
      "area_code" => "",
    "number" => $Tel
  );

  if(isset($Envio)){

  #Shipments data 
  $shipments = new MercadoPago\Shipments();
  $shipments->mode = "me2";
  $shipments->dimensions = "40x40x40,5000";
  $shipments->local_pickup = false;
  $preference->shipments = $shipments;

  }
    
  # Setting preferences
  $preference->items = array($item);
  $preference->payer = $payer;
  $preference->marketplace_fee = 0.50;
  // $preference->external_reference = $_GET["key"]."|".$NumeroPedido;
  echo json_encode($item);
  $preference->notification_url = "https://changofree.com/tienda/assets/php/notification.php";

  echo json_encode($shipments);
  # Save and posting preference
  $preference->save();
    
  # Getting url from MercadoPago
  // echo "no nada";
  echo $preference->init_point;
  ?>