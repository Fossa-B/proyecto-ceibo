document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        let errors = [];

        // Client-side validation
        if (!nombre) {
            errors.push("Por favor, ingresa tu nombre.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.push("Por favor, ingresa un email válido.");
        }

        if (!mensaje) {
            errors.push("Por favor, escribe un mensaje.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // Create a JSON object to send
        const formData = {
            nombre: nombre,
            email: email,
            mensaje: mensaje
        };

        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Tell the server that we are sending JSON data
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) { // If the response status is not OK
                throw new Error('Network response was not ok');
            }
            return response.json(); // Only attempt to parse JSON if the response is valid
        })
        .then(data => {
            if (data.errors) {
                alert(data.errors.join("\n"));
            } else {
                alert(data.message);
                form.reset(); // Reset the form if successful
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al enviar el formulario.');
        });
    });
});