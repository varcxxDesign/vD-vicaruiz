<?php

if (isset($_POST["recaptcha"])) {
	if (!empty($_POST["recaptcha"])) {

		$youremail = 'varcxx@gmail.com';
		$fromsubject = 'Portfolio Site';
		$mail = $_POST['email'];
		$name = $_POST['name'];
		$subject = 'New Message @vicaruiz.com'; 
		$message = $_POST['message']; 
		$to = $youremail; 
		$mailsubject = 'Masage recived from'.$fromsubject.' Contact Page';
		$body = $fromsubject.'
	
			The person that contacted you is
			 Name: '.$name.' 
			 E-mail: '.$mail.'
			 
			 Message: '.$message.'
	
		|---------END MESSAGE----------|'; 
		

		$headers = "From: " . $mail;

		mail($to, $subject, $body, $headers);

		echo json_encode(1);

	}
	else {
		echo json_encode("error");
	}
}
else {
	echo json_encode("error2");
}



?>