<?php 
    $message = "Hobnob Error: No Data";
    $message =. " Params:"+$_POST['params']."\n\n State:".$_POST['state']."\n\n Stack:".$_POST['stack']."\n\n";

    $to = "daveberzack@gmail.com"; // this is your Email address
    $subject = "Hobnob Error";
    $headers = "From:hobnob_error@daveberzack.com";;
    mail($to,$subject,$message,$headers);
    echo $message.":".$to;
?>