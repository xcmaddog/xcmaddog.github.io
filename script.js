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

// Slideshow functionality
document.querySelectorAll('.slideshow').forEach(setupSlideshow);

function setupSlideshow(container) {
    const slides = container.querySelectorAll('.slides .slide');
    let currentIndex = 0;
    let slideTimer = null;

    slides.forEach((slide, index) => {
        slide.dataset.index = index;
    });

    function resetSlides() {
        slides.forEach(slide => {
            slide.classList.remove('active', 'next', 'prev');
        });
    }

    function updateSlideshow() {
        resetSlides();
        slides[currentIndex].classList.add('active');
        slides[(currentIndex + 1) % slides.length].classList.add('next');
        slides[(currentIndex - 1 + slides.length) % slides.length].classList.add('prev');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlideshow();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlideshow();
    }

    function resetTimer() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 3000);
    }

    // Event listeners
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            const clickedIndex = parseInt(slide.dataset.index);
            if (clickedIndex === (currentIndex + 1) % slides.length) {
                nextSlide();
            } else if (clickedIndex === (currentIndex - 1 + slides.length) % slides.length) {
                prevSlide();
            }
            resetTimer();
        });
    });    

    // Initialize
    updateSlideshow();
    resetTimer();
}

});
