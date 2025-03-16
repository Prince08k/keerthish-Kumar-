// Simulated data for demonstration purposes
const trafficData = {
    visits: 1200,
    growth: 12,
    monthlyData: [300, 500, 700, 800, 1200, 1000]
};

const leadsData = {
    count: 300,
    growth: 25
};

const appointmentsData = {
    count: 50,
    growth: 8
};

// Function to update the dashboard with data
function updateDashboard() {
    document.getElementById('traffic').querySelector('.stat-value').textContent = `${trafficData.visits} visits`;
    document.getElementById('traffic').querySelector('small').textContent = `+${trafficData.growth}% from last month`;

    document.getElementById('leads').querySelector('.stat-value').textContent = `${leadsData.count} leads`;
    document.getElementById('leads').querySelector('small').textContent = `+${leadsData.growth}% from last month`;

    document.getElementById('appointments').querySelector('.stat-value').textContent = `${appointmentsData.count} meetings`;
    document.getElementById('appointments').querySelector('small').textContent = `+${appointmentsData.growth}% from last month`;
}

// Function to create a traffic chart
function createTrafficChart() {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Monthly Traffic',
                data: trafficData.monthlyData,
                borderColor: 'rgba(0, 123, 255, 1)',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const skillsList = document.getElementById('skills-list');
    const activityFeed = document.getElementById('activity-feed');
    const addSkillForm = document.getElementById('add-skill-form');

    // Function to add a skill
    addSkillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const skillName = addSkillForm.querySelector('input[type="text"]').value;
        const proficiency = addSkillForm.querySelector('select').value;

        if (skillName && proficiency) {
            const skillItem = document.createElement('li');
            skillItem.textContent = `${skillName} (${proficiency})`;
            skillsList.appendChild(skillItem);

            // Update portfolio section
            const portfolioSkillItem = document.createElement('li');
            portfolioSkillItem.textContent = `${skillName} - ${proficiency}`;
            document.getElementById('skills-portfolio').querySelector('ul').appendChild(portfolioSkillItem);

            // Update activity feed
            const activityItem = document.createElement('li');
            activityItem.textContent = `New Skill Added: ${skillName} - ${proficiency}`;
            activityFeed.appendChild(activityItem);

            // Reset form
            addSkillForm.reset();
        }
    });

    // Additional functions for editing and deleting skills can be added here

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Theme toggle event listeners
    [themeToggle, darkModeToggle].forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Save preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
                darkModeToggle.checked = true;
            } else {
                localStorage.removeItem('dark-mode');
                darkModeToggle.checked = false;
            }
        });
    });

    // Theme color management
    const root = document.documentElement;
    
    // Function to apply theme colors
    function applyTheme(theme) {
        const themes = {
            default: {
                '--bg-primary': '#f0f4f8',
                '--bg-secondary': '#ffffff',
                '--text-primary': '#1a2b3c',
                '--text-secondary': '#4a5568',
                '--accent-primary': '#007bff',
                '--accent-secondary': '#00ffe1'
            },
            dark: {
                '--bg-primary': '#1a2b3c',
                '--bg-secondary': '#2c3e50',
                '--text-primary': '#ffffff',
                '--text-secondary': '#ecf0f1',
                '--accent-primary': '#00ffe1',
                '--accent-secondary': '#007bff'
            }
        };

        const selectedTheme = themes[theme] || themes.default;
        
        Object.entries(selectedTheme).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }

    // Theme toggle functionality (optional)
    const themeToggleColor = document.getElementById('theme-toggle');
    if (themeToggleColor) {
        themeToggleColor.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme') || 'default';
            const newTheme = currentTheme === 'default' ? 'dark' : 'default';
            
            document.body.setAttribute('data-theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // Initial theme application
    applyTheme('default');

    // Sidebar Navigation
    const sidebarItems = document.querySelectorAll('.sidebar-nav li');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('page-title');

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items and contents
            sidebarItems.forEach(i => i.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked item and corresponding tab
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Update page title
            pageTitle.textContent = item.textContent;
        });
    });

    // Update dashboard stats
    function updateDashboardStats() {
        document.getElementById('traffic').querySelector('.stat-value').textContent = `${trafficData.visits} visits`;
        document.getElementById('traffic').querySelector('small').textContent = `+${trafficData.growth}% from last month`;

        document.getElementById('leads').querySelector('.stat-value').textContent = `${leadsData.count} leads`;
        document.getElementById('leads').querySelector('small').textContent = `+${leadsData.growth}% from last month`;

        document.getElementById('appointments').querySelector('.stat-value').textContent = `${appointmentsData.count} meetings`;
        document.getElementById('appointments').querySelector('small').textContent = `+${appointmentsData.growth}% from last month`;
    }

    // Create Charts
    function createCharts() {
        // Traffic Chart
        const trafficCtx = document.getElementById('trafficChart').getContext('2d');
        new Chart(trafficCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                    label: 'Monthly Traffic',
                    data: trafficData.monthlyData,
                    borderColor: 'rgba(0, 123, 255, 1)',
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderWidth: 2,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Skill Progression Chart
        const skillProgressCtx = document.getElementById('skillProgressChart').getContext('2d');
        new Chart(skillProgressCtx, {
            type: 'radar',
            data: {
                labels: ['Web Development', 'UI/UX Design', 'Cloud Computing', 'Data Science', 'Machine Learning'],
                datasets: [{
                    label: 'Skill Level',
                    data: [85, 75, 65, 50, 40],
                    backgroundColor: 'rgba(0, 255, 225, 0.2)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        // Project Impact Chart
        const projectImpactCtx = document.getElementById('projectImpactChart').getContext('2d');
        new Chart(projectImpactCtx, {
            type: 'bar',
            data: {
                labels: ['Portfolio', 'E-commerce', 'CRM System', 'Analytics Tool'],
                datasets: [{
                    label: 'Project Impact',
                    data: [90, 85, 75, 60],
                    backgroundColor: [
                        'rgba(0, 123, 255, 0.6)',
                        'rgba(0, 255, 225, 0.6)',
                        'rgba(255, 107, 107, 0.6)',
                        'rgba(255, 193, 7, 0.6)'
                    ],
                    borderColor: [
                        'rgba(0, 123, 255, 1)',
                        'rgba(0, 255, 225, 1)',
                        'rgba(255, 107, 107, 1)',
                        'rgba(255, 193, 7, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Skills Management (Single Implementation)
    const skillManagement = (() => {
        const addSkillForm = document.getElementById('add-skill-form');
        const skillsList = document.getElementById('skills-list');

        addSkillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const skillInput = addSkillForm.querySelector('input[type="text"]');
            const proficiencySelect = addSkillForm.querySelector('select');

            if (skillInput.value && proficiencySelect.value) {
                const skillItem = document.createElement('li');
                skillItem.innerHTML = `
                    <strong>${skillInput.value}</strong>
                    <span class="skill-proficiency ${proficiencySelect.value.toLowerCase()}">
                        ${proficiencySelect.value}
                    </span>
                `;
                skillsList.appendChild(skillItem);

                // Reset form
                skillInput.value = '';
                proficiencySelect.value = '';
            }
        });
    })();

    // Logout
    const logoutButton = document.querySelector('.logout');
    logoutButton.addEventListener('click', () => {
        // Implement logout logic (e.g., clear session, redirect)
        localStorage.clear();
        window.location.href = 'login.html'; // Redirect to login page
    });

    // Profile Image Upload
    const profileUpload = document.getElementById('profile-upload');
    const uploadBtn = document.getElementById('upload-btn');
    const profilePreview = document.getElementById('profile-preview');
    const saveProfileBtn = document.getElementById('save-profile');

    // Load saved profile image on page load
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
        profilePreview.src = savedProfileImage;
        
        // Update portfolio hero image if on portfolio page
        const portfolioHeroImage = document.querySelector('.hero-image');
        if (portfolioHeroImage) {
            portfolioHeroImage.src = savedProfileImage;
        }
    }

    // Trigger file input when upload button is clicked
    uploadBtn.addEventListener('click', () => {
        profileUpload.click();
    });

    // Preview uploaded image and save to localStorage
    profileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageDataUrl = e.target.result;
                
                // Update preview in dashboard
                profilePreview.src = imageDataUrl;
                
                // Save to localStorage
                localStorage.setItem('profileImage', imageDataUrl);
                
                // Update hero image in portfolio if open
                const portfolioHeroImage = document.querySelector('.hero-image');
                if (portfolioHeroImage) {
                    portfolioHeroImage.src = imageDataUrl;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Save profile changes
    saveProfileBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Save name and email to localStorage
        localStorage.setItem('profileName', name);
        localStorage.setItem('profileEmail', email);

        // Update portfolio hero title if name changes
        const portfolioHeroTitle = document.querySelector('.hero-title');
        if (portfolioHeroTitle) {
            portfolioHeroTitle.textContent = name;
        }

        alert('Profile updated successfully!');
    });

    // Load saved name and email on page load
    const savedName = localStorage.getItem('profileName');
    const savedEmail = localStorage.getItem('profileEmail');
    if (savedName) document.getElementById('name').value = savedName;
    if (savedEmail) document.getElementById('email').value = savedEmail;

    // Initialize dashboard
    updateDashboardStats();
    createCharts();
});

// Call the function to update the dashboard on load
window.onload = function() {
    updateDashboard();
};