// Função para detectar o idioma do navegador
function getBrowserLanguage() {
    // Obter o idioma preferido do navegador
    const browserLang = navigator.language || navigator.userLanguage || 'pt';
    
    // Mapear idiomas do navegador para os idiomas suportados pelo site
    const languageMap = {
        'pt': 'pt',
        'pt-BR': 'pt',
        'pt-PT': 'pt',
        'en': 'en',
        'en-US': 'en',
        'en-GB': 'en',
        'es': 'es',
        'es-ES': 'es',
        'es-MX': 'es',
        'de': 'de',
        'de-DE': 'de',
        'it': 'it',
        'it-IT': 'it'
    };
    
    // Retornar o idioma mapeado ou português como padrão
    return languageMap[browserLang] || 'pt';
}

// Função para rolar suavemente até as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// FunÃ§Ã£o para animar elementos quando entram na viewport
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .step');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Inicializar animaÃ§Ãµes
document.addEventListener('DOMContentLoaded', () => {
    // Configurar animaÃ§Ãµes iniciais
    const animatedElements = document.querySelectorAll('.feature-card, .step');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Executar animaÃ§Ã£o na carga inicial
    animateOnScroll();
});

// Executar animaÃ§Ãµes ao rolar
window.addEventListener('scroll', animateOnScroll);

// FunÃ§Ã£o para lidar com o envio do formulÃ¡rio de contato
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Mostrar feedback visual durante o envio
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Permitir que o formulÃ¡rio seja enviado normalmente para o PHP
    // O PHP cuidarÃ¡ do envio do email
});

// FunÃ§Ã£o para atualizar o ano no footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
});

// FunÃ§Ã£o para fechar mensagens de alerta (se houver)
function closeAlert(element) {
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.display = 'none';
    }, 300);
}

// FunÃ§Ã£o para prÃ©-carregar imagens
function preloadImages(imageSources) {
    imageSources.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = function() {
            console.log('Imagem prÃ©-carregada:', src);
        };
        img.onerror = function() {
            console.warn('Erro ao prÃ©-carregar imagem:', src);
        };
    });
}

// PrÃ©-carregar imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const imageSources = Array.from(carouselImages).map(img => img.src);
    preloadImages(imageSources);
});

// ImplementaÃ§Ã£o simples do carrossel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando carrossel...');
    
    // Selecionar elementos do carrossel
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    // Verificar se o carrossel existe
    if (!carousel || slides.length === 0) {
        console.warn('Carrossel nÃ£o encontrado ou sem slides');
        return;
    }
    
    console.log('Carrossel encontrado com', slides.length, 'slides');
    
    let currentIndex = 0;
    let autoPlayInterval;
    const slideCount = slides.length;
    
    // FunÃ§Ã£o para atualizar o carrossel
    function updateCarousel() {
        console.log('Atualizando carrossel para slide', currentIndex);
        
        // Calcular a posiÃ§Ã£o de transformaÃ§Ã£o
        const translateX = -currentIndex * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar classes ativas dos slides
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Atualizar indicadores
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }
    
    // FunÃ§Ã£o para ir para o prÃ³ximo slide
    function nextSlide() {
        console.log('PrÃ³ximo slide');
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    // FunÃ§Ã£o para ir para o slide anterior
    function prevSlide() {
        console.log('Slide anterior');
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // FunÃ§Ã£o para ir para um slide especÃ­fico
    function goToSlide(index) {
        console.log('Ir para slide', index);
        if (index >= 0 && index < slideCount) {
            currentIndex = index;
            updateCarousel();
        }
    }
    
    // Iniciar autoplay
    function startAutoPlay() {
        console.log('Iniciando autoplay');
        stopAutoPlay(); // Parar autoplay existente se houver
        autoPlayInterval = setInterval(nextSlide, 5000); // Mudar a cada 5 segundos
    }
    
    // Parar autoplay
    function stopAutoPlay() {
        console.log('Parando autoplay');
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Adicionar event listeners aos botÃµes
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('BotÃ£o prÃ³ximo clicado');
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('BotÃ£o anterior clicado');
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }
    
    // Adicionar event listeners aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            console.log('Indicador', index, 'clicado');
            stopAutoPlay();
            goToSlide(parseInt(this.getAttribute('data-slide')));
            startAutoPlay();
        });
    });
    
    // Pausar autoplay quando o mouse estiver sobre o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            console.log('Mouse entrou no carrossel');
            stopAutoPlay();
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            console.log('Mouse saiu do carrossel');
            startAutoPlay();
        });
    }
    
    // Inicializar o carrossel
    console.log('Inicializando carrossel...');
    updateCarousel();
    
    // Iniciar autoplay
    startAutoPlay();
    
    // Adicionar suporte para teclas de seta
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            console.log('Seta esquerda pressionada');
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            console.log('Seta direita pressionada');
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });
});

// FunÃ§Ã£o para verificar se o CSS foi carregado corretamente
function checkCSSLoaded() {
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    let stylesLoaded = true;
    
    linkElements.forEach(link => {
        if (link.href.includes('styles.css')) {
            try {
                // Verificar se o CSS foi aplicado
                const testElement = document.createElement('div');
                testElement.className = 'carousel-container';
                testElement.style.visibility = 'hidden';
                testElement.style.position = 'absolute';
                document.body.appendChild(testElement);
                
                const computedStyle = window.getComputedStyle(testElement);
                const height = computedStyle.getPropertyValue('height');
                
                if (!height || height === '0px') {
                    console.warn('CSS nÃ£o carregado corretamente ou nÃ£o aplicado');
                    stylesLoaded = false;
                }
                
                document.body.removeChild(testElement);
            } catch (e) {
                console.warn('Erro ao verificar CSS:', e);
                stylesLoaded = false;
            }
        }
    });
    
    return stylesLoaded;
}

// Verificar carregamento do CSS
document.addEventListener('DOMContentLoaded', () => {
    if (!checkCSSLoaded()) {
        console.warn('Tentando recarregar CSS...');
        // Tentar recarregar o CSS
        const linkElement = document.querySelector('link[href="styles.css"]');
        if (linkElement) {
            const newLink = linkElement.cloneNode();
            newLink.href = linkElement.href + '?' + new Date().getTime(); // Adicionar timestamp para evitar cache
            linkElement.parentNode.replaceChild(newLink, linkElement);
        }
    }
});

// FunÃ§Ã£o para verificar se as imagens do carrossel estÃ£o carregando corretamente
function checkCarouselImages() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    let allImagesLoaded = true;
    
    carouselImages.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn(`Imagem do carrossel ${index} nÃ£o carregada corretamente:`, img.src);
            allImagesLoaded = false;
            
            // Tentar recarregar a imagem
            const originalSrc = img.src;
            img.src = '';
            setTimeout(() => {
                img.src = originalSrc;
            }, 100);
        }
    });
    
    return allImagesLoaded;
}

// Verificar carregamento das imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    setTimeout(checkCarouselImages, 1000);
    
    // Verificar novamente apÃ³s 5 segundos
    setTimeout(checkCarouselImages, 5000);
});

// FunÃ§Ã£o para ajustar o tamanho das imagens do carrossel
function adjustCarouselImageSizes() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach(img => {
        // Verificar se a imagem estÃ¡ carregada
        if (img.complete && img.naturalWidth > 0) {
            // Verificar se a imagem Ã© muito grande
            if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
                console.warn('Imagem muito grande detectada, ajustando tamanho:', img.src);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.classList.add('large-image');
            }
        }
    });
}

// Ajustar tamanho das imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Ajustar imediatamente
    setTimeout(adjustCarouselImageSizes, 500);
    
    // Ajustar novamente apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', adjustCarouselImageSizes);
});

// FunÃ§Ã£o para verificar e aplicar estilos crÃ­ticos do carrossel
function applyCriticalCarouselStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    if (carouselContainer) {
        // Verificar e aplicar estilos crÃ­ticos do contÃªiner
        if (!carouselContainer.style.height || carouselContainer.style.height === '0px') {
            carouselContainer.style.height = '500px';
        }
        
        // Verificar e aplicar estilos crÃ­ticos do carrossel
        if (carousel) {
            if (!carousel.style.display || carousel.style.display !== 'flex') {
                carousel.style.display = 'flex';
            }
            if (!carousel.style.transition || !carousel.style.transition.includes('transform')) {
                carousel.style.transition = 'transform 0.5s ease';
            }
        }
        
        // Verificar e aplicar estilos crÃ­ticos dos slides
        carouselSlides.forEach(slide => {
            if (!slide.style.minWidth || slide.style.minWidth !== '100%') {
                slide.style.minWidth = '100%';
            }
            if (!slide.style.height || slide.style.height !== '100%') {
                slide.style.height = '100%';
            }
            if (!slide.style.flexShrink || slide.style.flexShrink !== '0') {
                slide.style.flexShrink = '0';
            }
            if (!slide.style.display || slide.style.display !== 'flex') {
                slide.style.display = 'flex';
            }
        });
        
        // Verificar e aplicar estilos crÃ­ticos das imagens
        carouselImages.forEach(img => {
            if (!img.style.maxWidth || img.style.maxWidth !== '100%') {
                img.style.maxWidth = '100%';
            }
            if (!img.style.maxHeight || img.style.maxHeight !== '100%') {
                img.style.maxHeight = '100%';
            }
            if (!img.style.width || img.style.width !== 'auto') {
                img.style.width = 'auto';
            }
            if (!img.style.height || img.style.height !== 'auto') {
                img.style.height = 'auto';
            }
            if (!img.style.display || img.style.display !== 'block') {
                img.style.display = 'block';
            }
            if (!img.style.objectFit || img.style.objectFit !== 'contain') {
                img.style.objectFit = 'contain';
            }
        });
    }
}

// Aplicar estilos crÃ­ticos do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar imediatamente
    applyCriticalCarouselStyles();
    
    // Aplicar novamente apÃ³s 1 segundo
    setTimeout(applyCriticalCarouselStyles, 1000);
    
    // Aplicar novamente apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', applyCriticalCarouselStyles);
});

// FunÃ§Ã£o para verificar se os estilos do carrossel estÃ£o sendo aplicados corretamente
function checkCarouselStylesApplied() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        const containerStyle = window.getComputedStyle(carouselContainer);
        if (containerStyle.height === '0px' || containerStyle.height === 'auto') {
            console.warn('Estilos do carrossel nÃ£o aplicados corretamente - altura do contÃªiner');
            carouselContainer.style.height = '500px';
        }
        
        if (carousel) {
            const carouselStyle = window.getComputedStyle(carousel);
            if (carouselStyle.display !== 'flex') {
                console.warn('Estilos do carrossel nÃ£o aplicados corretamente - display do carrossel');
                carousel.style.display = 'flex';
            }
        }
        
        carouselSlides.forEach((slide, index) => {
            const slideStyle = window.getComputedStyle(slide);
            if (slideStyle.minWidth !== '100%' && slideStyle.minWidth !== '100vw') {
                console.warn('Estilos do carrossel nÃ£o aplicados corretamente - largura do slide', index);
                slide.style.minWidth = '100%';
            }
        });
    }
}

