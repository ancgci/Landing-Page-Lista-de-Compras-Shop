# Script PowerShell para adicionar a tag meta do Google AdSense a todas as páginas HTML
$conteudoMeta = '<meta name="google-adsense-account" content="ca-pub-8703292116579734">'

# Obter todas as páginas HTML
$arquivos = Get-ChildItem -Path "c:\Users\User\Documents\Landing-Page-Lista-de-Compras-Shop" -Recurse -Include *.html

foreach ($arquivo in $arquivos) {
    $conteudo = Get-Content $arquivo.FullName -Raw
    
    # Verificar se a tag meta já existe
    if (-not ($conteudo -match '<meta name="google-adsense-account" content="ca-pub-8703292116579734">')) {
        # Adicionar a tag meta após a tag meta description
        $conteudo = $conteudo -replace '(<meta name="description"[^>]*>)', "`$1`n    $conteudoMeta"
        
        # Salvar o arquivo modificado
        Set-Content $arquivo.FullName $conteudo
        Write-Host "Tag meta adicionada a $($arquivo.Name)"
    } else {
        Write-Host "Tag meta já existe em $($arquivo.Name)"
    }
}