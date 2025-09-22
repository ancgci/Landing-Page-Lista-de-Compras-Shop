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

// Função para animar elementos quando entram na viewport
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

// Inicializar animações
document.addEventListener('DOMContentLoaded', () => {
    // Configurar animações iniciais
    const animatedElements = document.querySelectorAll('.feature-card, .step');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Executar animação na carga inicial
    animateOnScroll();
});

// Executar animações ao rolar
window.addEventListener('scroll', animateOnScroll);

// Função para lidar com o envio do formulário de contato
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Mostrar feedback visual durante o envio
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Permitir que o formulário seja enviado normalmente para o PHP
    // O PHP cuidará do envio do email
});

// Função para atualizar o ano no footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
});

// Função para fechar mensagens de alerta (se houver)
function closeAlert(element) {
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.display = 'none';
    }, 300);
}

// Função para pré-carregar imagens
function preloadImages(imageSources) {
    imageSources.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = function() {
            console.log('Imagem pré-carregada:', src);
        };
        img.onerror = function() {
            console.warn('Erro ao pré-carregar imagem:', src);
        };
    });
}

// Pré-carregar imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const imageSources = Array.from(carouselImages).map(img => img.src);
    preloadImages(imageSources);
});

// Função para verificar se o CSS foi carregado corretamente
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
                    console.warn('CSS não carregado corretamente ou não aplicado');
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

// Função para verificar se as imagens do carrossel estão carregando corretamente
function checkCarouselImages() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    let allImagesLoaded = true;
    
    carouselImages.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn(`Imagem do carrossel ${index} não carregada corretamente:`, img.src);
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
    
    // Verificar novamente após 5 segundos
    setTimeout(checkCarouselImages, 5000);
});

// Função para ajustar o tamanho das imagens do carrossel
function adjustCarouselImageSizes() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach(img => {
        // Verificar se a imagem está carregada
        if (img.complete && img.naturalWidth > 0) {
            // Verificar se a imagem é muito grande
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
    
    // Ajustar novamente após o carregamento completo da página
    window.addEventListener('load', adjustCarouselImageSizes);
});

// Função para verificar e aplicar estilos críticos do carrossel
function applyCriticalCarouselStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    if (carouselContainer) {
        // Verificar e aplicar estilos críticos do contêiner
        if (!carouselContainer.style.height || carouselContainer.style.height === '0px') {
            carouselContainer.style.height = '500px';
        }
        
        // Verificar e aplicar estilos críticos do carrossel
        if (carousel) {
            if (!carousel.style.display || carousel.style.display !== 'flex') {
                carousel.style.display = 'flex';
            }
            if (!carousel.style.transition || !carousel.style.transition.includes('transform')) {
                carousel.style.transition = 'transform 0.5s ease';
            }
        }
        
        // Verificar e aplicar estilos críticos dos slides
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
        
        // Verificar e aplicar estilos críticos das imagens
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

// Aplicar estilos críticos do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar imediatamente
    applyCriticalCarouselStyles();
    
    // Aplicar novamente após 1 segundo
    setTimeout(applyCriticalCarouselStyles, 1000);
    
    // Aplicar novamente após o carregamento completo da página
    window.addEventListener('load', applyCriticalCarouselStyles);
});

// Função para verificar se os estilos do carrossel estão sendo aplicados corretamente
function checkCarouselStylesApplied() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        const containerStyle = window.getComputedStyle(carouselContainer);
        if (containerStyle.height === '0px' || containerStyle.height === 'auto') {
            console.warn('Estilos do carrossel não aplicados corretamente - altura do contêiner');
            carouselContainer.style.height = '500px';
        }
        
        if (carousel) {
            const carouselStyle = window.getComputedStyle(carousel);
            if (carouselStyle.display !== 'flex') {
                console.warn('Estilos do carrossel não aplicados corretamente - display do carrossel');
                carousel.style.display = 'flex';
            }
        }
        
        carouselSlides.forEach((slide, index) => {
            const slideStyle = window.getComputedStyle(slide);
            if (slideStyle.minWidth !== '100%' && slideStyle.minWidth !== '100vw') {
                console.warn('Estilos do carrossel não aplicados corretamente - largura do slide', index);
                slide.style.minWidth = '100%';
            }
        });
    }
}

// Verificar se os estilos do carrossel estão sendo aplicados corretamente
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    setTimeout(checkCarouselStylesApplied, 500);
    
    // Verificar novamente após 2 segundos
    setTimeout(checkCarouselStylesApplied, 2000);
    
    // Verificar após o carregamento completo da página
    window.addEventListener('load', checkCarouselStylesApplied);
});

// Função para verificar e ajustar o dimensionamento das imagens do carrossel
function checkAndAdjustImageSizing() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach(img => {
        // Verificar se a imagem está carregada
        if (img.complete && img.naturalWidth > 0) {
            // Verificar se a imagem está muito grande
            if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
                console.warn('Imagem muito grande detectada, ajustando dimensionamento:', img.src);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.classList.add('large-image');
            }
            
            // Verificar se a imagem está muito pequena
            if (img.naturalWidth < 100 && img.naturalHeight < 100) {
                console.warn('Imagem muito pequena detectada:', img.src);
                img.classList.add('small-image');
            }
        }
    });
}

// Verificar e ajustar o dimensionamento das imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente após o carregamento das imagens
    setTimeout(checkAndAdjustImageSizing, 1000);
    
    // Verificar novamente após 3 segundos
    setTimeout(checkAndAdjustImageSizing, 3000);
    
    // Verificar após o carregamento completo da página
    window.addEventListener('load', checkAndAdjustImageSizing);
});

