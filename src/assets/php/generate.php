<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once '../vendor/autoload.php';
/*************************************/


    $ExternalInfo = explode("|", $_POST["keyFB"]);

    # Getting data from the id sell
    
    MercadoPago\SDK::setAccessToken($_POST["access_token"]);
    $payment = MercadoPago\Payment::find_by_id($_POST["idpedido"]);

    
    # If the pay is concreted
    
    if($payment->status == 'approved'){
        if($payment->transaction_details->total_paid_amount >= $payment->transaction_amount){
            $estado = "Acreditado";
        }else{
            $estado = "Pago no acreditado";
        }
    }else{
        $estado = "Pago pendiente";
    }


    # Information for send to FireBase
    
    $data = '{"estado":"'.$estado.'",
            "idpedido":"'.$_POST["idpedido"].'",
            "email":"'.$payment->payer->email.'",
            "fechacreacion":"'.$payment->date_created.'",
            "telefono":"'.$payment->payer->phone->number.'",
            "DNI":"'.$payment->card->cardholder->identification->number.'",
            "nombres":"'.$payment->card->cardholder->name.'",
            "product":"'.$ExternalInfo[1].'",
            "total":"'.$payment->transaction_amount.'",
            "status": 1 }';


    # Url firebase
    
    $url = "https://changofreex.firebaseio.com/cliente/".$ExternalInfo[0]."/pedido.json";


    # Curl initiation

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
    $response = curl_exec($ch);
    curl_close ($ch);
?>