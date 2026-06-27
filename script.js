/* === NAV SCROLL EFFECT === */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

/* === MOBILE MENU === */
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

/* === SCROLL REVEAL === */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.sobre, .atuacao, .formacao, .contato, .card, .timeline-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

/* === FORM SUBMISSION (Web3Forms) === */
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button');
    const originalText = btn.textContent;

    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        });

        const result = await response.json();

        if (result.success) {
            btn.textContent = 'Mensagem Enviada ✓';
            btn.style.background = '#2d5a3d';
            form.reset();
        } else {
            btn.textContent = 'Erro — Tente novamente';
            btn.style.background = '#8b1a1a';
        }
    } catch (err) {
        btn.textContent = 'Erro — Tente novamente';
        btn.style.background = '#8b1a1a';
    }

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 4000);
});
