<?php

// file_put_contents('Data/'.rand().'test.txt', json_encode());
// $reQ = $_REQUEST;
$req = json_decode('{"zipcode":"75500","available-area":"carry-in","cellphoneCompany":"IPhone","phone_model":"iphone_11_Pro","device-issue":"Short_Battery_Life","firstname":"Murtaza","lastname":"Iqbal","phone":"03343024970","email":"murtazaiqbal1994@gmail.com","appointment":"2023-01-19T14:03","store-location":"wefixpt@gmail.com"}',true);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'mail.qawebsolutions.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'test1@qawebsolutions.com';                     //SMTP username
    $mail->Password   = 'Test@123478qa';                               //SMTP password
    $mail->SMTPSecure = 'ssl';PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //465 TCP port to connect to; use 587 if you have set 
    //`SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('test1@qawebsolutions.com');
    $mail->addAddress('murtaza@madsgency.com');     //Add a recipient


    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = "This is the HTML message body   
    
    Hello how are
    {$req["zipcode"]}
    
    <b>in bold!</b>";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}