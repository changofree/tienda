<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once '../vendor/autoload.php';
/*************************************/


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

    if($estado == "Acreditado"){
        $keyCliente = "";
        $hasta = "";
        $fechaHasta = "";
    
        # Getting a access token of the seller
            $urlF = "https://changofreex.firebaseio.com/cliente.json";
            $cht = curl_init();
            curl_setopt($cht, CURLOPT_URL, $urlF);
            curl_setopt($cht, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($cht);
            curl_close($cht);
            $info = json_decode($response, true);
        
        foreach ($info as $key => $value) {
            $fechaHasta = $info[$key]["hasta"];
            $keyCliente = $key;
        }
        
        $arrayFecha = explode("/", $fechaHasta);
        
        $diasMes = cal_days_in_month(CAL_GREGORIAN, (int)($arrayFecha[1])+1 , 2018); // 31
        $aux2 = 0;
        if($arrayFecha[0]+30 < $diasMes){
            $hasta =  (string)($arrayFecha[0]+30).'/'. (string)($arrayFecha[1]).'/'. (string)($arrayFecha[2]);
        }else{
            $aux = (($arrayFecha[0]+30) - $diasMes);
            if((int)($arrayFecha[1])+1 == 12){
                $hasta = (string)$aux.'/'.(string)$aux2.'/'.(string)($arrayFecha[2]+1);
            }else{
                $hasta = (string)$aux.'/'.(string)((int)($arrayFecha[1])+1).'/'.(string)($arrayFecha[2]);
            }
        }
    }

    $url = "https://changofreex.firebaseio.com/cliente/".$keyCliente.".json";

    $data = '{"hasta":"'.$hasta.'"}';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
    $response = curl_exec($ch);    
    curl_close ($ch);
    echo $hasta;


    $dia = date("d");
    $mes = date("m")-1;
    $ano = date("Y");

    $fecha_actual = $dia."/".$mes."/".$ano;

    # Information for send to FireBase
    $data = '{"estado":"'.$estado.'",
            "idcompra":"'.$_GET["id"].'",
            "email":"'.$payment->external_reference.'",
            "fechacreacion":"'.$fecha_actual.'",
            "DNI":"'.$payment->card->cardholder->identification->number.'",
            "total":"'.$payment->transaction_amount.'"}';
    

    # Url firebase
    
    $url = "https://changofreex.firebaseio.com/pedido.json";


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

