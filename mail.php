<?php
if(isset($_POST['email'])) {

    // Формируем текст сообщения
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $message_body = "Имя: $name\nEmail: $email\nСообщение:\n$message";

    // Отправляем сообщение
    $to = "youremail@example.com"; // Замените на ваш email-адрес
    $subject
