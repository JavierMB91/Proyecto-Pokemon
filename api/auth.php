<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true);

if ($action === 'check') {
    if (isset($_SESSION['user_id'])) {
        echo json_encode(['logged_in' => true, 'user' => ['uid' => $_SESSION['user_id'], 'displayName' => $_SESSION['email']]]);
    } else {
        echo json_encode(['logged_in' => false]);
    }
    exit;
}

if ($action === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'login' && $input) {
    $stmt = $pdo->prepare("SELECT id, contrasena FROM usuarios WHERE email = ?");
    $stmt->execute([$input['email']]);
    $user = $stmt->fetch();

    if ($user && password_verify($input['password'], $user['contrasena'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['email'] = $input['email'];
        echo json_encode(['success' => true, 'user' => ['uid' => $user['id'], 'displayName' => $input['email']]]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
    }
    exit;
}

if ($action === 'register' && $input) {
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$input['email']]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'El usuario ya existe']);
        exit;
    }

    $hash = password_hash($input['password'], PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO usuarios (email, contrasena) VALUES (?, ?)");
    
    if ($stmt->execute([$input['email'], $hash])) {
        $_SESSION['user_id'] = $pdo->lastInsertId();
        $_SESSION['email'] = $input['email'];
        echo json_encode(['success' => true, 'user' => ['uid' => $_SESSION['user_id'], 'displayName' => $input['email']]]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error al registrar']);
    }
    exit;
}
?>