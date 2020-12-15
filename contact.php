<?php

if(isset($_POST['email'])) {

    $from = $_POST['email'];
    $msg = $_POST['message'];
    
    $to = 'varcxx@gmail.com';
    $subject = 'New Contact @vicaruiz.com';
    	
    $body = "From: $email\n Message:\n $message";
    
               if (mail ($to, $subject, $body, $from)) {
               echo '<p>Message Sent Successfully!</p>';
             
               
               } else {
               echo '<p>Ah! Try again, please?</p>';
               }
        

    die();
}


    
       
    
    ?>