// Landing Page JavaScript
document.addEventListener("DOMContentLoaded", function() {
    try {
        // Theme toggle logic
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return; // Exit if theme toggle not found
        
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        const darkLogo = document.querySelectorAll('.dark-mode-logo');
        const lightLogo = document.querySelectorAll('.light-mode-logo');

    // Helper to update logo visibility
    function updateLogos() {
        if (body.classList.contains('dark-mode')) {
            darkLogo.forEach(el => el.style.display = 'block');
            lightLogo.forEach(el => el.style.display = 'none');
        } else {
            darkLogo.forEach(el => el.style.display = 'none');
            lightLogo.forEach(el => el.style.display = 'block');
        }
    }

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.remove('dark-mode');
        icon.classList.replace('fa-sun', 'fa-moon');
    }
    updateLogos();

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
        updateLogos();
    });

    // System theme preference listener
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            body.classList.toggle('dark-mode', e.matches);
            icon.classList.toggle('fa-sun', e.matches);
            icon.classList.toggle('fa-moon', !e.matches);
            updateLogos();
        }
    });

    // Hamburger menu dropdown logic
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (hamburgerMenu && dropdownMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!dropdownMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.feature-card, .testimonial-card').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
        
    } catch (error) {
        console.error('Error initializing landing page:', error);
    }
});