// Função para verificar e corrigir o carregamento das imagens do carrossel
function verifyAndFixImageLoading() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach((img, index) => {
        // Verificar se a imagem está carregada
        if (img.complete) {
            if (img.naturalWidth === 0) {
                console.warn('Imagem do carrossel não carregada corretamente:', img.src);
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
                // Verificar dimensões
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
    
    // Verificar novamente após 2 segundos
    setTimeout(verifyAndFixImageLoading, 2000);
    
    // Verificar após o carregamento completo da página
    window.addEventListener('load', verifyAndFixImageLoading);
});

// Função para verificar dimensões da imagem
function checkImageDimensions(img) {
    // Se a imagem for muito grande, adicionar classe para tratamento
    if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
        img.classList.add('large-image');
        console.warn('Imagem muito grande detectada:', img.src, img.naturalWidth, 'x', img.naturalHeight);
    }
}

// Função para verificar e corrigir o dimensionamento das imagens do carrossel
function verifyAndFixImageSizing() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach(img => {
        // Verificar se a imagem está carregada
        if (img.complete && img.naturalWidth > 0) {
            // Verificar se a imagem está muito grande
            if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
                console.warn('Imagem muito grande detectada, corrigindo dimensionamento:', img.src);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.classList.add('large-image');
            }
            
            // Verificar se a imagem está muito pequena
            if (img.naturalWidth < 100 && img.naturalHeight < 100) {
                console.warn('Imagem muito pequena detectada, corrigindo dimensionamento:', img.src);
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.classList.add('small-image');
            }
            
            // Verificar se a imagem está distorcida
            if (img.offsetWidth > 0 && img.offsetHeight > 0) {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                const displayRatio = img.offsetWidth / img.offsetHeight;
                
                // Se a diferença de proporção for muito grande, corrigir
                if (Math.abs(aspectRatio - displayRatio) > 0.1) {
                    console.warn('Proporção da imagem distorcida, corrigindo:', img.src);
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
    // Verificar imediatamente após o carregamento das imagens
    setTimeout(verifyAndFixImageSizing, 1000);
    
    // Verificar novamente após 3 segundos
    setTimeout(verifyAndFixImageSizing, 3000);
    
    // Verificar após o carregamento completo da página
    window.addEventListener('load', verifyAndFixImageSizing);
});

// Função para verificar e corrigir os estilos do carrossel
function verifyAndFixCarouselStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    if (carouselContainer) {
        // Verificar e corrigir estilos do contêiner
        const containerStyle = window.getComputedStyle(carouselContainer);
        if (containerStyle.height === '0px' || containerStyle.height === 'auto') {
            console.warn('Corrigindo altura do contêiner do carrossel');
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
                console.warn('Corrigindo transição do carrossel');
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
    
    // Verificar novamente após 2 segundos
    setTimeout(verifyAndFixCarouselStyles, 2000);
    
    // Verificar após o carregamento completo da página
    window.addEventListener('load', verifyAndFixCarouselStyles);
});

// Função para verificar se o Google Analytics está afetando o carrossel
function checkGoogleAnalyticsImpact() {
    // Verificar se o Google Analytics está carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics não está carregado');
    }
    
    // Verificar se há conflitos com o carrossel
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
                    console.warn('Possível conflito com Google Analytics detectado - carrossel não está se movendo corretamente');
                }
                
                // Restaurar estado inicial
                carousel.style.cssText = initialState;
            }, 100);
        }, 1000);
    }
}

// Verificar impacto do Google Analytics no carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar após 3 segundos para garantir que o Google Analytics tenha carregado
    setTimeout(checkGoogleAnalyticsImpact, 3000);
});

// Função para verificar se há problemas com o Google Analytics
function checkGoogleAnalytics() {
    // Verificar se o Google Analytics está carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics não está carregado');
    }
    
    // Verificar se há conflitos com o carrossel
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
                    console.warn('Possível conflito com Google Analytics detectado - carrossel não está se movendo corretamente');
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

// Função para verificar e corrigir problemas de carregamento das imagens do carrossel
function checkAndFixImageLoadingIssues() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    // Verificar se o carrossel existe
    if (!carouselContainer || carouselImages.length === 0) {
        console.warn('Carrossel não encontrado na página');
        return;
    }
    
    // Verificar se as imagens estão carregando
    let allImagesLoaded = true;
    carouselImages.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn(`Imagem ${index} do carrossel não carregada:`, img.src);
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
    
    // Adicionar classe de fallback se necessário
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
    
    // Verificar novamente após 2 segundos
    setTimeout(checkAndFixImageLoadingIssues, 2000);
    
    // Verificar após o carregamento completo da página
    window.addEventListener('load', checkAndFixImageLoadingIssues);
    
    // Verificar periodicamente a cada 10 segundos
    setInterval(checkAndFixImageLoadingIssues, 10000);
});

// Função para verificar e corrigir problemas de carregamento do CSS
function checkAndFixCSSLoadingIssues() {
    // Verificar se os estilos críticos estão sendo aplicados
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        // Verificar altura do contêiner
        const containerHeight = carouselContainer.offsetHeight;
        if (containerHeight === 0) {
            console.warn('Altura do contêiner do carrossel é zero, aplicando fallback');
        }
    }
}

// Função para verificar se há problemas com o carregamento do CSS
function checkCSSLoading() {
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    
    linkElements.forEach((link, index) => {
        console.log('CSS', index, 'href:', link.href);
        console.log('CSS', index, 'carregado:', link.sheet ? 'sim' : 'não');
        
        if (!link.sheet) {
            console.warn('CSS', index, 'não carregado corretamente');
        }
    });
    
    // Verificar se o CSS principal está carregado
    const mainCSS = document.getElementById('main-css');
    if (mainCSS) {
        console.log('CSS principal carregado:', mainCSS.sheet ? 'sim' : 'não');
        
        if (!mainCSS.sheet) {
            console.warn('CSS principal não carregado, tentando recarregar...');
            
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

// Função para verificar e corrigir problemas de carregamento do CSS
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
                console.warn('Display do carrossel não é flex, aplicando fallback');
                carousel.style.display = 'flex';
            }
        }
        
        // Verificar slides
        carouselSlides.forEach(slide => {
            const slideMinWidth = window.getComputedStyle(slide).minWidth;
            if (slideMinWidth !== '100%' && slideMinWidth !== '100vw') {
                console.warn('Largura mínima do slide incorreta, aplicando fallback');
                slide.style.minWidth = '100%';
            }
        });
    }
    
    // Verificar se o CSS principal está carregado
    const mainCSS = document.getElementById('main-css');
    if (mainCSS && !mainCSS.sheet) {
        console.warn('CSS principal não carregado, tentando recarregar');
        const newLink = mainCSS.cloneNode();
        newLink.href = mainCSS.href + '?' + new Date().getTime();
        mainCSS.parentNode.replaceChild(newLink, mainCSS);
    }
}

// Verificar e corrigir problemas de carregamento do CSS
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    setTimeout(checkAndFixCSSLoadingIssues, 500);
    
    // Verificar novamente após 2 segundos
    setTimeout(checkAndFixCSSLoadingIssues, 2000);
    
    // Verificar após o carregamento completo da página
    window.addEventListener('load', checkAndFixCSSLoadingIssues);
    
    // Verificar periodicamente a cada 15 segundos
    setInterval(checkAndFixCSSLoadingIssues, 15000);
});

