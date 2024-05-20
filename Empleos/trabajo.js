document.getElementById('employmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const position = document.getElementById('position').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const education = document.getElementById('education').value.trim();
    const skills = document.getElementById('skills').value.trim();
    const resume = document.getElementById('resume').files[0];

    // Validación detallada
    if (!name || !email || !phone || !address || !position || !experience || !education || !skills || !resume) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Por favor, introduce un número de teléfono válido.');
        return;
    }

    alert('Formulario enviado con éxito!');

    // Aquí puedes agregar la lógica para enviar el formulario a un servidor si es necesario.
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(String(phone));
}
