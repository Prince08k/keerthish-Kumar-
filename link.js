document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        updateColors(isDarkMode);
    };

    const updateColors = (isDarkMode) => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.style.setProperty('--bg-color', '#ffffff');
            root.style.setProperty('--text-color', '#121212');
            root.style.setProperty('--accent-color', '#6200ee');
            root.style.setProperty('--secondary-color', '#03dac6');
            root.style.setProperty('--link-bg-color', '#f1f1f1');
        } else {
            root.style.setProperty('--bg-color', '#121212');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--accent-color', '#bb86fc');
            root.style.setProperty('--secondary-color', '#03dac6');
            root.style.setProperty('--link-bg-color', '#1e1e1e');
        }
    };

    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        updateColors(true);
    }

    // Link Click Tracking (optional)
    const links = document.querySelectorAll('.link-button, .cta-button');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // You could add analytics tracking here in the future
            console.log(`Link clicked: ${link.textContent}`);
        });
    });

    // Animate on Scroll (optional)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.link-button, .cta-button').forEach(button => {
        observer.observe(button);
    });

    // Navigation configuration
    const navigationMap = {
        'portfolio': 'Portfolio.html',
        'blog': 'https://nextgen05.blogspot.com/',
        'github': 'https://github.com/keerthikumar',
        'linkedin': 'https://www.linkedin.com/in/keerthikumar',
        'twitter': 'https://twitter.com/keerthikumar',
        'instagram': 'https://www.instagram.com/keerthikumar',
        'youtube': 'https://www.youtube.com/keerthikumar',
        'consultation': '/contact'
    };

    // Add click event listeners to action cards and social links
    const actionCards = document.querySelectorAll('.action-card, .primary-cta, .social-icon');
    
    actionCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            
            let key = '';
            if (card.classList.contains('portfolio')) key = 'portfolio';
            else if (card.classList.contains('blog')) key = 'blog';
            else if (card.classList.contains('github')) key = 'github';
            else if (card.classList.contains('linkedin')) key = 'linkedin';
            else if (card.classList.contains('twitter')) key = 'twitter';
            else if (card.classList.contains('instagram')) key = 'instagram';
            else if (card.classList.contains('youtube')) key = 'youtube';
            else if (card.classList.contains('primary-cta')) key = 'consultation';

            if (key && navigationMap[key]) {
                // Check if it's a local file or external URL
                if (navigationMap[key].startsWith('http') || navigationMap[key].startsWith('https')) {
                    window.open(navigationMap[key], '_blank');
                } else {
                    // Local file navigation
                    window.location.href = navigationMap[key];
                }
            }
        });

        // Add hover sound effect
        card.addEventListener('mouseenter', () => {
            const hoverSound = new Audio('hover-sound.mp3');
            hoverSound.volume = 0.2;
            hoverSound.play().catch(error => {
                console.log('Audio play failed:', error);
            });
        });
    });

    // Analytics tracking (optional)
    function trackNavigation(destination) {
        console.log(`Navigated to: ${destination}`);
        // You can integrate with Google Analytics or other tracking services here
        // Example: 
        // if (window.gtag) {
        //     gtag('event', 'navigation', {
        //         'destination': destination
        //     });
        // }
    }
});