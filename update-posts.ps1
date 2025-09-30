# Script para atualizar todos os arquivos HTML na pasta "posts" para usar a detecção automática de idioma

# Definir o caminho da pasta
$pasta = "posts"

# Obter todos os arquivos HTML na pasta
$arquivos = Get-ChildItem -Path $pasta -Filter *.html

# Loop através de cada arquivo
foreach ($arquivo in $arquivos) {
    Write-Host "Atualizando arquivo: $($arquivo.Name)"
    
    # Ler o conteúdo do arquivo
    $conteudo = Get-Content -Path $arquivo.FullName -Raw
    
    # Substituir a função de inicialização de idioma
    $novoConteudo = $conteudo -replace '(// Initialize language on page load\s+document\.addEventListener\(''DOMContentLoaded'', function\(\) \{[\s\S]*?changeLanguage\(savedLang\);\s+\}\);)', '// Initialize language on page load
        document.addEventListener(''DOMContentLoaded'', function() {
            // Verificar se há um idioma salvo nas preferências do usuário
            const savedLang = localStorage.getItem(''preferredLanguage'');
            
            if (savedLang) {
                // Se houver um idioma salvo, usar esse idioma
                changeLanguage(savedLang);
            } else {
                // Se não houver idioma salvo, detectar o idioma do navegador
                const browserLang = getBrowserLanguage();
                changeLanguage(browserLang);
            }
        });'
    
    # Escrever o novo conteúdo no arquivo
    Set-Content -Path $arquivo.FullName -Value $novoConteudo
    
    Write-Host "Arquivo atualizado: $($arquivo.Name)"
}

Write-Host "Todos os arquivos foram atualizados com sucesso!"