// Função para verificar e isolar possíveis conflitos com o Google Analytics
function checkAndIsolateGoogleAnalyticsConflicts() {
    // Verificar se o Google Analytics está carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics não está carregado');
        return;
    }
    
    // Verificar se há conflitos com o carrossel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        // Salvar estado inicial
        const initialTransform = carousel.style.transform;
        const initialTransition = carousel.style.transition;
        
        // Tentar mover o carrossel
        carousel.style.transition = 'none'; // Remover transição temporariamente
        carousel.style.transform = 'translateX(-50%)';
        
        // Verificar se o movimento foi aplicado
        setTimeout(() => {
            const currentTransform = carousel.style.transform;
            if (currentTransform !== 'translateX(-50%)') {
                console.warn('Possível conflito com Google Analytics detectado - carrossel não está se movendo corretamente');
            }
            
            // Restaurar estado inicial
            carousel.style.transform = initialTransform;
            carousel.style.transition = initialTransition;
        }, 50);
    }
}

// Verificar e isolar possíveis conflitos com o Google Analytics
document.addEventListener('DOMContentLoaded', () => {
    // Verificar após 5 segundos para garantir que o Google Analytics tenha carregado
    setTimeout(checkAndIsolateGoogleAnalyticsConflicts, 5000);
});

// Função para forçar correção de dimensionamento das imagens do carrossel
function forceImageDimensionCorrection() {
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    carouselImages.forEach(img => {
        // Adicionar classe para forçar correção de dimensionamento
        img.classList.add('fix-dimensions');
        
        // Aplicar estilos inline para garantir correção
        img.style.setProperty('max-width', '100%', 'important');
        img.style.setProperty('max-height', '100%', 'important');
        img.style.setProperty('width', 'auto', 'important');
        img.style.setProperty('height', 'auto', 'important');
        img.style.setProperty('object-fit', 'contain', 'important');
        
        // Verificar se a imagem está carregada
        if (img.complete && img.naturalWidth > 0) {
            console.log('Imagem corrigida:', img.src, img.naturalWidth, 'x', img.naturalHeight);
        }
    });
}

// Forçar correção de dimensionamento das imagens do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Forçar correção imediatamente
    forceImageDimensionCorrection();
    
    // Forçar correção novamente após 1 segundo
    setTimeout(forceImageDimensionCorrection, 1000);
    
    // Forçar correção após o carregamento completo da página
    window.addEventListener('load', forceImageDimensionCorrection);
    
    // Forçar correção periodicamente a cada 30 segundos
    setInterval(forceImageDimensionCorrection, 30000);
});

