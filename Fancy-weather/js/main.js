let map;
let latitude = 53.902564567768394;
let longitude = 27.55628244855248;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},    
    disableDefaultUI: true,
    zoom: 10      
  });  
}