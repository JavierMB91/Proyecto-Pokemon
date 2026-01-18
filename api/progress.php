<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

$userId = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    $stmt = $pdo->prepare("INSERT INTO progreso (usuario_id, datos) VALUES (?, ?) ON DUPLICATE KEY UPDATE datos = ?");
    $stmt->execute([$userId, $data, $data]);
    echo json_encode(['success' => true]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare("SELECT datos FROM progreso WHERE usuario_id = ?");
    $stmt->execute([$userId]);
    $row = $stmt->fetch();
    echo $row ? $row['datos'] : '{}';
}
?>