// Verificar se os estilos do carrossel estÃ£o sendo aplicados corretamente
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    setTimeout(checkCarouselStylesApplied, 500);
    
    // Verificar novamente apÃ³s 2 segundos
    setTimeout(checkCarouselStylesApplied, 2000);
    
    // Verificar apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', checkCarouselStylesApplied);
});

// FunÃ§Ã£o para verificar e ajustar o dimensionamento das imagens do carrossel
function checkAndAdjustImageSizing() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach(img => {
        // Verificar se a imagem estÃ¡ carregada
        if (img.complete && img.naturalWidth > 0) {
            // Verificar se a imagem estÃ¡ muito grande
            if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
                console.warn('Imagem muito grande detectada, ajustando dimensionamento:', img.src);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.classList.add('large-image');
            }
            
            // Verificar se a imagem estÃ¡ muito pequena
            if (img.naturalWidth < 100 && img.naturalHeight < 100) {
                console.warn('Imagem muito pequena detectada:', img.src);
                img.classList.add('small-image');
            }
        }
    });
}

// Verificar e ajustar o dimensionamento das imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente apÃ³s o carregamento das imagens
    setTimeout(checkAndAdjustImageSizing, 1000);
    
    // Verificar novamente apÃ³s 3 segundos
    setTimeout(checkAndAdjustImageSizing, 3000);
    
    // Verificar apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', checkAndAdjustImageSizing);
});

// FunÃ§Ã£o para verificar e corrigir o carregamento das imagens do carrossel
function verifyAndFixImageLoading() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach((img, index) => {
        // Verificar se a imagem estÃ¡ carregada
        if (img.complete) {
            if (img.naturalWidth === 0) {
                console.warn('Imagem do carrossel nÃ£o carregada corretamente:', img.src);
                // Tentar recarregar a imagem
                const originalSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = originalSrc;
                }, 100);
            } else {
                console.log('Imagem do carrossel carregada corretamente:', img.src, img.naturalWidth, 'x', img.naturalHeight);
            }
        } else {
            // Adicionar listeners para verificar o carregamento
            img.addEventListener('load', function() {
                console.log('Imagem do carrossel carregada:', this.src, this.naturalWidth, 'x', this.naturalHeight);
                // Remover classe de erro se existir
                this.classList.remove('image-error');
                // Verificar dimensÃµes
                checkImageDimensions(this);
            });
            
            img.addEventListener('error', function() {
                console.warn('Erro ao carregar imagem do carrossel:', this.src);
                // Adicionar classe para tratamento de erro
                this.classList.add('image-error');
                // Tentar carregar imagem de fallback
                const fallbackSrc = 'assets/screenshots/app-mockup.png';
                if (this.src !== fallbackSrc) {
                    this.src = fallbackSrc;
                }
            });
        }
    });
}

// Verificar e corrigir o carregamento das imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    verifyAndFixImageLoading();
    
    // Verificar novamente apÃ³s 2 segundos
    setTimeout(verifyAndFixImageLoading, 2000);
    
    // Verificar apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', verifyAndFixImageLoading);
});

// FunÃ§Ã£o para verificar dimensÃµes da imagem
function checkImageDimensions(img) {
    // Se a imagem for muito grande, adicionar classe para tratamento
    if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
        img.classList.add('large-image');
        console.warn('Imagem muito grande detectada:', img.src, img.naturalWidth, 'x', img.naturalHeight);
    }
}

// FunÃ§Ã£o para verificar e corrigir o dimensionamento das imagens do carrossel
function verifyAndFixImageSizing() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach(img => {
        // Verificar se a imagem estÃ¡ carregada
        if (img.complete && img.naturalWidth > 0) {
            // Verificar se a imagem estÃ¡ muito grande
            if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
                console.warn('Imagem muito grande detectada, corrigindo dimensionamento:', img.src);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.classList.add('large-image');
            }
            
            // Verificar se a imagem estÃ¡ muito pequena
            if (img.naturalWidth < 100 && img.naturalHeight < 100) {
                console.warn('Imagem muito pequena detectada, corrigindo dimensionamento:', img.src);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.classList.add('small-image');
            }
            
            // Verificar se a imagem estÃ¡ distorcida
            if (img.offsetWidth > 0 && img.offsetHeight > 0) {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                const displayRatio = img.offsetWidth / img.offsetHeight;
                
                // Se a diferenÃ§a de proporÃ§Ã£o for muito grande, corrigir
                if (Math.abs(aspectRatio - displayRatio) > 0.1) {
                    console.warn('ProporÃ§Ã£o da imagem distorcida, corrigindo:', img.src);
                    img.style.objectFit = 'contain';
                    img.style.width = 'auto';
                    img.style.height = 'auto';
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                }
            }
        }
    });
}

// Verificar e corrigir o dimensionamento das imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente apÃ³s o carregamento das imagens
    setTimeout(verifyAndFixImageSizing, 1000);
    
    // Verificar novamente apÃ³s 3 segundos
    setTimeout(verifyAndFixImageSizing, 3000);
    
    // Verificar apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', verifyAndFixImageSizing);
});

// FunÃ§Ã£o para verificar e corrigir os estilos do carrossel
function verifyAndFixCarouselStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    if (carouselContainer) {
        // Verificar e corrigir estilos do contÃªiner
        const containerStyle = window.getComputedStyle(carouselContainer);
        if (containerStyle.height === '0px' || containerStyle.height === 'auto') {
            console.warn('Corrigindo altura do contÃªiner do carrossel');
            carouselContainer.style.height = '500px';
        }
        
        // Verificar e corrigir estilos do carrossel
        if (carousel) {
            const carouselStyle = window.getComputedStyle(carousel);
            if (carouselStyle.display !== 'flex') {
                console.warn('Corrigindo display do carrossel');
                carousel.style.display = 'flex';
            }
            
            if (!carouselStyle.transition || !carouselStyle.transition.includes('transform')) {
                console.warn('Corrigindo transiÃ§Ã£o do carrossel');
                carousel.style.transition = 'transform 0.5s ease';
            }
        }
        
        // Verificar e corrigir estilos dos slides
        carouselSlides.forEach(slide => {
            const slideStyle = window.getComputedStyle(slide);
            if (slideStyle.minWidth !== '100%' && slideStyle.minWidth !== '100vw') {
                console.warn('Corrigindo largura do slide');
                slide.style.minWidth = '100%';
            }
            
            if (slideStyle.height !== '100%') {
                console.warn('Corrigindo altura do slide');
                slide.style.height = '100%';
            }
            
            if (slideStyle.flexShrink !== '0') {
                console.warn('Corrigindo flex-shrink do slide');
                slide.style.flexShrink = '0';
            }
            
            if (slideStyle.display !== 'flex') {
                console.warn('Corrigindo display do slide');
                slide.style.display = 'flex';
            }
        });
        
        // Verificar e corrigir estilos das imagens
        carouselImages.forEach(img => {
            const imgStyle = window.getComputedStyle(img);
            
            if (imgStyle.maxWidth !== '100%') {
                console.warn('Corrigindo max-width da imagem');
                img.style.maxWidth = '100%';
            }
            
            if (imgStyle.maxHeight !== '100%') {
                console.warn('Corrigindo max-height da imagem');
                img.style.maxHeight = '100%';
            }
            
            if (imgStyle.width !== 'auto') {
                console.warn('Corrigindo width da imagem');
                img.style.width = 'auto';
            }
            
            if (imgStyle.height !== 'auto') {
                console.warn('Corrigindo height da imagem');
                img.style.height = 'auto';
            }
            
            if (imgStyle.display !== 'block') {
                console.warn('Corrigindo display da imagem');
                img.style.display = 'block';
            }
            
            if (imgStyle.objectFit !== 'contain') {
                console.warn('Corrigindo object-fit da imagem');
                img.style.objectFit = 'contain';
            }
        });
    }
}

// Verificar e corrigir os estilos do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    setTimeout(verifyAndFixCarouselStyles, 500);
    
    // Verificar novamente apÃ³s 2 segundos
    setTimeout(verifyAndFixCarouselStyles, 2000);
    
    // Verificar apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', verifyAndFixCarouselStyles);
});

// FunÃ§Ã£o para verificar se o Google Analytics estÃ¡ afetando o carrossel
function checkGoogleAnalyticsImpact() {
    // Verificar se o Google Analytics estÃ¡ carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics nÃ£o estÃ¡ carregado');
    }
    
    // Verificar se hÃ¡ conflitos com o carrossel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        // Salvar estado inicial
        const initialState = carousel.style.cssText;
        
        // Tentar mover o carrossel
        setTimeout(() => {
            carousel.style.transform = 'translateX(-100%)';
            
            // Verificar se o movimento foi aplicado
            setTimeout(() => {
                const currentState = carousel.style.transform;
                if (currentState !== 'translateX(-100%)') {
                    console.warn('PossÃ­vel conflito com Google Analytics detectado - carrossel nÃ£o estÃ¡ se movendo corretamente');
                }
                
                // Restaurar estado inicial
                carousel.style.cssText = initialState;
            }, 100);
        }, 1000);
    }
}

// Verificar impacto do Google Analytics no carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar apÃ³s 3 segundos para garantir que o Google Analytics tenha carregado
    setTimeout(checkGoogleAnalyticsImpact, 3000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o Google Analytics
function checkGoogleAnalytics() {
    // Verificar se o Google Analytics estÃ¡ carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics nÃ£o estÃ¡ carregado');
    }
    
    // Verificar se hÃ¡ conflitos com o carrossel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        // Salvar estado inicial
        const initialTransform = carousel.style.transform;
        
        // Tentar mover o carrossel
        setTimeout(() => {
            carousel.style.transform = 'translateX(-100%)';
            
            // Verificar se o movimento foi aplicado
            setTimeout(() => {
                const currentTransform = carousel.style.transform;
                if (currentTransform !== 'translateX(-100%)') {
                    console.warn('PossÃ­vel conflito com Google Analytics detectado - carrossel nÃ£o estÃ¡ se movendo corretamente');
                }
                
                // Restaurar estado inicial
                carousel.style.transform = initialTransform;
            }, 100);
        }, 1000);
    }
}

// Verificar Google Analytics
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkGoogleAnalytics, 6000);
});

// FunÃ§Ã£o para verificar e corrigir problemas de carregamento das imagens do carrossel
function checkAndFixImageLoadingIssues() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    // Verificar se o carrossel existe
    if (!carouselContainer || carouselImages.length === 0) {
        console.warn('Carrossel nÃ£o encontrado na pÃ¡gina');
        return;
    }
    
    // Verificar se as imagens estÃ£o carregando
    let allImagesLoaded = true;
    carouselImages.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn(`Imagem ${index} do carrossel nÃ£o carregada:`, img.src);
            allImagesLoaded = false;
            
            // Tentar recarregar a imagem
            const originalSrc = img.src;
            img.src = '';
            setTimeout(() => {
                img.src = originalSrc;
            }, 100);
        }
    });
    
    // Se todas as imagens estiverem carregadas, verificar dimensionamento
    if (allImagesLoaded) {
        console.log('Todas as imagens do carrossel carregadas corretamente');
        // Verificar e corrigir dimensionamento
        verifyAndFixImageSizing();
    }
    
    // Adicionar classe de fallback se necessÃ¡rio
    if (!allImagesLoaded) {
        carouselContainer.classList.add('loading-fallback');
        setTimeout(() => {
            carouselContainer.classList.remove('loading-fallback');
        }, 5000);
    }
}

