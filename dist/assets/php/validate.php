<?php

    
    # Data for send by get

    $datos = array(
        'client_id' => '1396909180508686' ,
        'client_secret' => '4dn5DKh7PeRaZO9mVAttmaN4uxAmpZjL',
        'grant_type' => 'authorization_code',
        'code' => $_GET["code"],
        'redirect_uri' => 'https://changofree.com/tienda/assets/php/validate.php?key='.$_GET["key"]
    );

    
    # Start request
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.mercadopago.com/oauth/token");
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($datos));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);
    curl_close ($ch);
    $output = json_encode($output); 

    
?> 
<script src="https://www.gstatic.com/firebasejs/5.4.1/firebase.js"></script>

<script>

var response = JSON.parse(<?php echo $output ?>);
var keyClient = '<?php echo $_GET["key"];?>';
var config = {
    apiKey: "AIzaSyDFd9HipeZJsBLSZPJz0E3ilzTz5avC5oQ",
    authDomain: "changofreex.firebaseapp.com",
    databaseURL: "https://changofreex.firebaseio.com",
    storageBucket: "changofreex.appspot.com",
};


firebase.initializeApp(config);
  
// Get a reference to the database service
var database = firebase.database();
  
  
firebase.database().ref('cliente/' + keyClient + "/mercadopago").set({
    access_token: response.access_token,
    public_key: response.public_key,
    refresh_token: response.refresh_token,
    user_id: response.user_id
});
setInterval(function(){ location.href="https://tienda.changofree.com/backend/inicio"; console.log("OK") }, 3000);

</script>

Verificacion completa, espere a ser redirigido.