// Função para verificar e corrigir problemas específicos de dimensionamento do carrossel
function checkAndFixSpecificCarouselIssues() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    // Verificar se o carrossel existe
    if (!carouselContainer) {
        console.warn('Contêiner do carrossel não encontrado');
        return;
    }
    
    // Corrigir altura do contêiner se necessário
    if (carouselContainer.offsetHeight === 0) {
        console.warn('Corrigindo altura do contêiner do carrossel');
        carouselContainer.style.height = '500px';
    }
    
    // Corrigir carrossel se necessário
    if (carousel) {
        // Verificar display
        if (window.getComputedStyle(carousel).display !== 'flex') {
            console.warn('Corrigindo display do carrossel');
            carousel.style.display = 'flex';
        }
        
        // Verificar transição
        if (!carousel.style.transition || !carousel.style.transition.includes('transform')) {
            console.warn('Corrigindo transição do carrossel');
            carousel.style.transition = 'transform 0.5s ease';
        }
    }
    
    // Corrigir slides se necessário
    carouselSlides.forEach((slide, index) => {
        // Verificar largura mínima
        if (window.getComputedStyle(slide).minWidth !== '100%') {
            console.warn('Corrigindo largura mínima do slide', index);
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
    
    // Corrigir imagens se necessário
    carouselImages.forEach((img, index) => {
        // Verificar se a imagem está carregada
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

// Verificar e corrigir problemas específicos do carrossel
document.addEventListener('DOMContentLoaded', () => {
    // Verificar imediatamente
    setTimeout(checkAndFixSpecificCarouselIssues, 1000);
    
    // Verificar novamente após 3 segundos
    setTimeout(checkAndFixSpecificCarouselIssues, 3000);
    
    // Verificar após o carregamento completo da página
    window.addEventListener('load', checkAndFixSpecificCarouselIssues);
    
    // Verificar periodicamente a cada 20 segundos
    setInterval(checkAndFixSpecificCarouselIssues, 20000);
});

// Função para verificar e isolar possíveis conflitos com bibliotecas externas
function checkAndIsolateExternalLibraryConflicts() {
    // Verificar se há bibliotecas externas que possam afetar o carrossel
    const externalScripts = document.querySelectorAll('script[src]');
    
    externalScripts.forEach(script => {
        console.log('Script externo carregado:', script.src);
    });
    
    // Verificar se o Google Analytics está carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics não está carregado');
    }
    
    // Verificar se há conflitos com propriedades globais
    const originalTransform = document.body.style.transform;
    
    // Tentar aplicar uma transformação temporária
    document.body.style.transform = 'translateX(0)';
    
    // Verificar se a transformação foi aplicada
    setTimeout(() => {
        const currentTransform = document.body.style.transform;
        if (currentTransform !== 'translateX(0)') {
            console.warn('Possível conflito com biblioteca externa detectado');
        }
        
        // Restaurar transformação original
        document.body.style.transform = originalTransform;
    }, 100);
}

// Verificar e isolar possíveis conflitos com bibliotecas externas
document.addEventListener('DOMContentLoaded', () => {
    // Verificar após 5 segundos para garantir que todas as bibliotecas tenham carregado
    setTimeout(checkAndIsolateExternalLibraryConflicts, 5000);
});

// Função para aplicar estilos de fallback completo
function applyFullFallbackStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    
    // Aplicar estilos de fallback ao contêiner
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
            
            // Aplicar estilos de fallback às imagens
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
    
    // Aplicar novamente após 2 segundos
    setTimeout(applyFullFallbackStyles, 2000);
    
    // Aplicar após o carregamento completo da página
    window.addEventListener('load', applyFullFallbackStyles);
    
    // Aplicar periodicamente a cada 30 segundos
    setInterval(applyFullFallbackStyles, 30000);
});

// Função para verificar e corrigir o dimensionamento das imagens
function checkImageDimensions() {
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach(img => {
        // Verificar se a imagem está carregada
        if (img.complete) {
            console.log('Imagem carregada:', img.src, 'Dimensões:', img.naturalWidth, 'x', img.naturalHeight);
            
            // Verificar se a imagem é muito grande
            if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
                console.warn('Imagem muito grande, aplicando correção:', img.src);
                img.classList.add('large-image');
            }
            
            // Verificar se a imagem é muito pequena
            if (img.naturalWidth < 100 && img.naturalHeight < 100) {
                console.warn('Imagem muito pequena, aplicando correção:', img.src);
                img.classList.add('small-image');
            }
        } else {
            // Adicionar listener para quando a imagem carregar
            img.addEventListener('load', function() {
                console.log('Imagem carregada:', this.src, 'Dimensões:', this.naturalWidth, 'x', this.naturalHeight);
                
                // Verificar dimensões
                if (this.naturalWidth > 2000 || this.naturalHeight > 2000) {
                    console.warn('Imagem muito grande, aplicando correção:', this.src);
                    this.classList.add('large-image');
                }
                
                if (this.naturalWidth < 100 && this.naturalHeight < 100) {
                    console.warn('Imagem muito pequena, aplicando correção:', this.src);
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

// Verificar dimensões das imagens quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkImageDimensions, 1000);
});

// Função para verificar se o carrossel está funcionando corretamente
function checkCarouselFunctionality() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (!carousel || slides.length === 0) {
        console.warn('Carrossel não encontrado ou sem slides');
        return false;
    }
    
    // Verificar se o carrossel tem a propriedade transform
    const carouselStyle = window.getComputedStyle(carousel);
    if (!carouselStyle.transform) {
        console.warn('Carrossel não tem propriedade transform');
        return false;
    }
    
    // Verificar se os slides têm as propriedades corretas
    let allSlidesCorrect = true;
    slides.forEach((slide, index) => {
        const slideStyle = window.getComputedStyle(slide);
        if (slideStyle.minWidth !== '100%' && slideStyle.minWidth !== '100vw') {
            console.warn('Slide', index, 'não tem largura mínima correta');
            allSlidesCorrect = false;
        }
        
        if (slideStyle.height !== '500px' && slideStyle.height !== '100%') {
            console.warn('Slide', index, 'não tem altura correta');
            allSlidesCorrect = false;
        }
    });
    
    if (allSlidesCorrect) {
        console.log('Todos os slides estão configurados corretamente');
    }
    
    return true;
}

// Verificar funcionamento do carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkCarouselFunctionality, 2000);
});

// Implementação do carrossel
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
        console.warn('Carrossel não encontrado ou sem slides');
        return;
    }
    
    console.log('Carrossel encontrado com', slides.length, 'slides');
    
    let currentIndex = 0;
    let autoPlayInterval;
    const slideCount = slides.length;
    
    // Função para atualizar o carrossel
    function updateCarousel() {
        console.log('Atualizando carrossel para slide', currentIndex);
        
        // Calcular a posição de transformação
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
    
    // Função para testar se o carrossel está funcionando
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
                console.log('Carrossel está funcionando corretamente');
            } else {
                console.warn('Problema detectado no funcionamento do carrossel');
            }
            
            // Restaurar estado inicial
            carousel.style.transform = initialTransform;
            carousel.style.transition = 'transform 0.5s ease';
        }, 100);
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        console.log('Próximo slide');
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    // Função para verificar se há problemas com a inicialização do carrossel
    function checkCarouselInitialization() {
        const carousel = document.querySelector('.carousel');
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!carousel) {
            console.error('Carrossel não encontrado');
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
            console.log('Primeiro slide está ativo');
        } else {
            console.warn('Primeiro slide não está ativo');
        }
        
        // Verificar se o primeiro indicador tem a classe active
        if (indicators[0] && indicators[0].classList.contains('active')) {
            console.log('Primeiro indicador está ativo');
        } else {
            console.warn('Primeiro indicador não está ativo');
        }
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        console.log('Slide anterior');
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // Função para ir para um slide específico
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
    
    // Adicionar event listeners aos botões
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('Botão próximo clicado');
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('Botão anterior clicado');
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
    
    // Verificar se o carrossel está funcionando corretamente
    setTimeout(() => {
        console.log('Carrossel inicializado com', slideCount, 'slides');
        // Verificar se o primeiro slide está ativo
        if (slides[0] && !slides[0].classList.contains('active')) {
            console.warn('Primeiro slide não está ativo, corrigindo...');
            currentIndex = 0;
            updateCarousel();
        }
    }, 1000);
});

// Função para forçar a aplicação de estilos críticos
function forceCriticalStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (carouselContainer) {
        // Forçar altura do contêiner
        carouselContainer.style.height = '500px';
        carouselContainer.style.overflow = 'hidden';
        carouselContainer.style.position = 'relative';
        
        if (carousel) {
            // Forçar display do carrossel
            carousel.style.display = 'flex';
            carousel.style.transition = 'transform 0.5s ease';
            carousel.style.height = '100%';
            carousel.style.width = '100%';
            
            // Forçar estilos dos slides
            slides.forEach(slide => {
                slide.style.minWidth = '100%';
                slide.style.height = '100%';
                slide.style.flexShrink = '0';
                slide.style.display = 'flex';
                slide.style.alignItems = 'center';
                slide.style.justifyContent = 'center';
            });
            
            // Forçar estilos das imagens
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

// Forçar aplicação de estilos críticos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(forceCriticalStyles, 1000);
    setTimeout(forceCriticalStyles, 3000);
    setTimeout(forceCriticalStyles, 5000);
});

