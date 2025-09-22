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