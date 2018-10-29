<?php
  error_reporting(E_ALL);
  ini_set('display_errors', '1');

  require_once '../vendor/autoload.php';

  $Email = $_GET["email"];
 
  MercadoPago\SDK::setAccessToken("APP_USR-1396909180508686-100619-3bcc4155ec271254474a2cf93ce42474-242652951");

  $preference = new MercadoPago\Preference();
  
  # Setting item      
  $item = new MercadoPago\Item();
  $item->title = "Plan ChangoFree Economico";
  $item->quantity = 1;
  $item->currency_id = "ARS";
  $item->unit_price = 350;

  # Setting payer
  $payer = new MercadoPago\Payer();
  $payer->email = $Email;
  
  
  # Setting preferences
  $preference->items = array($item);
  $preference->payer = $payer;
  $preference->external_reference = $Email;
  $preference->notification_url = "https://changofree.com/tienda/assets/php/notificationcf.php";

  # Save and posting preference
  $preference->save();
    
  # Getting url from MercadoPago
  echo $preference->init_point;
 ?>