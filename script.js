document.querySelector('button').addEventListener('click', () => {
    alert('Button clicked!');
});

const aboutSection = document.querySelector('section');
aboutSection.innerHTML = '<p>This is updated dynamically using JavaScript!</p>';

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    const nameInput = document.querySelector('#name');
    if (nameInput.value.trim() === '') {
        e.preventDefault();
        alert('Name is required!');
    }
});

function navigateTo(event, url) {
    event.preventDefault(); // Prevent default navigation
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.querySelector('main').innerHTML;

            // Replace the main content with the new page's main content
            document.querySelector('main').innerHTML = mainContent;

            // Update the browser's history
            window.history.pushState({}, '', url);
        })
        .catch(err => console.error('Failed to navigate:', err));
}

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    const currentUrl = window.location.pathname;
    fetch(currentUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.querySelector('main').innerHTML;
            document.querySelector('main').innerHTML = mainContent;
        });
});
