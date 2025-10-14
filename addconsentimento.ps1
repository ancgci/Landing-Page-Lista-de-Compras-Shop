# Script PowerShell para inserir o código de consentimento de cookies em todas as páginas HTML, exceto política de privacidade e termos de uso
$cookieConsentScript = '<script src="cookie-consent.js"></script>'

# Obter todas as páginas HTML
$arquivos = Get-ChildItem -Path "c:\Users\User\Documents\Landing-Page-Lista-de-Compras-Shop" -Recurse -Include *.html

foreach ($arquivo in $arquivos) {
    # Pular os arquivos de política de privacidade e termos de uso
    if ($arquivo.Name -eq "politica-privacidade.html" -or $arquivo.Name -eq "termos-de-uso.html") {
        Write-Host "Ignorando $($arquivo.Name) (páginas legais)"
        continue
    }
    
    $conteudo = Get-Content $arquivo.FullName -Raw
    
    # Verificar se o script de consentimento já existe
    if (-not ($conteudo -match '<script src="cookie-consent.js"></script>')) {
        # Inserir o script antes do fechamento da tag </body>
        $conteudo = $conteudo -replace '(</body>)', "    $cookieConsentScript`n`$1"
        
        # Salvar o arquivo modificado
        Set-Content $arquivo.FullName $conteudo
        Write-Host "Script de consentimento adicionado a $($arquivo.Name)"
    } else {
        Write-Host "Script de consentimento já existe em $($arquivo.Name)"
    }
}

Write-Host "Processo concluído!"