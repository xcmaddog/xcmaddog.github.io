document.addEventListener('DOMContentLoaded', () => {
    // Handle button click event
    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', () => {
            alert('Button clicked!');
        });
    }

    // Update aboutSection dynamically if it exists
    //const aboutSection = document.querySelector('section');
    //if (aboutSection) {
    //    aboutSection.innerHTML = '<p>This is updated dynamically using JavaScript!</p>';
    //}

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

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Add CSS for dark mode
    const style = document.createElement('style');
    style.textContent = `
        .dark-mode {
            background-color: #333;
            color: white;
        }
    `;
    document.head.appendChild(style);

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