// Verificar e corrigir problemas de carregamento das imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    checkAndFixImageLoadingIssues();
    
    // Verificar novamente apÃ³s 2 segundos
    setTimeout(checkAndFixImageLoadingIssues, 2000);
    
    // Verificar apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', checkAndFixImageLoadingIssues);
    
    // Verificar periodicamente a cada 10 segundos
    setInterval(checkAndFixImageLoadingIssues, 10000);
});

// FunÃ§Ã£o para verificar e corrigir problemas de carregamento do CSS
function checkAndFixCSSLoadingIssues() {
    // Verificar se os estilos crÃ­ticos estÃ£o sendo aplicados
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        // Verificar altura do contÃªiner
        const containerHeight = carouselContainer.offsetHeight;
        if (containerHeight === 0) {
            console.warn('Altura do contÃªiner do carrossel Ã© zero, aplicando fallback');
        }
    }
}

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o carregamento do CSS
function checkCSSLoading() {
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    
    linkElements.forEach((link, index) => {
        console.log('CSS', index, 'href:', link.href);
        console.log('CSS', index, 'carregado:', link.sheet ? 'sim' : 'nÃ£o');
        
        if (!link.sheet) {
            console.warn('CSS', index, 'nÃ£o carregado corretamente');
        }
    });
    
    // Verificar se o CSS principal estÃ¡ carregado
    const mainCSS = document.getElementById('main-css');
    if (mainCSS) {
        console.log('CSS principal carregado:', mainCSS.sheet ? 'sim' : 'nÃ£o');
        
        if (!mainCSS.sheet) {
            console.warn('CSS principal nÃ£o carregado, tentando recarregar...');
            
            // Tentar recarregar o CSS
            const newLink = mainCSS.cloneNode();
            newLink.href = mainCSS.href + '?' + new Date().getTime(); // Adicionar timestamp para evitar cache
            mainCSS.parentNode.replaceChild(newLink, mainCSS);
        }
    }
}

// Verificar carregamento do CSS
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkCSSLoading, 17000);
});

// FunÃ§Ã£o para verificar e corrigir problemas de carregamento do CSS
function checkAndFixCSSLoadingIssues() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        // Verificar altura do carrossel-container
        if (carouselContainer.clientHeight < 500) {
            console.warn('Altura do carrossel-container menor que 500px, aplicando fallback');
            carouselContainer.style.height = '500px';
        }
        
        // Verificar display do carrossel
        if (carousel) {
            const carouselDisplay = window.getComputedStyle(carousel).display;
            if (carouselDisplay !== 'flex') {
                console.warn('Display do carrossel nÃ£o Ã© flex, aplicando fallback');
                carousel.style.display = 'flex';
            }
        }
        
        // Verificar slides
        carouselSlides.forEach(slide => {
            const slideMinWidth = window.getComputedStyle(slide).minWidth;
            if (slideMinWidth !== '100%' && slideMinWidth !== '100vw') {
                console.warn('Largura mÃ­nima do slide incorreta, aplicando fallback');
                slide.style.minWidth = '100%';
            }
        });
    }
    
    // Verificar se o CSS principal estÃ¡ carregado
    const mainCSS = document.getElementById('main-css');
    if (mainCSS && !mainCSS.sheet) {
        console.warn('CSS principal nÃ£o carregado, tentando recarregar');
        const newLink = mainCSS.cloneNode();
        newLink.href = mainCSS.href + '?' + new Date().getTime();
        mainCSS.parentNode.replaceChild(newLink, mainCSS);
    }
}

// Verificar e corrigir problemas de carregamento do CSS
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    setTimeout(checkAndFixCSSLoadingIssues, 500);
    
    // Verificar novamente apÃ³s 2 segundos
    setTimeout(checkAndFixCSSLoadingIssues, 2000);
    
    // Verificar apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', checkAndFixCSSLoadingIssues);
    
    // Verificar periodicamente a cada 15 segundos
    setInterval(checkAndFixCSSLoadingIssues, 15000);
});

// FunÃ§Ã£o para verificar e isolar possÃ­veis conflitos com o Google Analytics
function checkAndIsolateGoogleAnalyticsConflicts() {
    // Verificar se o Google Analytics estÃ¡ carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics nÃ£o estÃ¡ carregado');
        return;
    }
    
    // Verificar se hÃ¡ conflitos com o carrossel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        // Salvar estado inicial
        const initialTransform = carousel.style.transform;
        const initialTransition = carousel.style.transition;
        
        // Tentar mover o carrossel
        carousel.style.transition = 'none'; // Remover transiÃ§Ã£o temporariamente
        carousel.style.transform = 'translateX(-50%)';
        
        // Verificar se o movimento foi aplicado
        setTimeout(() => {
            const currentTransform = carousel.style.transform;
            if (currentTransform !== 'translateX(-50%)') {
                console.warn('PossÃ­vel conflito com Google Analytics detectado - carrossel nÃ£o estÃ¡ se movendo corretamente');
            }
            
            // Restaurar estado inicial
            carousel.style.transform = initialTransform;
            carousel.style.transition = initialTransition;
        }, 50);
    }
}

// Verificar e isolar possÃ­veis conflitos com o Google Analytics
document.addEventListener('DOMContentLoaded', () => {
    // Verificar apÃ³s 5 segundos para garantir que o Google Analytics tenha carregado
    setTimeout(checkAndIsolateGoogleAnalyticsConflicts, 5000);
});

// FunÃ§Ã£o para forÃ§ar correÃ§Ã£o de dimensionamento das imagens do carrossel
function forceImageDimensionCorrection() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach(img => {
        // Adicionar classe para forÃ§ar correÃ§Ã£o de dimensionamento
        img.classList.add('fix-dimensions');
        
        // Aplicar estilos inline para garantir correÃ§Ã£o
        img.style.setProperty('max-width', '100%', 'important');
        img.style.setProperty('max-height', '100%', 'important');
        img.style.setProperty('width', 'auto', 'important');
        img.style.setProperty('height', 'auto', 'important');
        img.style.setProperty('object-fit', 'contain', 'important');
        
        // Verificar se a imagem estÃ¡ carregada
        if (img.complete && img.naturalWidth > 0) {
            console.log('Imagem corrigida:', img.src, img.naturalWidth, 'x', img.naturalHeight);
        }
    });
}

// ForÃ§ar correÃ§Ã£o de dimensionamento das imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // ForÃ§ar correÃ§Ã£o imediatamente
    forceImageDimensionCorrection();
    
    // ForÃ§ar correÃ§Ã£o novamente apÃ³s 1 segundo
    setTimeout(forceImageDimensionCorrection, 1000);
    
    // ForÃ§ar correÃ§Ã£o apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', forceImageDimensionCorrection);
    
    // ForÃ§ar correÃ§Ã£o periodicamente a cada 30 segundos
    setInterval(forceImageDimensionCorrection, 30000);
});

// FunÃ§Ã£o para verificar e corrigir problemas especÃ­ficos de dimensionamento do carrossel
function checkAndFixSpecificCarouselIssues() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    // Verificar se o carrossel existe
    if (!carouselContainer) {
        console.warn('ContÃªiner do carrossel nÃ£o encontrado');
        return;
    }
    
    // Corrigir altura do contÃªiner se necessÃ¡rio
    if (carouselContainer.offsetHeight === 0) {
        console.warn('Corrigindo altura do contÃªiner do carrossel');
        carouselContainer.style.height = '500px';
    }
    
    // Corrigir carrossel se necessÃ¡rio
    if (carousel) {
        // Verificar display
        if (window.getComputedStyle(carousel).display !== 'flex') {
            console.warn('Corrigindo display do carrossel');
            carousel.style.display = 'flex';
        }
        
        // Verificar transiÃ§Ã£o
        if (!carousel.style.transition || !carousel.style.transition.includes('transform')) {
            console.warn('Corrigindo transiÃ§Ã£o do carrossel');
            carousel.style.transition = 'transform 0.5s ease';
        }
    }
    
    // Corrigir slides se necessÃ¡rio
    carouselSlides.forEach((slide, index) => {
        // Verificar largura mÃ­nima
        if (window.getComputedStyle(slide).minWidth !== '100%') {
            console.warn('Corrigindo largura mÃ­nima do slide', index);
            slide.style.minWidth = '100%';
        }
        
        // Verificar altura
        if (window.getComputedStyle(slide).height !== '100%') {
            console.warn('Corrigindo altura do slide', index);
            slide.style.height = '100%';
        }
        
        // Verificar flex-shrink
        if (window.getComputedStyle(slide).flexShrink !== '0') {
            console.warn('Corrigindo flex-shrink do slide', index);
            slide.style.flexShrink = '0';
        }
        
        // Verificar display
        if (window.getComputedStyle(slide).display !== 'flex') {
            console.warn('Corrigindo display do slide', index);
            slide.style.display = 'flex';
        }
    });
    
    // Corrigir imagens se necessÃ¡rio
    carouselImages.forEach((img, index) => {
        // Verificar se a imagem estÃ¡ carregada
        if (img.complete && img.naturalWidth > 0) {
            // Verificar max-width
            if (window.getComputedStyle(img).maxWidth !== '100%') {
                console.warn('Corrigindo max-width da imagem', index);
                img.style.maxWidth = '100%';
            }
            
            // Verificar max-height
            if (window.getComputedStyle(img).maxHeight !== '100%') {
                console.warn('Corrigindo max-height da imagem', index);
                img.style.maxHeight = '100%';
            }
            
            // Verificar width
            if (window.getComputedStyle(img).width !== 'auto') {
                console.warn('Corrigindo width da imagem', index);
                img.style.width = 'auto';
            }
            
            // Verificar height
            if (window.getComputedStyle(img).height !== 'auto') {
                console.warn('Corrigindo height da imagem', index);
                img.style.height = 'auto';
            }
            
            // Verificar display
            if (window.getComputedStyle(img).display !== 'block') {
                console.warn('Corrigindo display da imagem', index);
                img.style.display = 'block';
            }
            
            // Verificar object-fit
            if (window.getComputedStyle(img).objectFit !== 'contain') {
                console.warn('Corrigindo object-fit da imagem', index);
                img.style.objectFit = 'contain';
            }
        }
    });
}

// Verificar e corrigir problemas especÃ­ficos do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    setTimeout(checkAndFixSpecificCarouselIssues, 1000);
    
    // Verificar novamente apÃ³s 3 segundos
    setTimeout(checkAndFixSpecificCarouselIssues, 3000);
    
    // Verificar apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', checkAndFixSpecificCarouselIssues);
    
    // Verificar periodicamente a cada 20 segundos
    setInterval(checkAndFixSpecificCarouselIssues, 20000);
});

