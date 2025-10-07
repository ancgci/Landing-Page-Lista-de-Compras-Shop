# Script PowerShell para inserir o código do Google AdSense em todas as páginas HTML, exceto política de privacidade e termos de uso
$adsenseScript = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8703292116579734" crossorigin="anonymous"></script>'

# Obter todas as páginas HTML
$arquivos = Get-ChildItem -Path "c:\Users\User\Documents\Landing-Page-Lista-de-Compras-Shop" -Recurse -Include *.html

foreach ($arquivo in $arquivos) {
    # Pular os arquivos de política de privacidade e termos de uso
    if ($arquivo.Name -eq "politica-privacidade.html" -or $arquivo.Name -eq "termos-de-uso.html") {
        Write-Host "Ignorando $($arquivo.Name) (páginas legais)"
        continue
    }
    
    $conteudo = Get-Content $arquivo.FullName -Raw
    
    # Verificar se o script do AdSense já existe
    if (-not ($conteudo -match '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\?client=ca-pub-8703292116579734"')) {
        # Inserir o script antes do fechamento da tag </head>
        $conteudo = $conteudo -replace '(</head>)', "    $adsenseScript`n`$1"
        
        # Salvar o arquivo modificado
        Set-Content $arquivo.FullName $conteudo
        Write-Host "Script do AdSense adicionado a $($arquivo.Name)"
    } else {
        Write-Host "Script do AdSense já existe em $($arquivo.Name)"
    }
}

Write-Host "Processo concluído!"