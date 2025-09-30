// Script para forçar a limpeza de cache e recarregar os recursos
(function() {
    // Limpar localStorage
    localStorage.clear();
    
    // Limpar sessionStorage
    sessionStorage.clear();
    
    // Forçar recarregamento de todos os recursos com versão
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Adicionar parâmetro de versão para evitar cache
            const separator = href.includes('?') ? '&' : '?';
            link.setAttribute('href', href + separator + 'v=' + Date.now());
        }
    });
    
    // Forçar recarregamento de scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        const src = script.getAttribute('src');
        if (src) {
            // Adicionar parâmetro de versão para evitar cache
            const separator = src.includes('?') ? '&' : '?';
            script.setAttribute('src', src + separator + 'v=' + Date.now());
        }
    });
    
    console.log('Cache limpo e recursos forçados a recarregar');
})();