// FunÃ§Ã£o para verificar e isolar possÃ­veis conflitos com bibliotecas externas
function checkAndIsolateExternalLibraryConflicts() {
    // Verificar se hÃ¡ bibliotecas externas que possam afetar o carrossel
    const externalScripts = document.querySelectorAll('script[src]');
    
    externalScripts.forEach(script => {
        console.log('Script externo carregado:', script.src);
    });
    
    // Verificar se o Google Analytics estÃ¡ carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics nÃ£o estÃ¡ carregado');
    }
    
    // Verificar se hÃ¡ conflitos com propriedades globais
    const originalTransform = document.body.style.transform;
    
    // Tentar aplicar uma transformaÃ§Ã£o temporÃ¡ria
    document.body.style.transform = 'translateX(0)';
    
    // Verificar se a transformaÃ§Ã£o foi aplicada
    setTimeout(() => {
        const currentTransform = document.body.style.transform;
        if (currentTransform !== 'translateX(0)') {
            console.warn('PossÃ­vel conflito com biblioteca externa detectado');
        }
        
        // Restaurar transformaÃ§Ã£o original
        document.body.style.transform = originalTransform;
    }, 100);
}

// Verificar e isolar possÃ­veis conflitos com bibliotecas externas
document.addEventListener('DOMContentLoaded', () => {
    // Verificar apÃ³s 5 segundos para garantir que todas as bibliotecas tenham carregado
    setTimeout(checkAndIsolateExternalLibraryConflicts, 5000);
});

// FunÃ§Ã£o para aplicar estilos de fallback completo
function applyFullFallbackStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    // Aplicar estilos de fallback ao contÃªiner
    if (carouselContainer) {
        carouselContainer.classList.add('fallback');
        carouselContainer.style.setProperty('height', '500px', 'important');
        carouselContainer.style.setProperty('overflow', 'hidden', 'important');
        carouselContainer.style.setProperty('position', 'relative', 'important');
        
        // Aplicar estilos de fallback ao carrossel
        if (carousel) {
            carousel.classList.add('fallback');
            carousel.style.setProperty('display', 'flex', 'important');
            carousel.style.setProperty('height', '100%', 'important');
            carousel.style.setProperty('width', '100%', 'important');
            carousel.style.setProperty('transition', 'transform 0.5s ease', 'important');
            
            // Aplicar estilos de fallback aos slides
            carouselSlides.forEach(slide => {
                slide.classList.add('fallback');
                slide.style.setProperty('min-width', '100%', 'important');
                slide.style.setProperty('height', '100%', 'important');
                slide.style.setProperty('flex-shrink', '0', 'important');
                slide.style.setProperty('display', 'flex', 'important');
                slide.style.setProperty('align-items', 'center', 'important');
                slide.style.setProperty('justify-content', 'center', 'important');
            });
            
            // Aplicar estilos de fallback Ã s imagens
            carouselImages.forEach(img => {
                img.classList.add('fallback');
                img.style.setProperty('max-width', '100%', 'important');
                img.style.setProperty('max-height', '100%', 'important');
                img.style.setProperty('width', 'auto', 'important');
                img.style.setProperty('height', 'auto', 'important');
                img.style.setProperty('display', 'block', 'important');
                img.style.setProperty('object-fit', 'contain', 'important');
            });
        }
    }
}

// Aplicar estilos de fallback completo
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar imediatamente
    applyFullFallbackStyles();
    
    // Aplicar novamente apÃ³s 2 segundos
    setTimeout(applyFullFallbackStyles, 2000);
    
    // Aplicar apÃ³s o carregamento completo da pÃ¡gina
    window.addEventListener('load', applyFullFallbackStyles);
    
    // Aplicar periodicamente a cada 30 segundos
    setInterval(applyFullFallbackStyles, 30000);
});

// FunÃ§Ã£o para verificar e corrigir o dimensionamento das imagens
function checkImageDimensions() {
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach(img => {
        // Verificar se a imagem estÃ¡ carregada
        if (img.complete) {
            console.log('Imagem carregada:', img.src, 'DimensÃµes:', img.naturalWidth, 'x', img.naturalHeight);
            
            // Verificar se a imagem Ã© muito grande
            if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
                console.warn('Imagem muito grande, aplicando correÃ§Ã£o:', img.src);
                img.classList.add('large-image');
            }
            
            // Verificar se a imagem Ã© muito pequena
            if (img.naturalWidth < 100 && img.naturalHeight < 100) {
                console.warn('Imagem muito pequena, aplicando correÃ§Ã£o:', img.src);
                img.classList.add('small-image');
            }
        } else {
            // Adicionar listener para quando a imagem carregar
            img.addEventListener('load', function() {
                console.log('Imagem carregada:', this.src, 'DimensÃµes:', this.naturalWidth, 'x', this.naturalHeight);
                
                // Verificar dimensÃµes
                if (this.naturalWidth > 2000 || this.naturalHeight > 2000) {
                    console.warn('Imagem muito grande, aplicando correÃ§Ã£o:', this.src);
                    this.classList.add('large-image');
                }
                
                if (this.naturalWidth < 100 && this.naturalHeight < 100) {
                    console.warn('Imagem muito pequena, aplicando correÃ§Ã£o:', this.src);
                    this.classList.add('small-image');
                }
            });
            
            // Adicionar listener para erro no carregamento
            img.addEventListener('error', function() {
                console.error('Erro ao carregar imagem:', this.src);
                this.classList.add('image-error');
            });
        }
    });
}

// Verificar dimensÃµes das imagens quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkImageDimensions, 1000);
});

// FunÃ§Ã£o para verificar se o carrossel estÃ¡ funcionando corretamente
function checkCarouselFunctionality() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (!carousel || slides.length === 0) {
        console.warn('Carrossel nÃ£o encontrado ou sem slides');
        return false;
    }
    
    // Verificar se o carrossel tem a propriedade transform
    const carouselStyle = window.getComputedStyle(carousel);
    if (!carouselStyle.transform) {
        console.warn('Carrossel nÃ£o tem propriedade transform');
        return false;
    }
    
    // Verificar se os slides tÃªm as propriedades corretas
    let allSlidesCorrect = true;
    slides.forEach((slide, index) => {
        const slideStyle = window.getComputedStyle(slide);
        if (slideStyle.minWidth !== '100%' && slideStyle.minWidth !== '100vw') {
            console.warn('Slide', index, 'nÃ£o tem largura mÃ­nima correta');
            allSlidesCorrect = false;
        }
        
        if (slideStyle.height !== '500px' && slideStyle.height !== '100%') {
            console.warn('Slide', index, 'nÃ£o tem altura correta');
            allSlidesCorrect = false;
        }
    });
    
    if (allSlidesCorrect) {
        console.log('Todos os slides estÃ£o configurados corretamente');
    }
    
    return true;
}

// Verificar funcionamento do carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkCarouselFunctionality, 2000);
});

// ImplementaÃ§Ã£o do carrossel
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando carrossel...');
    
    // Selecionar elementos do carrossel
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    // Verificar se o carrossel existe
    if (!carousel || slides.length === 0) {
        console.warn('Carrossel nÃ£o encontrado ou sem slides');
        return;
    }
    
    console.log('Carrossel encontrado com', slides.length, 'slides');
    
    let currentIndex = 0;
    let autoPlayInterval;
    const slideCount = slides.length;
    
    // FunÃ§Ã£o para atualizar o carrossel
    function updateCarousel() {
        console.log('Atualizando carrossel para slide', currentIndex);
        
        // Calcular a posiÃ§Ã£o de transformaÃ§Ã£o
        const translateX = -currentIndex * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar classes ativas dos slides
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Atualizar indicadores
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }
    
    // FunÃ§Ã£o para testar se o carrossel estÃ¡ funcionando
    function testCarousel() {
        console.log('Testando funcionamento do carrossel...');
        
        // Salvar estado inicial
        const initialTransform = carousel.style.transform;
        
        // Tentar mover o carrossel
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(-50%)';
        
        // Verificar se o movimento foi aplicado
        setTimeout(() => {
            const currentTransform = carousel.style.transform;
            if (currentTransform === 'translateX(-50%)') {
                console.log('Carrossel estÃ¡ funcionando corretamente');
            } else {
                console.warn('Problema detectado no funcionamento do carrossel');
            }
            
            // Restaurar estado inicial
            carousel.style.transform = initialTransform;
            carousel.style.transition = 'transform 0.5s ease';
        }, 100);
    }
    
    // FunÃ§Ã£o para ir para o prÃ³ximo slide
    function nextSlide() {
        console.log('PrÃ³ximo slide');
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    // FunÃ§Ã£o para verificar se hÃ¡ problemas com a inicializaÃ§Ã£o do carrossel
    function checkCarouselInitialization() {
        const carousel = document.querySelector('.carousel');
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!carousel) {
            console.error('Carrossel nÃ£o encontrado');
            return;
        }
        
        if (slides.length === 0) {
            console.error('Nenhum slide encontrado');
            return;
        }
        
        if (indicators.length === 0) {
            console.warn('Nenhum indicador encontrado');
        }
        
        console.log('Carrossel inicializado com sucesso');
        console.log('Slides:', slides.length);
        console.log('Indicadores:', indicators.length);
        
        // Verificar se o primeiro slide tem a classe active
        if (slides[0] && slides[0].classList.contains('active')) {
            console.log('Primeiro slide estÃ¡ ativo');
        } else {
            console.warn('Primeiro slide nÃ£o estÃ¡ ativo');
        }
        
        // Verificar se o primeiro indicador tem a classe active
        if (indicators[0] && indicators[0].classList.contains('active')) {
            console.log('Primeiro indicador estÃ¡ ativo');
        } else {
            console.warn('Primeiro indicador nÃ£o estÃ¡ ativo');
        }
    }
    
    // FunÃ§Ã£o para ir para o slide anterior
    function prevSlide() {
        console.log('Slide anterior');
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // FunÃ§Ã£o para ir para um slide especÃ­fico
    function goToSlide(index) {
        console.log('Ir para slide', index);
        if (index >= 0 && index < slideCount) {
            currentIndex = index;
            updateCarousel();
        }
    }
    
    // Iniciar autoplay
    function startAutoPlay() {
        console.log('Iniciando autoplay');
        stopAutoPlay(); // Parar autoplay existente se houver
        autoPlayInterval = setInterval(nextSlide, 5000); // Mudar a cada 5 segundos
    }
    
    // Parar autoplay
    function stopAutoPlay() {
        console.log('Parando autoplay');
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Adicionar event listeners aos botÃµes
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('BotÃ£o prÃ³ximo clicado');
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('BotÃ£o anterior clicado');
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }
    
    // Adicionar event listeners aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            console.log('Indicador', index, 'clicado');
            stopAutoPlay();
            goToSlide(parseInt(this.getAttribute('data-slide')));
            startAutoPlay();
        });
    });
    
    // Pausar autoplay quando o mouse estiver sobre o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            console.log('Mouse entrou no carrossel');
            stopAutoPlay();
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            console.log('Mouse saiu do carrossel');
            startAutoPlay();
        });
    }
    
    // Inicializar o carrossel
    console.log('Inicializando carrossel...');
    updateCarousel();
    
    // Testar funcionamento do carrossel
    setTimeout(testCarousel, 2000);
    
    // Iniciar autoplay
    startAutoPlay();
    
    // Adicionar suporte para teclas de seta
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            console.log('Seta esquerda pressionada');
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            console.log('Seta direita pressionada');
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });
    
    // Verificar se o carrossel estÃ¡ funcionando corretamente
    setTimeout(() => {
        console.log('Carrossel inicializado com', slideCount, 'slides');
        // Verificar se o primeiro slide estÃ¡ ativo
        if (slides[0] && !slides[0].classList.contains('active')) {
            console.warn('Primeiro slide nÃ£o estÃ¡ ativo, corrigindo...');
            currentIndex = 0;
            updateCarousel();
        }
    }, 1000);
});

