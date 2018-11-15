<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once '../vendor/autoload.php';
/*************************************/

    $topic = null;
    $id = null;
    $keyClient = null;


    # Validate the request

    if(!isset($_GET["topic"]) && !isset($_GET["id"])){
        http_response_code(400);
        return;
    }
    if($_GET["topic"] == "merchant_order"){
        http_response_code(400);
        return;
    }
    if(!isset($_GET["topic"])){
        $topic = $_POST["topic"];    
    }else{
        $topic = $_GET["topic"];
    }
    if(!isset($_GET["id"])){
        $id= $_POST["id"];    
    }else{
        $id = $_GET["id"];
    }
    
    
    
    # Setting my access token to get the pedido
    
    MercadoPago\SDK::setAccessToken("APP_USR-1396909180508686-100619-3bcc4155ec271254474a2cf93ce42474-242652951");
    $payment = MercadoPago\Payment::find_by_id($id);
    echo $payment->external_reference;
    

    # Getting a access token of the seller
    $ExternalInfo = explode("|", $payment->external_reference);
    $urlF = "https://changofreex.firebaseio.com/cliente/".$ExternalInfo[0]."/mercadopago.json";
    $cht = curl_init();
    curl_setopt($cht, CURLOPT_URL, $urlF);
    curl_setopt($cht, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($cht);
    curl_close($cht);
    $info = json_decode($response, true);
    foreach ($info as $key => $value) {
        $keyClient = $info["access_token"];
    }


    # Data to send by post to generate.php
    
    $datos = array(
        'access_token' => $keyClient ,
        'keyFB' => $payment->external_reference,
        'idpedido' => $id,
        'DNI' => $payment->card->cardholder->identification->number,
        'nombres' => $payment->card->cardholder->name
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://changofree.com/tienda/assets/php/generate.php");
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($datos));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);
    curl_close ($ch);
?>

