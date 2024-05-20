function initMap() {
    var location = {lat: -34.603722, lng: -58.381592}; // Cambiar por las coordenadas de tu ubicación
    var map = new google.maps.Map(document.getElementById("googleMap"), {
      center: location,
      zoom: 15,
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Nuestra Empresa"
    });
  }