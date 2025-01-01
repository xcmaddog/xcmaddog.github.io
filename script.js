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

document.addEventListener("DOMContentLoaded", function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
});

