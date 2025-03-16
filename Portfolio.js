document.addEventListener('DOMContentLoaded', () => {
    // Profile Image and Name Loading
    const updatePortfolioProfileDetails = () => {
        const savedProfileImage = localStorage.getItem('profileImage');
        const savedProfileName = localStorage.getItem('profileName');

        const portfolioHeroImageElements = document.querySelectorAll('.hero-image');
        const portfolioHeroTitleElements = document.querySelectorAll('.hero-title');

        // Update all hero images
        if (savedProfileImage) {
            portfolioHeroImageElements.forEach(heroImageEl => {
                heroImageEl.src = savedProfileImage;
            });
        }

        // Update all hero titles
        if (savedProfileName) {
            portfolioHeroTitleElements.forEach(heroTitleEl => {
                heroTitleEl.textContent = savedProfileName;
            });
        }
    };

    // Call the update function
    updatePortfolioProfileDetails();

    // Dark Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.removeItem('dark-mode');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections
    document.querySelectorAll('section').forEach(section => {
        fadeInObserver.observe(section);
    });

    // Typing Effect for Hero Title
    const heroTitle = document.querySelector('.typing-effect');
    const heroSkills = document.querySelector('.hero-skills');
    heroSkills.style.opacity = '0'; // Initially hide hero skills

    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // When typing is complete, fade in the hero skills
                heroSkills.style.transition = 'opacity 0.5s ease';
                heroSkills.style.opacity = '1';
            }
        }
        type();
    }

    typeWriter(heroTitle, text);

    // Social Media Link Hover Effects
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'scale(1.2) rotate(10deg)';
        });

        icon.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Hero Image Parallax Effect
    const heroImage = document.querySelector('.hero-image');
    const heroSection = document.querySelector('.hero');

    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const rotateX = (centerY - clientY) / 20;
        const rotateY = (clientX - centerX) / 20;
    });

    heroSection.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (!isValid) {
            alert('Please fill out all fields.');
            return;
        }

        // Simulated form submission (replace with actual backend logic)
        try {
            // In a real-world scenario, you'd use fetch or axios to send form data
            const formData = new FormData(contactForm);
            const response = await simulateFormSubmission(formData);
            
            if (response.success) {
                alert('Message sent successfully! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Simulated form submission function
    async function simulateFormSubmission(formData) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                resolve({ 
                    success: true, 
                    message: 'Form submitted successfully' 
                });
            }, 1500);
        });
    }

    // Project Case Study Modal (Placeholder)
    const projectButtons = document.querySelectorAll('.btn-project');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Case study details will be available soon!');
        });
    });

    // Why Choose Us toggle functionality
    const whyChooseUsLinks = document.querySelectorAll('.why-choose-us-link');
    
    whyChooseUsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const whyChooseUsContent = this.nextElementSibling;
            
            // Close any previously open 'Why Choose Us' sections
            document.querySelectorAll('.why-choose-us-content').forEach(content => {
                if (content !== whyChooseUsContent) {
                    content.classList.remove('active');
                }
            });
            
            // Toggle the clicked section
            whyChooseUsContent.classList.toggle('active');
        });
    });

    // Close 'Why Choose Us' sections when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.why-choose-us-toggle')) {
            document.querySelectorAll('.why-choose-us-content').forEach(content => {
                content.classList.remove('active');
            });
        }
    });

    // Service Card Flip Functionality
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const whyChooseUsLink = card.querySelector('.why-choose-us-link');
        const backToFrontLink = card.querySelector('.back-to-front a');

        if (whyChooseUsLink) {
            whyChooseUsLink.addEventListener('click', function(e) {
                e.preventDefault();
                card.classList.add('flipped');
            });
        }

        if (backToFrontLink) {
            backToFrontLink.addEventListener('click', function(e) {
                e.preventDefault();
                card.classList.remove('flipped');
            });
        }
    });

    // Close other card flips when one is opened
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-card')) {
            serviceCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
});