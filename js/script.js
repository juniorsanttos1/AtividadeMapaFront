// ===== MENU MOBILE =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    });
}

// ===== VALIDAÇÃO DE FORMULÁRIO =====
const contactForm = document.getElementById('contatoForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    let isValid = true;

    // Validação do nome
    if (nome === '') {
        showError('nome', 'Por favor, insira seu nome');
        isValid = false;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Por favor, insira um e-mail válido');
        isValid = false;
    }

    // Validação de mensagem
    if (mensagem === '') {
        showError('mensagem', 'Por favor, escreva sua mensagem');
        isValid = false;
    }

    // Se tudo estiver válido
    if (isValid) {
      // Simulação de envio (substitua por AJAX/API real)
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    }
    });

    function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.nextElementSibling || document.createElement('small');
    
    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
        errorElement.className = 'error-message';
        errorElement.style.color = '#e63946';
        errorElement.style.display = 'block';
        errorElement.style.marginTop = '5px';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
    field.style.borderColor = '#e63946';
    
    // Remove o erro quando o usuário começa a digitar
    field.addEventListener('input', () => {
        field.style.borderColor = '#ddd';
        errorElement.textContent = '';
    });
    }
}

// ===== INTERAÇÃO COM PRODUTOS =====
// ===== INTERAÇÃO COM PRODUTOS =====
document.querySelectorAll('.botao-comprar').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = e.target.closest('.card-produto, .card-destaque');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.preco, .preco-atual').textContent;
        
        // Mensagem padrão para o WhatsApp
        const message = `Olá, gostaria de comprar o produto: ${productName} - ${productPrice}.`;
        
        // Número de telefone da loja (substitua pelo número correto se necessário)
        const phoneNumber = '5575981695525';
        
        // Redireciona para o WhatsApp com a mensagem
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });
});

// ===== FILTROS PARA CATÁLOGO (OPCIONAL) =====
const filterButtons = document.querySelectorAll('.filtros button');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe ativa de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('ativo'));
        
      // Adiciona a classe ativa ao botão clicado
        button.classList.add('ativo');
        
        const filterValue = button.textContent.toLowerCase();
        const products = document.querySelectorAll('.card-produto');
        
        products.forEach(product => {
        const productCategory = product.dataset.category || 'todos';
        
        if (filterValue === 'todos' || productCategory.includes(filterValue)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
        });
    });
    });
}

// ===== ANIMAÇÃO DE SCROLL =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .card-servico');
    
    elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
    });
};

// Configuração inicial para elementos animados
document.querySelectorAll('.card, .card-servico').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Event listeners
window.addEventListener('DOMContentLoaded', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// ===== CARREGAMENTO DE IMAGENS OTIMIZADO =====
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', () => {
    img.style.opacity = '1';
    img.style.transition = 'opacity 0.3s ease';
    });
});