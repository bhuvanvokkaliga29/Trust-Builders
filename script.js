// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Add a class for more complex animations if needed,
            // e.g., entry.target.classList.add('animate-in');
        } else {
            // Optional: reset animation when out of view
            // entry.target.style.opacity = '0';
            // entry.target.style.transform = 'translateY(30px)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    // Only apply initial styles for sections that should animate in
    if (!section.classList.contains('hero')) { // Exclude hero section from initial animation state
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)'; // Updated initial transform
        section.style.transition = 'opacity 0.7s ease, transform 0.7s ease'; // Slightly longer transition
        observer.observe(section);
    }
});

// Observe cards for staggered animations
document.querySelectorAll('.service-card, .project-card, .team-card, .stat, .media-item, .contact-item, .form-group').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)'; // Consistent initial transform
    // Adjust transition delay for a more noticeable staggered effect across many items
    card.style.transition = opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s; // Smoother and quicker stagger
    observer.observe(card);
});


// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) { // Ensure the form exists before adding listener
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create mailto link
        const mailtoLink = `mailto:trustbuilders05@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(Name: ${name}\nEmail: ${email}\n\nMessage:\n${message})}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showNotification('Thank you! Your email client will open with the message ready to send.', 'success');

        // Reset form
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = notification notification-${type};
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 25px; /* Adjusted right position */
        background: ${type === 'success' ? '#10b981' : '#0ea5e9'};
        color: white;
        padding: 1.2rem 2.5rem; /* Increased padding */
        border-radius: 12px; /* Increased border-radius */
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25); /* More pronounced shadow */
        z-index: 10000;
        transform: translateX(450px); /* Larger initial offset */
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease; /* Smoother animation */
        max-width: 350px; /* Increased max-width */
        font-weight: 500;
        font-size: 1.05rem; /* Increased font size */
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);

    // Remove after 6 seconds (slightly longer)
    setTimeout(() => {
        notification.style.transform = 'translateX(450px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400); // Wait for transition to finish
    }, 6000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = translateY(${scrolled * 0.4}px); // Slightly less parallax for subtlety
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 120); // Slightly faster typing
        }, 1200); // Slightly longer delay before typing starts
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    if (element.dataset.animated) {
        element.textContent = target + '+';
        return;
    }
    element.dataset.animated = 'true';

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }

    updateCounter();
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)'; // Adjusted scale
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Team card hover effects
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)'; // Adjusted scale
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)'; // Adjusted scale
        const serviceIcon = this.querySelector('.service-icon');
        if (serviceIcon) {
            serviceIcon.style.transform = 'scale(1.15) rotate(8deg)'; // More pronounced icon animation
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        const serviceIcon = this.querySelector('.service-icon');
        if (serviceIcon) {
            serviceIcon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Media item hover effects
document.querySelectorAll('.media-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08)';
        this.style.boxShadow = '0 18px 45px rgba(0, 0, 0, 0.25)'; // Stronger shadow
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'var(--shadow)';
    });
});


// Add loading animation (Preloader setup)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preloader styles (dynamically added)
const preloaderStyles = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.6s ease-out; /* Smoother fade-out */
    }

    .preloader-logo {
        width: 120px; /* Larger logo */
        height: 120px;
        border-radius: 25px;
        animation: pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite; /* Smoother pulse */
    }

    @keyframes pulse {
        0% { transform: scale(1); opacity: 1;}
        50% { transform: scale(1.15); opacity: 0.7;} /* More pronounced pulse */
        100% { transform: scale(1); opacity: 1;}
    }

    body.loaded .preloader {
        opacity: 0;
        pointer-events: none;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = preloaderStyles;
document.head.appendChild(styleSheet);

const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = '<img src="Trust Builders Logo.jpg" alt="Loading..." class="preloader-logo">';
document.body.insertBefore(preloader, document.body.firstChild);

window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            if (preloader) {
                preloader.remove();
            }
        }, 600); // Wait for transition to finish
    }, 1500); // Increased delay for more preloader visibility
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px; /* Thicker bar */
    background: linear-gradient(90deg, #0ea5e9, #38bdf8);
    z-index: 10001;
    transition: width 0.15s ease; /* Slightly smoother */
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Add floating action button for quick contact
const fab = document.createElement('div');
fab.innerHTML = '<i class="fas fa-envelope"></i>';
fab.style.cssText = `
    position: fixed;
    bottom: 35px; /* Slightly higher */
    right: 35px; /* Slightly more to the right */
    width: 65px; /* Larger */
    height: 65px;
    background: linear-gradient(135deg, #0ea5e9, #38bdf8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.6rem; /* Larger icon */
    cursor: pointer;
    box-shadow: 0 12px 35px rgba(14, 165, 233, 0.35); /* Stronger shadow */
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

fab.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

fab.addEventListener('mouseenter', () => {
    fab.style.transform = 'scale(1.15) rotate(10deg)'; // More pronounced rotation and scale
    fab.style.boxShadow = '0 18px 45px rgba(14, 165, 233, 0.45)';
});

fab.addEventListener('mouseleave', () => {
    fab.style.transform = 'scale(1) rotate(0deg)';
    fab.style.boxShadow = '0 12px 35px rgba(14, 165, 233, 0.35)';
});

document.body.appendChild(fab);

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Easter egg found! You discovered the Konami code!', 'success');
        document.body.style.animation = 'rainbow 3s ease-in-out forwards'; // Longer animation
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
        konamiCode = [];
    }
});

// Add rainbow animation for easter egg (dynamically added)
const rainbowStyles = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;

const rainbowStyleSheet = document.createElement('style');
rainbowStyleSheet.textContent = rainbowStyles;
document.head.appendChild(rainbowStyleSheet);