// FunÃ§Ã£o para forÃ§ar a aplicaÃ§Ã£o de estilos crÃ­ticos
function forceCriticalStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (carouselContainer) {
        // ForÃ§ar altura do contÃªiner
        carouselContainer.style.height = '500px';
        carouselContainer.style.overflow = 'hidden';
        carouselContainer.style.position = 'relative';
        
        if (carousel) {
            // ForÃ§ar display do carrossel
            carousel.style.display = 'flex';
            carousel.style.transition = 'transform 0.5s ease';
            carousel.style.height = '100%';
            carousel.style.width = '100%';
            
            // ForÃ§ar estilos dos slides
            slides.forEach(slide => {
                slide.style.minWidth = '100%';
                slide.style.height = '100%';
                slide.style.flexShrink = '0';
                slide.style.display = 'flex';
                slide.style.alignItems = 'center';
                slide.style.justifyContent = 'center';
            });
            
            // ForÃ§ar estilos das imagens
            images.forEach(img => {
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.style.display = 'block';
                img.style.objectFit = 'contain';
            });
        }
    }
}

// ForÃ§ar aplicaÃ§Ã£o de estilos crÃ­ticos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(forceCriticalStyles, 1000);
    setTimeout(forceCriticalStyles, 3000);
    setTimeout(forceCriticalStyles, 5000);
});

// FunÃ§Ã£o para verificar e corrigir problemas de dimensionamento
function checkAndFixSizingIssues() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (!carouselContainer) {
        console.warn('ContÃªiner do carrossel nÃ£o encontrado');
        return;
    }
    
    // Verificar altura do contÃªiner
    if (carouselContainer.offsetHeight === 0) {
        console.warn('Altura do contÃªiner do carrossel Ã© zero, corrigindo...');
        carouselContainer.style.height = '500px';
    }
    
    if (carousel) {
        // Verificar display do carrossel
        const carouselDisplayStyle = window.getComputedStyle(carousel).display;
        if (carouselDisplayStyle !== 'flex') {
            console.warn('Display do carrossel nÃ£o Ã© flex, corrigindo...');
            carousel.style.display = 'flex';
        }
        
        // Verificar altura do carrossel
        if (carousel.offsetHeight === 0) {
            console.warn('Altura do carrossel Ã© zero, corrigindo...');
            carousel.style.height = '100%';
        }
    }
    
    // Verificar slides
    slides.forEach((slide, index) => {
        // Verificar largura mÃ­nima
        const slideMinWidth = window.getComputedStyle(slide).minWidth;
        if (slideMinWidth !== '100%' && slideMinWidth !== '100vw') {
            console.warn('Largura mÃ­nima do slide', index, 'incorreta, corrigindo...');
            slide.style.minWidth = '100%';
        }
        
        // Verificar altura
        if (slide.offsetHeight === 0) {
            console.warn('Altura do slide', index, 'Ã© zero, corrigindo...');
            slide.style.height = '100%';
        }
    });
    
    // Verificar imagens
    images.forEach((img, index) => {
        // Verificar se a imagem estÃ¡ carregada
        if (img.complete && img.naturalWidth > 0) {
            // Verificar max-width
            const imgMaxWidth = window.getComputedStyle(img).maxWidth;
            if (imgMaxWidth !== '100%') {
                console.warn('Max-width da imagem', index, 'incorreta, corrigindo...');
                img.style.maxWidth = '100%';
            }
            
            // Verificar max-height
            const imgMaxHeight = window.getComputedStyle(img).maxHeight;
            if (imgMaxHeight !== '100%') {
                console.warn('Max-height da imagem', index, 'incorreta, corrigindo...');
                img.style.maxHeight = '100%';
            }
            
            // Verificar object-fit
            const imgObjectFit = window.getComputedStyle(img).objectFit;
            if (imgObjectFit !== 'contain') {
                console.warn('Object-fit da imagem', index, 'incorreto, corrigindo...');
                img.style.objectFit = 'contain';
            }
        }
    });
}

// Verificar e corrigir problemas de dimensionamento
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkAndFixSizingIssues, 1500);
    setTimeout(checkAndFixSizingIssues, 3500);
    setTimeout(checkAndFixSizingIssues, 6000);
});

// FunÃ§Ã£o para verificar se hÃ¡ conflitos com outras bibliotecas
function checkForLibraryConflicts() {
    // Verificar se hÃ¡ conflitos com jQuery
    if (typeof jQuery !== 'undefined') {
        console.log('jQuery detectado, versÃ£o:', jQuery.fn.jquery);
    }
    
    // Verificar se hÃ¡ conflitos com outras bibliotecas
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        console.log('Script carregado:', script.src);
    });
    
    // Verificar se hÃ¡ conflitos com propriedades globais
    const originalTransform = document.body.style.transform;
    
    // Tentar aplicar uma transformaÃ§Ã£o temporÃ¡ria
    document.body.style.transform = 'translateX(0)';
    
    // Verificar se a transformaÃ§Ã£o foi aplicada
    setTimeout(() => {
        const currentTransform = document.body.style.transform;
        if (currentTransform !== 'translateX(0)') {
            console.warn('PossÃ­vel conflito com biblioteca externa detectado');
        }
        
        // Restaurar transformaÃ§Ã£o original
        document.body.style.transform = originalTransform;
    }, 100);
}

// Verificar conflitos com bibliotecas
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkForLibraryConflicts, 4000);
});

// FunÃ§Ã£o para verificar se o carrossel estÃ¡ visÃ­vel na tela
function isCarouselVisible() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return false;
    
    const rect = carouselContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Verificar se o carrossel estÃ¡ na viewport
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// FunÃ§Ã£o para verificar se o carrossel estÃ¡ funcionando corretamente
function verifyCarouselOperation() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) {
        console.warn('Carrossel nÃ£o encontrado');
        return;
    }
    
    // Salvar estado inicial
    const initialTransform = carousel.style.transform;
    
    // Tentar mover o carrossel
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(-50%)';
    
    // Verificar se o movimento foi aplicado
    setTimeout(() => {
        const currentTransform = carousel.style.transform;
        if (currentTransform === 'translateX(-50%)') {
            console.log('Carrossel estÃ¡ funcionando corretamente');
        } else {
            console.warn('Problema detectado no funcionamento do carrossel');
        }
        
        // Restaurar estado inicial
        carousel.style.transform = initialTransform;
        carousel.style.transition = 'transform 0.5s ease';
    }, 100);
}

// Verificar operaÃ§Ã£o do carrossel
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('Carrossel estÃ¡ visÃ­vel na tela:', isCarouselVisible());
        verifyCarouselOperation();
    }, 5000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o carregamento completo da pÃ¡gina
function checkPageLoadComplete() {
    console.log('PÃ¡gina carregada completamente');
    
    // Verificar se todos os elementos do carrossel estÃ£o presentes
    const carouselElements = {
        container: document.querySelector('.carousel-container'),
        carousel: document.querySelector('.carousel'),
        slides: document.querySelectorAll('.carousel-slide'),
        images: document.querySelectorAll('.carousel-slide img'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        indicators: document.querySelectorAll('.indicator')
    };
    
    Object.keys(carouselElements).forEach(key => {
        if (carouselElements[key]) {
            console.log('Elemento', key, 'encontrado');
        } else {
            console.warn('Elemento', key, 'nÃ£o encontrado');
        }
    });
    
    // Verificar se o carrossel estÃ¡ funcionando corretamente
    setTimeout(finalCarouselVerification, 2000);
}

// Verificar carregamento completo da pÃ¡gina
window.addEventListener('load', function() {
    setTimeout(checkPageLoadComplete, 5000);
});

// FunÃ§Ã£o para verificaÃ§Ã£o final do carrossel
function finalCarouselVerification() {
    console.log('Executando verificaÃ§Ã£o final do carrossel...');
    
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (!carousel) {
        console.error('Carrossel nÃ£o encontrado na verificaÃ§Ã£o final');
        return;
    }
    
    // Verificar se hÃ¡ slides suficientes
    if (slides.length < 2) {
        console.warn('NÃºmero insuficiente de slides para carrossel');
        return;
    }
    
    // Verificar se as imagens estÃ£o carregadas
    let allImagesLoaded = true;
    images.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn('Imagem', index, 'nÃ£o carregada corretamente:', img.src);
            allImagesLoaded = false;
        }
    });
    
    if (allImagesLoaded) {
        console.log('Todas as imagens carregadas corretamente');
    } else {
        console.warn('Algumas imagens nÃ£o foram carregadas corretamente');
        // Tentar recarregar as imagens
        setTimeout(() => {
            images.forEach(img => {
                if (!img.complete || img.naturalWidth === 0) {
                    const originalSrc = img.src;
                    img.src = '';
                    setTimeout(() => {
                        img.src = originalSrc;
                    }, 100);
                }
            });
        }, 1000);
    }
    
    // Verificar estilos crÃ­ticos
    checkCriticalStyles();
    
    // Verificar se o carrossel estÃ¡ se movendo corretamente
    testCarouselMovement();
}

// FunÃ§Ã£o para verificar estilos crÃ­ticos
function checkCriticalStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        // ForÃ§ar altura do contÃªiner
        if (!carouselContainer.style.height || carouselContainer.style.height === '0px') {
            carouselContainer.style.height = '500px';
        }
        
        // Verificar se o contÃªiner tem overflow hidden
        if (window.getComputedStyle(carouselContainer).overflow !== 'hidden') {
            carouselContainer.style.overflow = 'hidden';
        }
    }
    
    if (carousel) {
        // Verificar display do carrossel
        if (window.getComputedStyle(carousel).display !== 'flex') {
            carousel.style.display = 'flex';
        }
        
        // Verificar transiÃ§Ã£o
        if (!carousel.style.transition) {
            carousel.style.transition = 'transform 0.5s ease';
        }
    }
    
    // Verificar slides
    slides.forEach((slide, index) => {
        // Verificar largura mÃ­nima
        if (window.getComputedStyle(slide).minWidth !== '100%') {
            slide.style.minWidth = '100%';
        }
        
        // Verificar altura
        if (window.getComputedStyle(slide).height !== '100%') {
            slide.style.height = '100%';
        }
        
        // Verificar flex-shrink
        if (window.getComputedStyle(slide).flexShrink !== '0') {
            slide.style.flexShrink = '0';
        }
    });
}

