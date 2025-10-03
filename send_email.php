<?php
// Limitar taxa de requisições - simples proteção contra spam
session_start();
if (!isset($_SESSION['last_submit'])) {
    $_SESSION['last_submit'] = 0;
}
if (time() - $_SESSION['last_submit'] < 10) { // Limite de 1 envio a cada 10 segundos
    http_response_code(429);
    die("Muitas requisições. Aguarde alguns segundos antes de enviar novamente.");
}

// Adicionar cabeçalhos para evitar problemas de CORS
header("Access-Control-Allow-Origin: https://listadecompras.shop");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: text/html; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar se é ambiente local (para testes)
    $is_local = (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) || 
                (strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false) ||
                (strpos($_SERVER['HTTP_HOST'], '[::1]') !== false);
    
    // Verificar reCAPTCHA v3 apenas em produção
    if (!$is_local) {
        // Verificar reCAPTCHA v3
        if (!isset($_POST['recaptcha_response']) || empty($_POST['recaptcha_response'])) {
            http_response_code(400);
            echo "Erro de verificação. Por favor, recarregue a página e tente novamente.";
            exit();
        }
        
        // Verificar reCAPTCHA v3 com o Google
        $secret_key = "6Lc6U90rAAAAABIWcL0745GSM4HlEQa-xtjXIZXm";
        $recaptcha_response = $_POST['recaptcha_response'];
        $recaptcha_url = "https://www.google.com/recaptcha/api/siteverify";
        $recaptcha_data = array(
            'secret' => $secret_key,
            'response' => $recaptcha_response
        );
        
        $recaptcha_options = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($recaptcha_data)
            )
        );
        
        $recaptcha_context = stream_context_create($recaptcha_options);
        $recaptcha_result = file_get_contents($recaptcha_url, false, $recaptcha_context);
        $recaptcha_response_data = json_decode($recaptcha_result);
        
        // Verificar sucesso e score (reCAPTCHA v3 usa um sistema de pontuação)
        if (!$recaptcha_response_data->success || $recaptcha_response_data->score < 0.5) {
            http_response_code(400);
            echo "Falha na verificação de segurança. Tente novamente.";
            exit();
        }
    }
    
    // Verificar se os dados foram recebidos
    if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
        http_response_code(400);
        echo "Dados incompletos.";
        exit();
    }
    
    // Validar email
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Email inválido.";
        exit();
    }
    
    // Limitar tamanho das mensagens
    if (strlen($_POST['message']) > 1000) {
        http_response_code(400);
        echo "Mensagem muito longa.";
        exit();
    }
    
    $name = htmlspecialchars(substr($_POST['name'], 0, 100)); // Limitar tamanho do nome
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars(substr($_POST['message'], 0, 1000)); // Limitar tamanho da mensagem
    
    $to = "antonioqa@proton.me";
    $subject = "[Contato Site] Nova mensagem do site Lista de Compras";
    
    $email_content = "Nome: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mensagem:\n$message\n";
    $email_content .= "\n---\nEnviado em " . date('d/m/Y H:i:s') . " via formulário do site\n";
    
    $headers = "From: noreply@listadecompras.shop\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Atualizar tempo do último envio
    $_SESSION['last_submit'] = time();
    
    // Tentar enviar o email
    if (mail($to, $subject, $email_content, $headers)) {
        // Redirecionar de volta para a página com mensagem de sucesso
        echo "<!DOCTYPE html>";
        echo "<html><head>";
        echo "<meta charset='UTF-8'>";
        echo "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
        echo "<title>Mensagem Enviada - Lista de Compras</title>";
        echo "<style>body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f5f5f5; }.container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } button { background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 10px; } button:hover { background-color: #45a049; } a { text-decoration: none; }</style>";
        echo "</head><body>";
        echo "<div class='container'>";
        echo "<h2>✅ Mensagem enviada com sucesso!</h2>";
        echo "<p>Obrigado por entrar em contato, $name. Retornaremos em breve.</p>";
        echo "<button onclick=\"window.location.href='index.html#contact'\">Voltar para o site</button>";
        echo "</div>";
        echo "</body></html>";
    } else {
        http_response_code(500);
        echo "❌ Erro ao enviar a mensagem. Por favor, tente novamente.";
    }
} else {
    // Se não for POST, redirecionar para o formulário
    header("Location: index.html#contact");
    exit();
}
?>