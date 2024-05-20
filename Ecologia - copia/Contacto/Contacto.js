document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
  
    fetch(this.getAttribute('action'), {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      const responseDiv = document.getElementById('response');
      responseDiv.textContent = data.message;
      responseDiv.className = data.success ? 'success' : 'error';
    })
    .catch(error => console.error('Error al enviar el formulario:', error));
  });
  