// FunÃ§Ã£o para testar o movimento do carrossel
function testCarouselMovement() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    // Salvar estado inicial
    const initialTransform = carousel.style.transform || 'translateX(0%)';
    
    // Tentar mover o carrossel
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(-50%)';
    
    // Verificar se o movimento foi aplicado
    setTimeout(() => {
        const currentTransform = carousel.style.transform;
        if (currentTransform === 'translateX(-50%)') {
            console.log('MovimentaÃ§Ã£o do carrossel estÃ¡ funcionando corretamente');
        } else {
            console.warn('Problema detectado na movimentaÃ§Ã£o do carrossel');
        }
        
        // Restaurar estado inicial
        carousel.style.transform = initialTransform;
        carousel.style.transition = 'transform 0.5s ease';
    }, 100);
}

// FunÃ§Ã£o para aplicar correÃ§Ãµes de emergÃªncia caso o carrossel pare de funcionar
function emergencyCarouselFix() {
    console.log('Aplicando correÃ§Ãµes de emergÃªncia ao carrossel...');
    
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    // Aplicar estilos de emergÃªncia ao contÃªiner
    if (carouselContainer) {
        carouselContainer.style.height = '500px';
        carouselContainer.style.overflow = 'hidden';
        carouselContainer.style.position = 'relative';
        carouselContainer.classList.add('emergency-fix');
    }
    
    // Aplicar estilos de emergÃªncia ao carrossel
    if (carousel) {
        carousel.style.display = 'flex';
        carousel.style.height = '100%';
        carousel.style.width = '100%';
        carousel.style.transition = 'transform 0.5s ease';
        carousel.classList.add('emergency-fix');
    }
    
    // Aplicar estilos de emergÃªncia aos slides
    slides.forEach(slide => {
        slide.style.minWidth = '100%';
        slide.style.height = '100%';
        slide.style.flexShrink = '0';
        slide.style.display = 'flex';
        slide.style.alignItems = 'center';
        slide.style.justifyContent = 'center';
        slide.classList.add('emergency-fix');
    });
    
    // Aplicar estilos de emergÃªncia Ã s imagens
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.objectFit = 'contain';
        img.classList.add('emergency-fix');
    });
    
    console.log('CorreÃ§Ãµes de emergÃªncia aplicadas');
}

// Aplicar correÃ§Ãµes de emergÃªncia apÃ³s 30 segundos se o carrossel ainda nÃ£o estiver funcionando
window.addEventListener('load', function() {
    setTimeout(() => {
        // Verificar se o carrossel estÃ¡ funcionando
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            // Salvar estado inicial
            const initialTransform = carousel.style.transform || 'translateX(0%)';
            
            // Tentar mover o carrossel
            carousel.style.transition = 'none';
            carousel.style.transform = 'translateX(-10%)';
            
            // Verificar se o movimento foi aplicado
            setTimeout(() => {
                const currentTransform = carousel.style.transform;
                if (currentTransform !== 'translateX(-10%)') {
                    console.warn('Carrossel nÃ£o estÃ¡ funcionando corretamente, aplicando correÃ§Ãµes de emergÃªncia');
                    emergencyCarouselFix();
                } else {
                    console.log('Carrossel estÃ¡ funcionando corretamente');
                }
                
                // Restaurar estado inicial
                carousel.style.transform = initialTransform;
                carousel.style.transition = 'transform 0.5s ease';
            }, 100);
        }
    }, 30000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com os indicadores
function checkIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    
    if (indicators.length > 0) {
        console.log('Indicadores encontrados:', indicators.length);
        
        // Verificar se todos os indicadores tÃªm data-slide
        indicators.forEach((indicator, index) => {
            const slideIndex = indicator.getAttribute('data-slide');
            if (!slideIndex) {
                console.warn('Indicador', index, 'nÃ£o tem atributo data-slide');
            } else {
                console.log('Indicador', index, 'data-slide:', slideIndex);
            }
        });
    } else {
        console.warn('Nenhum indicador encontrado');
    }
}

// Verificar indicadores
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkIndicators, 13000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o nÃºmero de slides
function checkSlideCount() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    console.log('NÃºmero de slides:', slides.length);
    console.log('NÃºmero de indicadores:', indicators.length);
    
    // Verificar se o nÃºmero de slides corresponde ao nÃºmero de indicadores
    if (slides.length !== indicators.length) {
        console.warn('NÃºmero de slides e indicadores nÃ£o correspondem');
    }
    
    // Verificar se hÃ¡ slides suficientes
    if (slides.length < 2) {
        console.warn('NÃºmero insuficiente de slides para carrossel');
    }
}

// Verificar nÃºmero de slides
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkSlideCount, 14000);
});

// Verificar carregamento do JavaScript
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        console.log('Verificando carregamento do JavaScript...');
        
        // Verificar se todas as funÃ§Ãµes necessÃ¡rias estÃ£o disponÃ­veis
        const requiredFunctions = [
            'applyFullFallbackStyles',
            'checkImageDimensions',
            'checkCarouselFunctionality',
            'checkImageSizing',
            'checkImageLoading',
            'checkCSSIssues',
            'checkResponsiveSizing',
            'checkAutoplayFunctionality',
            'checkNavigationButtons',
            'checkIndicators',
            'checkSlideCount',
            'checkCarouselInitialization',
            'checkImageSizingAtDifferentResolutions',
            'checkCSSLoading'
        ];
        
        requiredFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                console.log('FunÃ§Ã£o', funcName, 'disponÃ­vel');
            } else {
                console.warn('FunÃ§Ã£o', funcName, 'nÃ£o disponÃ­vel');
            }
        });
    }, 18000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o carregamento completo da pÃ¡gina
function checkPageLoadComplete() {
    console.log('PÃ¡gina carregada completamente');
    
    // Verificar se todos os elementos do carrossel estÃ£o presentes
    const carouselElements = {
        container: document.querySelector('.carousel-container'),
        carousel: document.querySelector('.carousel'),
        slides: document.querySelectorAll('.carousel-slide'),
        images: document.querySelectorAll('.carousel-slide img'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        indicators: document.querySelectorAll('.indicator')
    };
    
    Object.keys(carouselElements).forEach(key => {
        if (carouselElements[key]) {
            console.log('Elemento', key, 'encontrado');
        } else {
            console.warn('Elemento', key, 'nÃ£o encontrado');
        }
    });
    
    // Verificar se o carrossel estÃ¡ funcionando corretamente
    setTimeout(finalCarouselVerification, 2000);
}

// Verificar carregamento completo da pÃ¡gina
window.addEventListener('load', function() {
    setTimeout(checkPageLoadComplete, 5000);
});

// FunÃ§Ã£o para verificaÃ§Ã£o final do carrossel
function finalCarouselVerification() {
    console.log('Executando verificaÃ§Ã£o final do carrossel...');
    
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (!carousel) {
        console.error('Carrossel nÃ£o encontrado na verificaÃ§Ã£o final');
        return;
    }
    
    // Verificar se hÃ¡ slides suficientes
    if (slides.length < 2) {
        console.warn('NÃºmero insuficiente de slides para carrossel');
        return;
    }
    
    // Verificar se as imagens estÃ£o carregadas
    let allImagesLoaded = true;
    images.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn('Imagem', index, 'nÃ£o carregada corretamente:', img.src);
            allImagesLoaded = false;
        }
    });
    
    if (allImagesLoaded) {
        console.log('Todas as imagens carregadas corretamente');
    } else {
        console.warn('Algumas imagens nÃ£o foram carregadas corretamente');
        // Tentar recarregar as imagens
        setTimeout(() => {
            images.forEach(img => {
                if (!img.complete || img.naturalWidth === 0) {
                    const originalSrc = img.src;
                    img.src = '';
                    setTimeout(() => {
                        img.src = originalSrc;
                    }, 100);
                }
            });
        }, 1000);
    }
    
    // Verificar estilos crÃ­ticos
    checkCriticalStyles();
    
    // Verificar se o carrossel estÃ¡ se movendo corretamente
    testCarouselMovement();
}

// FunÃ§Ã£o para verificar estilos crÃ­ticos
function checkCriticalStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        // ForÃ§ar altura do contÃªiner
        if (!carouselContainer.style.height || carouselContainer.style.height === '0px') {
            carouselContainer.style.height = '500px';
        }
        
        // Verificar se o contÃªiner tem overflow hidden
        if (window.getComputedStyle(carouselContainer).overflow !== 'hidden') {
            carouselContainer.style.overflow = 'hidden';
        }
    }
    
    if (carousel) {
        // Verificar display do carrossel
        if (window.getComputedStyle(carousel).display !== 'flex') {
            carousel.style.display = 'flex';
        }
        
        // Verificar transiÃ§Ã£o
        if (!carousel.style.transition) {
            carousel.style.transition = 'transform 0.5s ease';
        }
    }
    
    // Verificar slides
    slides.forEach((slide, index) => {
        // Verificar largura mÃ­nima
        if (window.getComputedStyle(slide).minWidth !== '100%') {
            slide.style.minWidth = '100%';
        }
        
        // Verificar altura
        if (window.getComputedStyle(slide).height !== '100%') {
            slide.style.height = '100%';
        }
        
        // Verificar flex-shrink
        if (window.getComputedStyle(slide).flexShrink !== '0') {
            slide.style.flexShrink = '0';
        }
    });
}

// FunÃ§Ã£o para testar o movimento do carrossel
function testCarouselMovement() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    // Salvar estado inicial
    const initialTransform = carousel.style.transform || 'translateX(0%)';
    
    // Tentar mover o carrossel
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(-50%)';
    
    // Verificar se o movimento foi aplicado
    setTimeout(() => {
        const currentTransform = carousel.style.transform;
        if (currentTransform === 'translateX(-50%)') {
            console.log('MovimentaÃ§Ã£o do carrossel estÃ¡ funcionando corretamente');
        } else {
            console.warn('Problema detectado na movimentaÃ§Ã£o do carrossel');
        }
        
        // Restaurar estado inicial
        carousel.style.transform = initialTransform;
        carousel.style.transition = 'transform 0.5s ease';
    }, 100);
}

// FunÃ§Ã£o para verificar se hÃ¡ conflitos com o Google Analytics
function checkGoogleAnalyticsConflicts() {
    console.log('Verificando possÃ­veis conflitos com Google Analytics...');
    
    // Verificar se o Google Analytics estÃ¡ carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics nÃ£o estÃ¡ carregado');
    }
    
    // Verificar se hÃ¡ conflitos com propriedades globais que possam afetar o carrossel
    const originalBodyTransform = document.body.style.transform;
    
    // Tentar aplicar uma transformaÃ§Ã£o temporÃ¡ria no body
    document.body.style.transform = 'translateX(0)';
    
    // Verificar se a transformaÃ§Ã£o foi aplicada
    setTimeout(() => {
        const currentBodyTransform = document.body.style.transform;
        if (currentBodyTransform !== 'translateX(0)') {
            console.warn('PossÃ­vel conflito com biblioteca externa detectado no body');
        }
        
        // Restaurar transformaÃ§Ã£o original
        document.body.style.transform = originalBodyTransform;
    }, 100);
}

