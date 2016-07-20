<?php
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$recipient = "michaelmanhire@gmail.com";
$subject = "Contact Form Submission on michaelmanhire.com";

$formContent = "Name: $name \r\nEmail: $email \r\nMessage: $message";

mail($recipient, $subject, $formContent);
?>
