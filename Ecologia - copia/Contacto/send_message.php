<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Establecer las variables
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);
    $to = 'guill3rmoisai@gmail.com';

    // Construir el correo electrónico
    $subject = 'Nuevo mensaje de contacto de ' . $name;
    $body = "Nombre: $name\nCorreo electrónico: $email\n\nMensaje:\n$message";

    // Enviar el correo electrónico
    if (mail($to, $subject, $body)) {
        // Preparar la respuesta JSON
        $response = array(
            'success' => true,
            'message' => '¡Mensaje enviado con éxito!'
        );
    } else {
        // Preparar la respuesta JSON en caso de error
        $response = array(
            'success' => false,
            'message' => '¡Error al enviar el mensaje!'
        );
    }

    // Devolver la respuesta JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Si el método de solicitud no es POST, devuelve un error
    http_response_code(405); // Método no permitido
    echo json_encode(array('error' => 'Método no permitido'));
}

?>