// Verificar conflitos com Google Analytics apÃ³s o carregamento completo
window.addEventListener('load', function() {
    setTimeout(checkGoogleAnalyticsConflicts, 15000);
});

// FunÃ§Ã£o para verificar e corrigir problemas de carregamento de imagens
function checkAndFixImageLoading() {
    const images = document.querySelectorAll('.carousel-slide img');
    let issuesFound = false;
    
    images.forEach((img, index) => {
        // Verificar se a imagem estÃ¡ carregada
        if (!img.complete || img.naturalWidth === 0) {
            console.warn('Imagem', index, 'nÃ£o carregada:', img.src);
            issuesFound = true;
            
            // Adicionar classe de erro
            img.classList.add('image-error');
            
            // Tentar recarregar a imagem
            const originalSrc = img.src;
            img.src = '';
            setTimeout(() => {
                img.src = originalSrc;
            }, 200);
        } else {
            // Remover classe de erro se existir
            img.classList.remove('image-error');
            
            // Verificar dimensÃµes
            if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
                console.warn('Imagem', index, 'muito grande:', img.src);
                img.classList.add('large-image');
            }
        }
    });
    
    if (issuesFound) {
        console.log('Problemas de carregamento de imagens detectados, tentando corrigir...');
        setTimeout(checkAndFixImageLoading, 5000);
    } else {
        console.log('Todas as imagens carregadas corretamente');
    }
}

// Verificar carregamento de imagens periodicamente
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkAndFixImageLoading, 2000);
    setTimeout(checkAndFixImageLoading, 10000);
});

// Verificar tambÃ©m apÃ³s o carregamento completo da pÃ¡gina
window.addEventListener('load', function() {
    setTimeout(checkAndFixImageLoading, 5000);
});

// FunÃ§Ã£o para verificar se os nomes dos arquivos de imagem correspondem aos arquivos reais
function checkImageFileNames() {
    const images = document.querySelectorAll('.carousel-slide img');
    const expectedFiles = [
        'app-mockup.tela.png',
        'app-mockup.lista.png',
        'app-mockup.telalistas.png',
        'app-mockup.telacontrolefinanceiro.png',
        'app-mockup.telagastos.png',
        'app-mockup.configb.png',
        'app-mockup.telahistoricop.png',
        'app-mockup.telapainelescuro.png',
        'app-mockup.telaconfigescuro.png',
        'app-mockup.telafinalizandolistaescuro.png'
    ];
    
    console.log('Verificando nomes dos arquivos de imagem...');
    
    images.forEach((img, index) => {
        const src = img.getAttribute('src');
        if (src) {
            const fileName = src.split('/').pop();
            if (expectedFiles.includes(fileName)) {
                console.log('Arquivo', fileName, 'encontrado');
            } else {
                console.warn('Arquivo', fileName, 'nÃ£o encontrado na lista esperada');
            }
        }
    });
}

// Verificar nomes dos arquivos de imagem
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkImageFileNames, 3000);
});


// FunÃ§Ã£o para verificar se hÃ¡ problemas com o dimensionamento das imagens
function checkImageSizing() {
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach((img, index) => {
        // Verificar se a imagem estÃ¡ carregada
        if (img.complete && img.naturalWidth > 0) {
            console.log('Imagem', index, 'carregada:', img.src);
            console.log('DimensÃµes naturais:', img.naturalWidth, 'x', img.naturalHeight);
            console.log('DimensÃµes exibidas:', img.offsetWidth, 'x', img.offsetHeight);
            
            // Verificar se hÃ¡ distorÃ§Ã£o
            const naturalRatio = img.naturalWidth / img.naturalHeight;
            const displayRatio = img.offsetWidth / img.offsetHeight;
            
            if (Math.abs(naturalRatio - displayRatio) > 0.1) {
                console.warn('Imagem', index, 'pode estar distorcida');
                console.log('ProporÃ§Ã£o natural:', naturalRatio);
                console.log('ProporÃ§Ã£o exibida:', displayRatio);
            }
        } else {
            console.warn('Imagem', index, 'nÃ£o carregada:', img.src);
        }
    });
}

// Verificar dimensionamento das imagens
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkImageSizing, 7000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o dimensionamento das imagens em diferentes resoluÃ§Ãµes
function checkImageSizingAtDifferentResolutions() {
    const images = document.querySelectorAll('.carousel-slide img');
    
    // Verificar dimensionamento em diferentes resoluÃ§Ãµes
    const resolutions = [
        { width: 320, height: 568 },  // iPhone SE
        { width: 375, height: 667 },  // iPhone 6/7/8
        { width: 414, height: 736 },  // iPhone 6/7/8 Plus
        { width: 768, height: 1024 }, // iPad
        { width: 1024, height: 768 }, // iPad Landscape
        { width: 1200, height: 800 }  // Desktop
    ];
    
    resolutions.forEach(resolution => {
        console.log('Verificando dimensionamento para resoluÃ§Ã£o:', resolution.width, 'x', resolution.height);
        
        images.forEach((img, index) => {
            if (img.complete && img.naturalWidth > 0) {
                // Calcular proporÃ§Ã£o
                const naturalRatio = img.naturalWidth / img.naturalHeight;
                const containerRatio = resolution.width / resolution.height;
                
                console.log('Imagem', index, 'proporÃ§Ã£o natural:', naturalRatio);
                console.log('Imagem', index, 'proporÃ§Ã£o do contÃªiner:', containerRatio);
                
                // Verificar se hÃ¡ distorÃ§Ã£o significativa
                if (Math.abs(naturalRatio - containerRatio) > 0.5) {
                    console.warn('Imagem', index, 'pode ter distorÃ§Ã£o significativa na resoluÃ§Ã£o', resolution.width, 'x', resolution.height);
                }
            }
        });
    });
}

// Verificar dimensionamento das imagens em diferentes resoluÃ§Ãµes
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkImageSizingAtDifferentResolutions, 16000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o carrossel apÃ³s o carregamento completo
function checkCarouselAfterLoad() {
    console.log('Verificando carrossel apÃ³s carregamento completo...');
    
    // Verificar se o carrossel estÃ¡ funcionando corretamente
    const carousel = document.querySelector('.carousel');
    if (!carousel) {
        console.error('Carrossel nÃ£o encontrado apÃ³s carregamento completo');
        return;
    }
    
    // Verificar se o carrossel tem transformaÃ§Ã£o
    const transform = window.getComputedStyle(carousel).transform;
    console.log('TransformaÃ§Ã£o do carrossel:', transform);
    
    // Verificar se os slides estÃ£o posicionados corretamente
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        const slideTransform = window.getComputedStyle(slide).transform;
        console.log('TransformaÃ§Ã£o do slide', index, ':', slideTransform);
    });
    
    // Verificar se as imagens estÃ£o carregadas
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach((img, index) => {
        console.log('Imagem', index, 'carregada:', img.complete);
        console.log('Imagem', index, 'largura natural:', img.naturalWidth);
        console.log('Imagem', index, 'altura natural:', img.naturalHeight);
    });
}

// Verificar carrossel apÃ³s carregamento completo
window.addEventListener('load', function() {
    setTimeout(checkCarouselAfterLoad, 10000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o carregamento das imagens
function checkImageLoading() {
    const images = document.querySelectorAll('.carousel-slide img');
    let allImagesLoaded = true;

    images.forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
            allImagesLoaded = false;
            console.warn('Imagem nÃ£o carregada:', img.src);

            // Tentar recarregar a imagem
            const originalSrc = img.src;
            img.src = '';
            setTimeout(() => {
                img.src = originalSrc;
            }, 100);
        }
    });
    
    if (allImagesLoaded) {
        console.log('Todas as imagens do carrossel carregadas corretamente');
    }
    
    return allImagesLoaded;
}

// Verificar carregamento das imagens
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkImageLoading, 8000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o CSS
function checkCSSIssues() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
	
    if (!carouselContainer) {
        console.warn('ContÃªiner do carrossel nÃ£o encontrado');
        return;
    }
    
    // Verificar se o CSS estÃ¡ sendo aplicado corretamente
    const containerStyle = window.getComputedStyle(carouselContainer);
    console.log('Estilos do contÃªiner do carrossel:');
    console.log('Height:', containerStyle.height);
    console.log('Overflow:', containerStyle.overflow);
    console.log('Position:', containerStyle.position);
    
    if (carousel) {
        const carouselStyle = window.getComputedStyle(carousel);
        console.log('Estilos do carrossel:');
        console.log('Display:', carouselStyle.display);
        console.log('Transition:', carouselStyle.transition);
        console.log('Height:', carouselStyle.height);
        console.log('Width:', carouselStyle.width);
    }
    
    slides.forEach((slide, index) => {
        const slideStyle = window.getComputedStyle(slide);
        console.log('Estilos do slide', index, ':');
        console.log('Min-width:', slideStyle.minWidth);
        console.log('Height:', slideStyle.height);
        console.log('Flex-shrink:', slideStyle.flexShrink);
        console.log('Display:', slideStyle.display);
    });
    
    images.forEach((img, index) => {
        const imgStyle = window.getComputedStyle(img);
        console.log('Estilos da imagem', index, ':');
        console.log('Max-width:', imgStyle.maxWidth);
        console.log('Max-height:', imgStyle.maxHeight);
        console.log('Width:', imgStyle.width);
        console.log('Height:', imgStyle.height);
        console.log('Display:', imgStyle.display);
        console.log('Object-fit:', imgStyle.objectFit);
    });
    
    const containerWidth = carouselContainer.offsetWidth;
    const containerHeight = carouselContainer.offsetHeight;
    
    console.log('DimensÃµes do contÃªiner do carrossel:');
    console.log('Width:', containerWidth);
    console.log('Height:', containerHeight);
    
    // Verificar se as dimensÃµes sÃ£o adequadas
    if (containerWidth === 0 || containerHeight === 0) {
        console.warn('DimensÃµes do contÃªiner do carrossel sÃ£o zero');
    }
    
    
    // Verificar proporÃ§Ã£o
    const ratio = containerWidth / containerHeight;
    console.log('ProporÃ§Ã£o do contÃªiner:', ratio);
    
    // Verificar se estÃ¡ dentro de limites razoÃ¡veis
    if (ratio < 0.5 || ratio > 3) {
        console.warn('ProporÃ§Ã£o do contÃªiner pode ser inadequada');
    }
}

// Verificar problemas com o CSS
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkCSSIssues, 9000);
});

