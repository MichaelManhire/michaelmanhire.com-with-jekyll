<?php
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$recipient = "michaelmanhire@gmail.com";
$subject = "Contact Form Submission on michaelmanhire.com";

if ($name !== "") {
	$formContent = "Name: $name \r\nEmail: $email \r\nMessage: $message";
}
else {
	$formContent = "Email: $email \r\nMessage: $message";
}

if ($email !== "" && $message !== "") {
	mail($recipient, $subject, $formContent);
}
?>
