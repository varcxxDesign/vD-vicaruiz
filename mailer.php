<?php session_start();
if(isset($_POST['Submit'])) {
$youremail = 'varcxx@gmail.com';
$fromsubject = 'vicaruiz.com';
$mail = $_POST['email'];
$subject = 'New Contact @vicaruiz.com'; 
$message = $_POST['message']; 
	$to = $youremail; 
	$mailsubject = 'Masage recived from'.$fromsubject.' Contact Page';
	$body = $fromsubject.'
	
	The person that contacted you is 
	 E-mail: '.$mail.'
	 Subject: '.$subject.'
	
	 Message: 
	 '.$message.'
	
	|---------END MESSAGE----------|'; 
echo "Thank you fo your feedback. I will contact you shortly if needed.<br/>Go to <a href='/index.php'>Home Page</a>"; 
								mail($to, $subject, $body);
 } else { 
echo "You must write a message. </br> Please go to <a href='/contact.php'>Contact Page</a>"; 
}
?> 