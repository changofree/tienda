<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once '../vendor/autoload.php';
/*************************************/


    $ExternalInfo = explode("|", $_POST["keyFB"]);

    # Getting data from the id sell
    echo $_POST["acess_token"];
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

    $dia = date("d");
    $mes = date("m")-1;
    $ano = date("Y");

    $fecha_actual = $dia."/".$mes."/".$ano;
    
    //Search if we have some order with this id.
    $urlF = "https://changofreex.firebaseio.com/cliente/".$ExternalInfo[0]."/pedido.json";
    $cht = curl_init();
    curl_setopt($cht, CURLOPT_URL, $urlF);
    curl_setopt($cht, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($cht);
    curl_close($cht);
    $info = json_decode($response, true);
    $PedidoExistente = "No";
    foreach ($info as $key => $value) {
        if($info[$key]["idpedido"] == $_POST["idpedido"]){
            $PedidoExistente = "Si";
            $keyPedido = $key;
        }
    }
    if($PedidoExistente == "No"){
    
        # Information for send to FireBase

    $data = '{"estado":"'.$estado.'",
            "idpedido":"'.$_POST["idpedido"].'",
            "email":"'.$payment->payer->email.'",
            "fechacreacion":"'.$fecha_actual.'",
            "telefono":"'.$payment->payer->phone->number.'",
            "DNI":"'.$payment->payer->identification->number.'",
            "nombres":"'.$payment->payer->first_name.'",
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

    }else{
        echo $PedidoExistente;

        $data = '{"estado":"'.$estado.'",
            "idpedido":"'.$_POST["idpedido"].'",
            "email":"'.$payment->payer->email.'",
            "fechacreacion":"'.$fecha_actual.'",
            "telefono":"'.$payment->payer->phone->number.'",
            "DNI":"'.$payment->payer->identification->number.'",
            "nombres":"'.$payment->payer->first_name.'",
            "product":"'.$ExternalInfo[1].'",
            "total":"'.$payment->transaction_amount.'",
            "status": 1 }';

        $urlF = "https://changofreex.firebaseio.com/cliente/".$ExternalInfo[0]."/pedido/".$keyPedido.".json";
            
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $urlF);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
        $response = curl_exec($ch);    
        curl_close ($ch);    
    }
?>