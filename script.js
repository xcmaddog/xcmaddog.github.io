document.addEventListener('DOMContentLoaded', () => {
    // Handle button click event
    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', () => {
            alert('Button clicked!');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark mode toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Dark Mode';
    document.body.appendChild(toggleButton);

    // Check localStorage for dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    toggleButton.addEventListener('click', () => {
        
        //console.log("Button clicked!"); // Check if the button click is logged
        
        // Toggle dark mode on the body
        document.body.classList.toggle('dark-mode');

        // Save the current state to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check if we are at the root and set basePath accordingly
    const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    const basePath = isRoot ? 'pages/' : '../pages/';

    // Check if the header already exists before adding it
    if (!document.querySelector('header')) {
        fetch(basePath + 'header.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('afterbegin', data);

                // Adjust dynamic links
                const homeLink = document.getElementById('home-link');
                homeLink.setAttribute('href', isRoot ? 'index.html' : '../index.html');

                document.querySelectorAll('.nav-link').forEach(link => {
                    const target = link.getAttribute('data-target');
                    link.setAttribute('href', basePath + target);
                });
            });
    }

    // Check if the footer already exists before adding it
    if (!document.querySelector('footer')) {
        fetch(basePath + 'footer.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);
            });
    }
});
