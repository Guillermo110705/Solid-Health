document.addEventListener("DOMContentLoaded", function() {
    const associationsContainer = document.getElementById('associations');
    const categoryFilter = document.getElementById('category');
  
    // Cargar asociaciones desde el archivo JSON
    fetch('associations.json')
      .then(response => response.json())
      .then(data => {
        renderAssociations(data);
  
        // Escuchar cambios en el filtro de categoría
        categoryFilter.addEventListener('change', function() {
          const selectedCategory = this.value;
          renderAssociations(data, selectedCategory);
        });
      })
      .catch(error => console.error('Error al cargar asociaciones:', error));
  
    // Función para renderizar las asociaciones
    function renderAssociations(data, category = 'all') {
      associationsContainer.innerHTML = '';
  
      data.forEach(association => {
        if (category === 'all' || association.category === category) {
          const associationElement = document.createElement('div');
          associationElement.classList.add('association');
          associationElement.innerHTML = `
            <h2>${association.name}</h2>
            <p>${association.description}</p>
            <a href="${association.website}" target="_blank">Sitio web de ${association.name}</a>
          `;
          associationsContainer.appendChild(associationElement);
        }
      });
    }
  });
  