// FunÃ§Ã£o para verificar dimensionamento responsivo
function checkResponsiveSizing() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) {
        console.warn('ContÃªiner do carrossel nÃ£o encontrado');
        return;
    }
    
    const containerWidth = carouselContainer.offsetWidth;
    const containerHeight = carouselContainer.offsetHeight;
    
    console.log('DimensÃµes do contÃªiner do carrossel:');
    console.log('Width:', containerWidth);
    console.log('Height:', containerHeight);
    
    // Verificar se as dimensÃµes sÃ£o adequadas
    if (containerWidth === 0 || containerHeight === 0) {
        console.warn('DimensÃµes do contÃªiner do carrossel sÃ£o zero');
    }
    
    // Verificar proporÃ§Ã£o
    const ratio = containerWidth / containerHeight;
    console.log('ProporÃ§Ã£o do contÃªiner:', ratio);
    
    // Verificar se estÃ¡ dentro de limites razoÃ¡veis
    if (ratio < 0.5 || ratio > 3) {
        console.warn('ProporÃ§Ã£o do contÃªiner pode ser inadequada');
    }
}

// Verificar dimensionamento responsivo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkResponsiveSizing, 10000);
    
    // Verificar tambÃ©m apÃ³s redimensionamento da janela
    window.addEventListener('resize', function() {
        setTimeout(checkResponsiveSizing, 1000);
    });
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o autoplay
function checkAutoplayFunctionality() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    // Salvar estado inicial
    const initialTransform = carousel.style.transform;
    
    // Tentar mover o carrossel manualmente
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(-25%)';
    
    // Verificar se o movimento foi aplicado
    setTimeout(() => {
        const currentTransform = carousel.style.transform;
        if (currentTransform === 'translateX(-25%)') {
            console.log('MovimentaÃ§Ã£o manual do carrossel estÃ¡ funcionando');
        } else {
            console.warn('Problema detectado na movimentaÃ§Ã£o manual do carrossel');
        }
        
        // Restaurar estado inicial
        carousel.style.transform = initialTransform;
        carousel.style.transition = 'transform 0.5s ease';
    }, 100);
}

// Verificar funcionalidade do autoplay
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkAutoplayFunctionality, 11000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com os botÃµes de navegaÃ§Ã£o
function checkNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        console.log('BotÃ£o anterior encontrado');
        // Verificar se tem event listener
        // const prevListeners = getEventListeners(prevBtn);
        // console.log('Event listeners no botÃ£o anterior:', prevListeners);
    } else {
        console.warn('BotÃ£o anterior nÃ£o encontrado');
    }
    
    if (nextBtn) {
        console.log('BotÃ£o prÃ³ximo encontrado');
        // Verificar se tem event listener
        // const nextListeners = getEventListeners(nextBtn);
        // console.log('Event listeners no botÃ£o prÃ³ximo:', nextListeners);
    } else {
        console.warn('BotÃ£o prÃ³ximo nÃ£o encontrado');
    }
}

// Verificar botÃµes de navegaÃ§Ã£o
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkNavigationButtons, 12000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com os indicadores
function checkIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    
    if (indicators.length > 0) {
        console.log('Indicadores encontrados:', indicators.length);
        
        // Verificar se todos os indicadores tÃªm data-slide
        indicators.forEach((indicator, index) => {
            const slideIndex = indicator.getAttribute('data-slide');
            if (!slideIndex) {
                console.warn('Indicador', index, 'nÃ£o tem atributo data-slide');
            } else {
                console.log('Indicador', index, 'data-slide:', slideIndex);
            }
        });
    } else {
        console.warn('Nenhum indicador encontrado');
    }
}

// Verificar indicadores
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkIndicators, 13000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o nÃºmero de slides
function checkSlideCount() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    console.log('NÃºmero de slides:', slides.length);
    console.log('NÃºmero de indicadores:', indicators.length);
    
    // Verificar se o nÃºmero de slides corresponde ao nÃºmero de indicadores
    if (slides.length !== indicators.length) {
        console.warn('NÃºmero de slides e indicadores nÃ£o correspondem');
    }
    
    // Verificar se hÃ¡ slides suficientes
    if (slides.length < 2) {
        console.warn('NÃºmero insuficiente de slides para carrossel');
    }
}

// Verificar nÃºmero de slides
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkSlideCount, 14000);
});

// Verificar carregamento do JavaScript
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        console.log('Verificando carregamento do JavaScript...');
        
        // Verificar se todas as funÃ§Ãµes necessÃ¡rias estÃ£o disponÃ­veis
        const requiredFunctions = [
            'applyFullFallbackStyles',
            'checkImageDimensions',
            'checkCarouselFunctionality',
            'checkImageSizing',
            'checkImageLoading',
            'checkCSSIssues',
            'checkResponsiveSizing',
            'checkAutoplayFunctionality',
            'checkNavigationButtons',
            'checkIndicators',
            'checkSlideCount',
            'checkCarouselInitialization',
            'checkImageSizingAtDifferentResolutions',
            'checkCSSLoading'
        ];
        
        requiredFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                console.log('FunÃ§Ã£o', funcName, 'disponÃ­vel');
            } else {
                console.warn('FunÃ§Ã£o', funcName, 'nÃ£o disponÃ­vel');
            }
        });
    }, 18000);
});

// FunÃ§Ã£o para verificar se hÃ¡ problemas com o carregamento completo da pÃ¡gina
function checkPageLoadComplete() {
    console.log('PÃ¡gina carregada completamente');
    
    // Verificar se todos os elementos do carrossel estÃ£o presentes
    const carouselElements = {
        container: document.querySelector('.carousel-container'),
        carousel: document.querySelector('.carousel'),
        slides: document.querySelectorAll('.carousel-slide'),
        images: document.querySelectorAll('.carousel-slide img'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        indicators: document.querySelectorAll('.indicator')
    };
// FunÃ§Ã£o para verificar se hÃ¡ problemas com o carregamento completo da pÃ¡gina
function checkPageLoadComplete() {
    console.log('PÃ¡gina carregada completamente');
    
    // Verificar se todos os elementos do carrossel estÃ£o presentes
    const carouselElements = {
        container: document.querySelector('.carousel-container'),
        carousel: document.querySelector('.carousel'),
        slides: document.querySelectorAll('.carousel-slide'),
        images: document.querySelectorAll('.carousel-slide img'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        indicators: document.querySelectorAll('.indicator')
    };
    
    Object.keys(carouselElements).forEach(key => {
        if (carouselElements[key]) {
            console.log('Elemento', key, 'encontrado');
        } else {
            console.warn('Elemento', key, 'nÃ£o encontrado');
        }
    });
    
    // Verificar se o carrossel estÃ¡ funcionando corretamente
    setTimeout(finalCarouselVerification, 2000);
}

// Verificar carregamento completo da pÃ¡gina
window.addEventListener('load', function() {
    setTimeout(checkPageLoadComplete, 5000);
});

// FunÃ§Ã£o para verificaÃ§Ã£o final do carrossel
function finalCarouselVerification() {
    console.log('Executando verificaÃ§Ã£o final do carrossel...');
    
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (!carousel) {
        console.error('Carrossel nÃ£o encontrado na verificaÃ§Ã£o final');
        return;
    }
    
    // Verificar se hÃ¡ slides suficientes
    if (slides.length < 2) {
        console.warn('NÃºmero insuficiente de slides para carrossel');
        return;
    }
    
    // Verificar se as imagens estÃ£o carregadas
    let allImagesLoaded = true;
    images.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn('Imagem', index, 'nÃ£o carregada corretamente:', img.src);
            allImagesLoaded = false;
        }
    });
    
    if (allImagesLoaded) {
        console.log('Todas as imagens carregadas corretamente');
    } else {
        console.warn('Algumas imagens nÃ£o foram carregadas corretamente');
        // Tentar recarregar as imagens
        setTimeout(() => {
            images.forEach(img => {
                if (!img.complete || img.naturalWidth === 0) {
                    const originalSrc = img.src;
                    img.src = '';
                    setTimeout(() => {
                        img.src = originalSrc;
                    }, 100);
                }
            });
        }, 1000);
    }
    
    // Verificar estilos crÃ­ticos
    checkCriticalStyles();
    
    // Verificar se o carrossel estÃ¡ se movendo corretamente
    testCarouselMovement();
}

// FunÃ§Ã£o para verificar estilos crÃ­ticos
function checkCriticalStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        // ForÃ§ar altura do contÃªiner
        if (!carouselContainer.style.height || carouselContainer.style.height === '0px') {
            carouselContainer.style.height = '500px';
        }
        
        // Verificar se o contÃªiner tem overflow hidden
        if (window.getComputedStyle(carouselContainer).overflow !== 'hidden') {
            carouselContainer.style.overflow = 'hidden';
        }
    }
    
    if (carousel) {
        // Verificar display do carrossel
        if (window.getComputedStyle(carousel).display !== 'flex') {
            carousel.style.display = 'flex';
        }
        
        // Verificar transiÃ§Ã£o
        if (!carousel.style.transition) {
            carousel.style.transition = 'transform 0.5s ease';
        }
    }
    
    // Verificar slides
    slides.forEach((slide, index) => {
        // Verificar largura mÃ­nima
        if (window.getComputedStyle(slide).minWidth !== '100%') {
            slide.style.minWidth = '100%';
        }
        
        // Verificar altura
        if (window.getComputedStyle(slide).height !== '100%') {
            slide.style.height = '100%';
        }
        
        // Verificar flex-shrink
        if (window.getComputedStyle(slide).flexShrink !== '0') {
            slide.style.flexShrink = '0';
        }
    });
}

// FunÃ§Ã£o para testar o movimento do carrossel
function testCarouselMovement() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    // Salvar estado inicial
    const initialTransform = carousel.style.transform || 'translateX(0%)';
    
    // Tentar mover o carrossel
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(-50%)';
    
    // Verificar se o movimento foi aplicado
    setTimeout(() => {
        const currentTransform = carousel.style.transform;
        if (currentTransform === 'translateX(-50%)') {
            console.log('MovimentaÃ§Ã£o do carrossel estÃ¡ funcionando corretamente');
        } else {
            console.warn('Problema detectado na movimentaÃ§Ã£o do carrossel');
        }
        
        // Restaurar estado inicial
        carousel.style.transform = initialTransform;
        carousel.style.transition = 'transform 0.5s ease';
    }, 100);
}

// FunÃ§Ã£o para verificar se hÃ¡ conflitos com o Google Analytics
function checkGoogleAnalyticsConflicts() {
    console.log('Verificando possÃ­veis conflitos com Google Analytics...');
    
    // Verificar se o Google Analytics estÃ¡ carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics nÃ£o estÃ¡ carregado');
    }
    
    // Verificar se hÃ¡ conflitos com propriedades globais que possam afetar o carrossel
    const originalBodyTransform = document.body.style.transform;
    
    // Tentar aplicar uma transformaÃ§Ã£o temporÃ¡ria no body
    document.body.style.transform = 'translateX(0)';
    
    // Verificar se a transformaÃ§Ã£o foi aplicada
    setTimeout(() => {
        const currentBodyTransform = document.body.style.transform;
        if (currentBodyTransform !== 'translateX(0)') {
            console.warn('PossÃ­vel conflito com biblioteca externa detectado no body');
        }
        
        // Restaurar transformaÃ§Ã£o original
        document.body.style.transform = originalBodyTransform;
    }, 100);
}

// Verificar conflitos com Google Analytics apÃ³s o carregamento completo
window.addEventListener('load', function() {
    setTimeout(checkGoogleAnalyticsConflicts, 15000);
});
}
