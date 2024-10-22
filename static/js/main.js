// main.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Gestor de Mensajes Seguros en Castellano cargado');

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            html.classList.toggle('dark');
            localStorage.setItem('darkMode', html.classList.contains('dark'));
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            html.classList.add('dark');
        }
    }

    // Copiar URL del mensaje al portapapeles
    const urlElement = document.querySelector('.message-url');
    if (urlElement) {
        urlElement.addEventListener('click', function(e) {
            e.preventDefault();
            copyToClipboard(this.href, 'URL copiada al portapapeles');
        });
    }

    // Copiar clave de encriptación al portapapeles
    const encryptionKeyElement = document.querySelector('.encryption-key');
    if (encryptionKeyElement) {
        encryptionKeyElement.addEventListener('click', function(e) {
            e.preventDefault();
            copyToClipboard(this.textContent, 'Clave de encriptación copiada al portapapeles');
        });
    }

    // Calculadora de fecha de expiración
    const expirationInput = document.getElementById('expiration_days');
    const expirationDisplay = document.getElementById('expiration-display');
    if (expirationInput && expirationDisplay) {
        function updateExpirationDate() {
            const days = parseInt(expirationInput.value);
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + days);
            expirationDisplay.textContent = `El mensaje expirará el: ${expirationDate.toLocaleDateString('es-ES')}`;
        }
        expirationInput.addEventListener('input', updateExpirationDate);
        updateExpirationDate(); // Initial update
    }

    // Confirmación antes de borrar un mensaje
    const deleteForm = document.querySelector('form[action^="/delete/"]');
    if (deleteForm) {
        deleteForm.addEventListener('submit', function(e) {
            if (!confirm('¿Estás seguro de que quieres borrar este mensaje? Esta acción no se puede deshacer.')) {
                e.preventDefault();
            }
        });
    }

    // Mostrar/ocultar contraseña
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.textContent = 'Mostrar';
        toggleButton.classList.add('text-sm', 'text-blue-600', 'hover:underline', 'ml-2', 'dark:text-blue-400');
        input.parentNode.insertBefore(toggleButton, input.nextSibling);

        toggleButton.addEventListener('click', function() {
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = 'Ocultar';
            } else {
                input.type = 'password';
                this.textContent = 'Mostrar';
            }
        });
    });

    function copyToClipboard(text, message) {
        navigator.clipboard.writeText(text).then(() => {
            alert(message);
        }).catch(err => {
            console.error('Error al copiar al portapapeles: ', err);
        });
    }
});
