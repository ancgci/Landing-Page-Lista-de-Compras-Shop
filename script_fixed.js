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