// Função para verificar e corrigir problemas de dimensionamento
function checkAndFixSizingIssues() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (!carouselContainer) {
        console.warn('Contêiner do carrossel não encontrado');
        return;
    }
    
    // Verificar altura do contêiner
    if (carouselContainer.offsetHeight === 0) {
        console.warn('Altura do contêiner do carrossel é zero, corrigindo...');
        carouselContainer.style.height = '500px';
    }
    
    if (carousel) {
        // Verificar display do carrossel
        const carouselDisplayStyle = window.getComputedStyle(carousel).display;
        if (carouselDisplayStyle !== 'flex') {
            console.warn('Display do carrossel não é flex, corrigindo...');
            carousel.style.display = 'flex';
        }
        
        // Verificar altura do carrossel
        if (carousel.offsetHeight === 0) {
            console.warn('Altura do carrossel é zero, corrigindo...');
            carousel.style.height = '100%';
        }
    }
    
    // Verificar slides
    slides.forEach((slide, index) => {
        // Verificar largura mínima
        const slideMinWidth = window.getComputedStyle(slide).minWidth;
        if (slideMinWidth !== '100%' && slideMinWidth !== '100vw') {
            console.warn('Largura mínima do slide', index, 'incorreta, corrigindo...');
            slide.style.minWidth = '100%';
        }
        
        // Verificar altura
        if (slide.offsetHeight === 0) {
            console.warn('Altura do slide', index, 'é zero, corrigindo...');
            slide.style.height = '100%';
        }
    });
    
    // Verificar imagens
    images.forEach((img, index) => {
        // Verificar se a imagem está carregada
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

// Função para verificar se há conflitos com outras bibliotecas
function checkForLibraryConflicts() {
    // Verificar se há conflitos com jQuery
    if (typeof jQuery !== 'undefined') {
        console.log('jQuery detectado, versão:', jQuery.fn.jquery);
    }
    
    // Verificar se há conflitos com outras bibliotecas
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        console.log('Script carregado:', script.src);
    });
    
    // Verificar se há conflitos com propriedades globais
    const originalTransform = document.body.style.transform;
    
    // Tentar aplicar uma transformação temporária
    document.body.style.transform = 'translateX(0)';
    
    // Verificar se a transformação foi aplicada
    setTimeout(() => {
        const currentTransform = document.body.style.transform;
        if (currentTransform !== 'translateX(0)') {
            console.warn('Possível conflito com biblioteca externa detectado');
        }
        
        // Restaurar transformação original
        document.body.style.transform = originalTransform;
    }, 100);
}

// Verificar conflitos com bibliotecas
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkForLibraryConflicts, 4000);
});

// Função para verificar se o carrossel está visível na tela
function isCarouselVisible() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return false;
    
    const rect = carouselContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Verificar se o carrossel está na viewport
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para verificar se o carrossel está funcionando corretamente
function verifyCarouselOperation() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) {
        console.warn('Carrossel não encontrado');
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
            console.log('Carrossel está funcionando corretamente');
        } else {
            console.warn('Problema detectado no funcionamento do carrossel');
        }
        
        // Restaurar estado inicial
        carousel.style.transform = initialTransform;
        carousel.style.transition = 'transform 0.5s ease';
    }, 100);
}

// Verificar operação do carrossel
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('Carrossel está visível na tela:', isCarouselVisible());
        verifyCarouselOperation();
    }, 5000);
});

// Função para verificar se há problemas com o carregamento completo da página
function checkPageLoadComplete() {
    console.log('Página carregada completamente');
    
    // Verificar se todos os elementos do carrossel estão presentes
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
            console.warn('Elemento', key, 'não encontrado');
        }
    });
    
    // Verificar se o carrossel está funcionando corretamente
    setTimeout(finalCarouselVerification, 2000);
}

// Verificar carregamento completo da página
window.addEventListener('load', function() {
    setTimeout(checkPageLoadComplete, 5000);
});

// Função para verificação final do carrossel
function finalCarouselVerification() {
    console.log('Executando verificação final do carrossel...');
    
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (!carousel) {
        console.error('Carrossel não encontrado na verificação final');
        return;
    }
    
    // Verificar se há slides suficientes
    if (slides.length < 2) {
        console.warn('Número insuficiente de slides para carrossel');
        return;
    }
    
    // Verificar se as imagens estão carregadas
    let allImagesLoaded = true;
    images.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn('Imagem', index, 'não carregada corretamente:', img.src);
            allImagesLoaded = false;
        }
    });
    
    if (allImagesLoaded) {
        console.log('Todas as imagens carregadas corretamente');
    } else {
        console.warn('Algumas imagens não foram carregadas corretamente');
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
    
    // Verificar estilos críticos
    checkCriticalStyles();
    
    // Verificar se o carrossel está se movendo corretamente
    testCarouselMovement();
}

// Função para verificar estilos críticos
function checkCriticalStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        // Forçar altura do contêiner
        if (!carouselContainer.style.height || carouselContainer.style.height === '0px') {
            carouselContainer.style.height = '500px';
        }
        
        // Verificar se o contêiner tem overflow hidden
        if (window.getComputedStyle(carouselContainer).overflow !== 'hidden') {
            carouselContainer.style.overflow = 'hidden';
        }
    }
    
    if (carousel) {
        // Verificar display do carrossel
        if (window.getComputedStyle(carousel).display !== 'flex') {
            carousel.style.display = 'flex';
        }
        
        // Verificar transição
        if (!carousel.style.transition) {
            carousel.style.transition = 'transform 0.5s ease';
        }
    }
    
    // Verificar slides
    slides.forEach((slide, index) => {
        // Verificar largura mínima
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

// Função para testar o movimento do carrossel
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
            console.log('Movimentação do carrossel está funcionando corretamente');
        } else {
            console.warn('Problema detectado na movimentação do carrossel');
        }
        
        // Restaurar estado inicial
        carousel.style.transform = initialTransform;
        carousel.style.transition = 'transform 0.5s ease';
    }, 100);
}

// Função para aplicar correções de emergência caso o carrossel pare de funcionar
function emergencyCarouselFix() {
    console.log('Aplicando correções de emergência ao carrossel...');
    
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    // Aplicar estilos de emergência ao contêiner
    if (carouselContainer) {
        carouselContainer.style.height = '500px';
        carouselContainer.style.overflow = 'hidden';
        carouselContainer.style.position = 'relative';
        carouselContainer.classList.add('emergency-fix');
    }
    
    // Aplicar estilos de emergência ao carrossel
    if (carousel) {
        carousel.style.display = 'flex';
        carousel.style.height = '100%';
        carousel.style.width = '100%';
        carousel.style.transition = 'transform 0.5s ease';
        carousel.classList.add('emergency-fix');
    }
    
    // Aplicar estilos de emergência aos slides
    slides.forEach(slide => {
        slide.style.minWidth = '100%';
        slide.style.height = '100%';
        slide.style.flexShrink = '0';
        slide.style.display = 'flex';
        slide.style.alignItems = 'center';
        slide.style.justifyContent = 'center';
        slide.classList.add('emergency-fix');
    });
    
    // Aplicar estilos de emergência às imagens
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.objectFit = 'contain';
        img.classList.add('emergency-fix');
    });
    
    console.log('Correções de emergência aplicadas');
}

