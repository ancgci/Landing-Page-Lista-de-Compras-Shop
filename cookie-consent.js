// Cookie Consent Banner
(function() {
    // Verificar se o consentimento já foi dado
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        // Carregar scripts do Google Analytics e AdSense
        loadGoogleServices();
        return;
    }

    // Criar o banner de consentimento
    const banner = document.createElement('div');
    banner.innerHTML = `
        <div id="cookie-consent-banner" style="
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #333;
            color: white;
            padding: 15px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            font-family: Arial, sans-serif;
        ">
            <div style="text-align: center; margin-bottom: 10px;">
                <p style="margin: 0; font-size: 14px;">
                    Este site utiliza cookies para melhorar a sua experiência e para exibir anúncios personalizados. 
                    Ao continuar navegando, você concorda com a nossa 
                    <a href="politica-privacidade.html" target="_blank" style="color: #4CAF50; text-decoration: underline;">Política de Privacidade</a>.
                </p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button id="accept-cookies" style="
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 4px;
                    font-size: 14px;
                ">Aceitar Todos</button>
                <button id="reject-cookies" style="
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 4px;
                    font-size: 14px;
                ">Rejeitar</button>
            </div>
        </div>
    `;

    // Adicionar o banner ao body
    document.body.appendChild(banner);

    // Função para aceitar cookies
    document.getElementById('accept-cookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        document.getElementById('cookie-consent-banner').remove();
        loadGoogleServices();
    });

    // Função para rejeitar cookies
    document.getElementById('reject-cookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'rejected');
        document.getElementById('cookie-consent-banner').remove();
        // Não carregar serviços do Google
    });

    // Função para carregar os serviços do Google
    function loadGoogleServices() {
        // Carregar Google Analytics
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-JT98JSW1CV';
        document.head.appendChild(gaScript);

        // Inicializar Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-JT98JSW1CV');

        // Carregar AdSense (se não estiver já carregado)
        if (!document.querySelector('script[src*="adsbygoogle"]')) {
            const adsScript = document.createElement('script');
            adsScript.async = true;
            adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8703292116579734';
            adsScript.crossOrigin = 'anonymous';
            document.head.appendChild(adsScript);
        }
    }
})();