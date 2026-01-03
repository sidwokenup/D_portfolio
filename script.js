// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation using Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(247, 247, 247, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(247, 247, 247, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Create success message element
const successMessageDiv = document.createElement('div');
successMessageDiv.className = 'success-message glass-card';
successMessageDiv.style.display = 'none';
successMessageDiv.style.position = 'fixed';
successMessageDiv.style.top = '50%';
successMessageDiv.style.left = '50%';
successMessageDiv.style.transform = 'translate(-50%, -50%)';
successMessageDiv.style.zIndex = '9999';
successMessageDiv.style.padding = '30px 40px';
successMessageDiv.style.textAlign = 'center';
successMessageDiv.style.backgroundColor = '#4CAF50';
successMessageDiv.style.color = 'white';
successMessageDiv.style.borderRadius = '8px';
successMessageDiv.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
successMessageDiv.style.minWidth = '300px';
successMessageDiv.style.fontSize = '16px';
successMessageDiv.style.fontWeight = '500';
successMessageDiv.textContent = '✓ Message sent successfully!';
document.body.appendChild(successMessageDiv);

// Show success message
const showSuccessMessage = () => {
    successMessageDiv.style.display = 'block';
    setTimeout(() => {
        successMessageDiv.style.display = 'none';
    }, 3000);
};

// Add loading animation to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Only add ripple effect, not preventing default
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing effect for hero tagline (optional enhancement)
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const originalText = heroTagline.textContent;
    heroTagline.textContent = '';
    let charIndex = 0;

    const typeText = () => {
        if (charIndex < originalText.length) {
            heroTagline.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 30);
        }
    };

    // Start typing after page load
    window.addEventListener('load', () => {
        setTimeout(typeText, 1000);
    });
}

// Console message for developers
console.log('%c👋 Welcome to Divya Parashar\'s Portfolio!', 'color: #1F3C88; font-size: 20px; font-weight: bold;');
console.log('%c🌟 Built with HTML, CSS, and JavaScript', 'color: #7FA99B; font-size: 14px;');
console.log('%c💼 Empowering People, Building Futures', 'color: #2E2E2E; font-size: 14px;');

(function(){
   emailjs.init("rwi4wG-UNbb03zg3U");
})();

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    document.getElementById("time").value = new Date().toLocaleString();

    emailjs.sendForm("service_f6gmpeb", "template_2d6v4y9", this)
    .then(function() {
        showSuccessMessage();
        document.getElementById("contact-form").reset();
    }, function(error) {
        alert("FAILED... " + error.text);
    });
});