// Aplicar correções de emergência após 30 segundos se o carrossel ainda não estiver funcionando
window.addEventListener('load', function() {
    setTimeout(() => {
        // Verificar se o carrossel está funcionando
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
                    console.warn('Carrossel não está funcionando corretamente, aplicando correções de emergência');
                    emergencyCarouselFix();
                } else {
                    console.log('Carrossel está funcionando corretamente');
                }
                
                // Restaurar estado inicial
                carousel.style.transform = initialTransform;
                carousel.style.transition = 'transform 0.5s ease';
            }, 100);
        }
    }, 30000);
});

// Função para verificar se há problemas com os indicadores
function checkIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    
    if (indicators.length > 0) {
        console.log('Indicadores encontrados:', indicators.length);
        
        // Verificar se todos os indicadores têm data-slide
        indicators.forEach((indicator, index) => {
            const slideIndex = indicator.getAttribute('data-slide');
            if (!slideIndex) {
                console.warn('Indicador', index, 'não tem atributo data-slide');
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

// Função para verificar se há problemas com o número de slides
function checkSlideCount() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    console.log('Número de slides:', slides.length);
    console.log('Número de indicadores:', indicators.length);
    
    // Verificar se o número de slides corresponde ao número de indicadores
    if (slides.length !== indicators.length) {
        console.warn('Número de slides e indicadores não correspondem');
    }
    
    // Verificar se há slides suficientes
    if (slides.length < 2) {
        console.warn('Número insuficiente de slides para carrossel');
    }
}

// Verificar número de slides
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkSlideCount, 14000);
});

// Verificar carregamento do JavaScript
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        console.log('Verificando carregamento do JavaScript...');
        
        // Verificar se todas as funções necessárias estão disponíveis
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
                console.log('Função', funcName, 'disponível');
            } else {
                console.warn('Função', funcName, 'não disponível');
            }
        });
    }, 18000);
});

// Função para verificar se há problemas com o carregamento completo da página
function checkPageLoadComplete() {
    console.log('Página carregada completamente');
    
    // Verificar se todos os elementos do carrossel estão presentes
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
            console.warn('Elemento', key, 'não encontrado');
        }
    });
    
    // Verificar se o carrossel está funcionando corretamente
    setTimeout(finalCarouselVerification, 2000);
}

// Verificar carregamento completo da página
window.addEventListener('load', function() {
    setTimeout(checkPageLoadComplete, 5000);
});

// Função para verificação final do carrossel
function finalCarouselVerification() {
    console.log('Executando verificação final do carrossel...');
    
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (!carousel) {
        console.error('Carrossel não encontrado na verificação final');
        return;
    }
    
    // Verificar se há slides suficientes
    if (slides.length < 2) {
        console.warn('Número insuficiente de slides para carrossel');
        return;
    }
    
    // Verificar se as imagens estão carregadas
    let allImagesLoaded = true;
    images.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn('Imagem', index, 'não carregada corretamente:', img.src);
            allImagesLoaded = false;
        }
    });
    
    if (allImagesLoaded) {
        console.log('Todas as imagens carregadas corretamente');
    } else {
        console.warn('Algumas imagens não foram carregadas corretamente');
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
    
    // Verificar estilos críticos
    checkCriticalStyles();
    
    // Verificar se o carrossel está se movendo corretamente
    testCarouselMovement();
}

// Função para verificar estilos críticos
function checkCriticalStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        // Forçar altura do contêiner
        if (!carouselContainer.style.height || carouselContainer.style.height === '0px') {
            carouselContainer.style.height = '500px';
        }
        
        // Verificar se o contêiner tem overflow hidden
        if (window.getComputedStyle(carouselContainer).overflow !== 'hidden') {
            carouselContainer.style.overflow = 'hidden';
        }
    }
    
    if (carousel) {
        // Verificar display do carrossel
        if (window.getComputedStyle(carousel).display !== 'flex') {
            carousel.style.display = 'flex';
        }
        
        // Verificar transição
        if (!carousel.style.transition) {
            carousel.style.transition = 'transform 0.5s ease';
        }
    }
    
    // Verificar slides
    slides.forEach((slide, index) => {
        // Verificar largura mínima
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

// Função para testar o movimento do carrossel
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
            console.log('Movimentação do carrossel está funcionando corretamente');
        } else {
            console.warn('Problema detectado na movimentação do carrossel');
        }
        
        // Restaurar estado inicial
        carousel.style.transform = initialTransform;
        carousel.style.transition = 'transform 0.5s ease';
    }, 100);
}

// Função para verificar se há conflitos com o Google Analytics
function checkGoogleAnalyticsConflicts() {
    console.log('Verificando possíveis conflitos com Google Analytics...');
    
    // Verificar se o Google Analytics está carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics não está carregado');
    }
    
    // Verificar se há conflitos com propriedades globais que possam afetar o carrossel
    const originalBodyTransform = document.body.style.transform;
    
    // Tentar aplicar uma transformação temporária no body
    document.body.style.transform = 'translateX(0)';
    
    // Verificar se a transformação foi aplicada
    setTimeout(() => {
        const currentBodyTransform = document.body.style.transform;
        if (currentBodyTransform !== 'translateX(0)') {
            console.warn('Possível conflito com biblioteca externa detectado no body');
        }
        
        // Restaurar transformação original
        document.body.style.transform = originalBodyTransform;
    }, 100);
}

// Verificar conflitos com Google Analytics após o carregamento completo
window.addEventListener('load', function() {
    setTimeout(checkGoogleAnalyticsConflicts, 15000);
});

// Função para verificar e corrigir problemas de carregamento de imagens
function checkAndFixImageLoading() {
    const images = document.querySelectorAll('.carousel-slide img');
    let issuesFound = false;
    
    images.forEach((img, index) => {
        // Verificar se a imagem está carregada
        if (!img.complete || img.naturalWidth === 0) {
            console.warn('Imagem', index, 'não carregada:', img.src);
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
            
            // Verificar dimensões
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

// Verificar também após o carregamento completo da página
window.addEventListener('load', function() {
    setTimeout(checkAndFixImageLoading, 5000);
});

// Função para verificar se os nomes dos arquivos de imagem correspondem aos arquivos reais
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
                console.warn('Arquivo', fileName, 'não encontrado na lista esperada');
            }
        }
    });
}

// Verificar nomes dos arquivos de imagem
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkImageFileNames, 3000);
});


