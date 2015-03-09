<?php 

if(isset($_GET['m'])){
    $to = "daveberzack@gmail.com"; // this is your Email address
    $subject = "Hobnob Error";
    $message = $_GET['m'];
    $headers = "From:hobnob_error@daveberzack.com";;
    mail($to,$subject,$message,$headers);
    echo $message.":".$to;
}
?>