// Função para verificar se há problemas com o dimensionamento das imagens
function checkImageSizing() {
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach((img, index) => {
        // Verificar se a imagem está carregada
        if (img.complete && img.naturalWidth > 0) {
            console.log('Imagem', index, 'carregada:', img.src);
            console.log('Dimensões naturais:', img.naturalWidth, 'x', img.naturalHeight);
            console.log('Dimensões exibidas:', img.offsetWidth, 'x', img.offsetHeight);
            
            // Verificar se há distorção
            const naturalRatio = img.naturalWidth / img.naturalHeight;
            const displayRatio = img.offsetWidth / img.offsetHeight;
            
            if (Math.abs(naturalRatio - displayRatio) > 0.1) {
                console.warn('Imagem', index, 'pode estar distorcida');
                console.log('Proporção natural:', naturalRatio);
                console.log('Proporção exibida:', displayRatio);
            }
        } else {
            console.warn('Imagem', index, 'não carregada:', img.src);
        }
    });
}

// Verificar dimensionamento das imagens
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkImageSizing, 7000);
});

// Função para verificar se há problemas com o dimensionamento das imagens em diferentes resoluções
function checkImageSizingAtDifferentResolutions() {
    const images = document.querySelectorAll('.carousel-slide img');
    
    // Verificar dimensionamento em diferentes resoluções
    const resolutions = [
        { width: 320, height: 568 },  // iPhone SE
        { width: 375, height: 667 },  // iPhone 6/7/8
        { width: 414, height: 736 },  // iPhone 6/7/8 Plus
        { width: 768, height: 1024 }, // iPad
        { width: 1024, height: 768 }, // iPad Landscape
        { width: 1200, height: 800 }  // Desktop
    ];
    
    resolutions.forEach(resolution => {
        console.log('Verificando dimensionamento para resolução:', resolution.width, 'x', resolution.height);
        
        images.forEach((img, index) => {
            if (img.complete && img.naturalWidth > 0) {
                // Calcular proporção
                const naturalRatio = img.naturalWidth / img.naturalHeight;
                const containerRatio = resolution.width / resolution.height;
                
                console.log('Imagem', index, 'proporção natural:', naturalRatio);
                console.log('Imagem', index, 'proporção do contêiner:', containerRatio);
                
                // Verificar se há distorção significativa
                if (Math.abs(naturalRatio - containerRatio) > 0.5) {
                    console.warn('Imagem', index, 'pode ter distorção significativa na resolução', resolution.width, 'x', resolution.height);
                }
            }
        });
    });
}

// Verificar dimensionamento das imagens em diferentes resoluções
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkImageSizingAtDifferentResolutions, 16000);
});

// Função para verificar se há problemas com o carrossel após o carregamento completo
function checkCarouselAfterLoad() {
    console.log('Verificando carrossel após carregamento completo...');
    
    // Verificar se o carrossel está funcionando corretamente
    const carousel = document.querySelector('.carousel');
    if (!carousel) {
        console.error('Carrossel não encontrado após carregamento completo');
        return;
    }
    
    // Verificar se o carrossel tem transformação
    const transform = window.getComputedStyle(carousel).transform;
    console.log('Transformação do carrossel:', transform);
    
    // Verificar se os slides estão posicionados corretamente
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        const slideTransform = window.getComputedStyle(slide).transform;
        console.log('Transformação do slide', index, ':', slideTransform);
    });
    
    // Verificar se as imagens estão carregadas
    const images = document.querySelectorAll('.carousel-slide img');
    images.forEach((img, index) => {
        console.log('Imagem', index, 'carregada:', img.complete);
        console.log('Imagem', index, 'largura natural:', img.naturalWidth);
        console.log('Imagem', index, 'altura natural:', img.naturalHeight);
    });
}

// Verificar carrossel após carregamento completo
window.addEventListener('load', function() {
    setTimeout(checkCarouselAfterLoad, 10000);
});

// Função para verificar se há problemas com o carregamento das imagens
function checkImageLoading() {
    const images = document.querySelectorAll('.carousel-slide img');
    let allImagesLoaded = true;

    images.forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
            allImagesLoaded = false;
            console.warn('Imagem não carregada:', img.src);

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

// Função para verificar se há problemas com o CSS
function checkCSSIssues() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
	
    if (!carouselContainer) {
        console.warn('Contêiner do carrossel não encontrado');
        return;
    }
    
    // Verificar se o CSS está sendo aplicado corretamente
    const containerStyle = window.getComputedStyle(carouselContainer);
    console.log('Estilos do contêiner do carrossel:');
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
    
    console.log('Dimensões do contêiner do carrossel:');
    console.log('Width:', containerWidth);
    console.log('Height:', containerHeight);
    
    // Verificar se as dimensões são adequadas
    if (containerWidth === 0 || containerHeight === 0) {
        console.warn('Dimensões do contêiner do carrossel são zero');
    }
    
    
    // Verificar proporção
    const ratio = containerWidth / containerHeight;
    console.log('Proporção do contêiner:', ratio);
    
    // Verificar se está dentro de limites razoáveis
    if (ratio < 0.5 || ratio > 3) {
        console.warn('Proporção do contêiner pode ser inadequada');
    }
}

// Verificar problemas com o CSS
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkCSSIssues, 9000);
});

// Função para verificar dimensionamento responsivo
function checkResponsiveSizing() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) {
        console.warn('Contêiner do carrossel não encontrado');
        return;
    }
    
    const containerWidth = carouselContainer.offsetWidth;
    const containerHeight = carouselContainer.offsetHeight;
    
    console.log('Dimensões do contêiner do carrossel:');
    console.log('Width:', containerWidth);
    console.log('Height:', containerHeight);
    
    // Verificar se as dimensões são adequadas
    if (containerWidth === 0 || containerHeight === 0) {
        console.warn('Dimensões do contêiner do carrossel são zero');
    }
    
    // Verificar proporção
    const ratio = containerWidth / containerHeight;
    console.log('Proporção do contêiner:', ratio);
    
    // Verificar se está dentro de limites razoáveis
    if (ratio < 0.5 || ratio > 3) {
        console.warn('Proporção do contêiner pode ser inadequada');
    }
}

// Verificar dimensionamento responsivo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkResponsiveSizing, 10000);
    
    // Verificar também após redimensionamento da janela
    window.addEventListener('resize', function() {
        setTimeout(checkResponsiveSizing, 1000);
    });
});

// Função para verificar se há problemas com o autoplay
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
            console.log('Movimentação manual do carrossel está funcionando');
        } else {
            console.warn('Problema detectado na movimentação manual do carrossel');
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

// Função para verificar se há problemas com os botões de navegação
function checkNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        console.log('Botão anterior encontrado');
        // Verificar se tem event listener
        // const prevListeners = getEventListeners(prevBtn);
        // console.log('Event listeners no botão anterior:', prevListeners);
    } else {
        console.warn('Botão anterior não encontrado');
    }
    
    if (nextBtn) {
        console.log('Botão próximo encontrado');
        // Verificar se tem event listener
        // const nextListeners = getEventListeners(nextBtn);
        // console.log('Event listeners no botão próximo:', nextListeners);
    } else {
        console.warn('Botão próximo não encontrado');
    }
}

// Verificar botões de navegação
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkNavigationButtons, 12000);
});

// Função para verificar se há problemas com os indicadores
function checkIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    
    if (indicators.length > 0) {
        console.log('Indicadores encontrados:', indicators.length);
        
        // Verificar se todos os indicadores têm data-slide
        indicators.forEach((indicator, index) => {
            const slideIndex = indicator.getAttribute('data-slide');
            if (!slideIndex) {
                console.warn('Indicador', index, 'não tem atributo data-slide');
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

// Função para verificar se há problemas com o número de slides
function checkSlideCount() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    console.log('Número de slides:', slides.length);
    console.log('Número de indicadores:', indicators.length);
    
    // Verificar se o número de slides corresponde ao número de indicadores
    if (slides.length !== indicators.length) {
        console.warn('Número de slides e indicadores não correspondem');
    }
    
    // Verificar se há slides suficientes
    if (slides.length < 2) {
        console.warn('Número insuficiente de slides para carrossel');
    }
}

// Verificar número de slides
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkSlideCount, 14000);
});

// Verificar carregamento do JavaScript
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        console.log('Verificando carregamento do JavaScript...');
        
        // Verificar se todas as funções necessárias estão disponíveis
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
                console.log('Função', funcName, 'disponível');
            } else {
                console.warn('Função', funcName, 'não disponível');
            }
        });
    }, 18000);
});

// Função para verificar se há problemas com o carregamento completo da página
function checkPageLoadComplete() {
    console.log('Página carregada completamente');
    
    // Verificar se todos os elementos do carrossel estão presentes
    const carouselElements = {
        container: document.querySelector('.carousel-container'),
        carousel: document.querySelector('.carousel'),
        slides: document.querySelectorAll('.carousel-slide'),
        images: document.querySelectorAll('.carousel-slide img'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        indicators: document.querySelectorAll('.indicator')
    };
// Função para verificar se há problemas com o carregamento completo da página
function checkPageLoadComplete() {
    console.log('Página carregada completamente');
    
    // Verificar se todos os elementos do carrossel estão presentes
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
            console.warn('Elemento', key, 'não encontrado');
        }
    });
    
    // Verificar se o carrossel está funcionando corretamente
    setTimeout(finalCarouselVerification, 2000);
}

// Verificar carregamento completo da página
window.addEventListener('load', function() {
    setTimeout(checkPageLoadComplete, 5000);
});

// Função para verificação final do carrossel
function finalCarouselVerification() {
    console.log('Executando verificação final do carrossel...');
    
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    
    if (!carousel) {
        console.error('Carrossel não encontrado na verificação final');
        return;
    }
    
    // Verificar se há slides suficientes
    if (slides.length < 2) {
        console.warn('Número insuficiente de slides para carrossel');
        return;
    }
    
    // Verificar se as imagens estão carregadas
    let allImagesLoaded = true;
    images.forEach((img, index) => {
        if (!img.complete || img.naturalWidth === 0) {
            console.warn('Imagem', index, 'não carregada corretamente:', img.src);
            allImagesLoaded = false;
        }
    });
    
    if (allImagesLoaded) {
        console.log('Todas as imagens carregadas corretamente');
    } else {
        console.warn('Algumas imagens não foram carregadas corretamente');
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
    
    // Verificar estilos críticos
    checkCriticalStyles();
    
    // Verificar se o carrossel está se movendo corretamente
    testCarouselMovement();
}

// Função para verificar estilos críticos
function checkCriticalStyles() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (carouselContainer) {
        // Forçar altura do contêiner
        if (!carouselContainer.style.height || carouselContainer.style.height === '0px') {
            carouselContainer.style.height = '500px';
        }
        
        // Verificar se o contêiner tem overflow hidden
        if (window.getComputedStyle(carouselContainer).overflow !== 'hidden') {
            carouselContainer.style.overflow = 'hidden';
        }
    }
    
    if (carousel) {
        // Verificar display do carrossel
        if (window.getComputedStyle(carousel).display !== 'flex') {
            carousel.style.display = 'flex';
        }
        
        // Verificar transição
        if (!carousel.style.transition) {
            carousel.style.transition = 'transform 0.5s ease';
        }
    }
    
    // Verificar slides
    slides.forEach((slide, index) => {
        // Verificar largura mínima
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

// Função para testar o movimento do carrossel
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
            console.log('Movimentação do carrossel está funcionando corretamente');
        } else {
            console.warn('Problema detectado na movimentação do carrossel');
        }
        
        // Restaurar estado inicial
        carousel.style.transform = initialTransform;
        carousel.style.transition = 'transform 0.5s ease';
    }, 100);
}

// Função para verificar se há conflitos com o Google Analytics
function checkGoogleAnalyticsConflicts() {
    console.log('Verificando possíveis conflitos com Google Analytics...');
    
    // Verificar se o Google Analytics está carregado
    if (typeof gtag !== 'undefined') {
        console.log('Google Analytics carregado corretamente');
    } else {
        console.warn('Google Analytics não está carregado');
    }
    
    // Verificar se há conflitos com propriedades globais que possam afetar o carrossel
    const originalBodyTransform = document.body.style.transform;
    
    // Tentar aplicar uma transformação temporária no body
    document.body.style.transform = 'translateX(0)';
    
    // Verificar se a transformação foi aplicada
    setTimeout(() => {
        const currentBodyTransform = document.body.style.transform;
        if (currentBodyTransform !== 'translateX(0)') {
            console.warn('Possível conflito com biblioteca externa detectado no body');
        }
        
        // Restaurar transformação original
        document.body.style.transform = originalBodyTransform;
    }, 100);
}

// Verificar conflitos com Google Analytics após o carregamento completo
window.addEventListener('load', function() {
    setTimeout(checkGoogleAnalyticsConflicts, 15000);
});

