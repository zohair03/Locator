let map;
let marker;
let savedLocations = [];

function initMap(lat = 19.04436, lng = 72.859417) {
  const location = { lat, lng };

  
  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 15,
  });

  
  marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: true,
    mapTypeId: "satellite",
    title: "Drag me to your location",
  });

  
  marker.addListener("dragend", () => {
    const newLat = marker.getPosition().lat();
    const newLng = marker.getPosition().lng();

    
    document.getElementById("lat").textContent = newLat.toFixed(6);
    document.getElementById("lng").textContent = newLng.toFixed(6);
  });
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        
        initMap(lat, lng);

        
        document.getElementById("lat").textContent = lat.toFixed(6);
        document.getElementById("lng").textContent = lng.toFixed(6);
      },
      () => {
        alert("Give location permision to your browser.");
      }
    );
  } else {
    alert("Give location permision to your browser.");
  }
}


function addLocation() {
  const lat = document.getElementById("lat").textContent;
  const lng = document.getElementById("lng").textContent;
  const locationName = document.getElementById("locationName").value;

  if (!locationName) {
    alert("Please enter a name for this location.");
    return;
  }

  const location = { lat, lng, name: locationName };


  savedLocations.push(location);
  updateLocationList();


  document.getElementById("locationName").value = "";
}


function updateLocationList() {
  const locationList = document.getElementById("locations");
  locationList.innerHTML = ""; 

  savedLocations.forEach((location, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${location.name} - Lat: ${
      location.lat
    }, Lng: ${location.lng}`;
    locationList.appendChild(li);
  });
}


window.onload = () => {
  initMap();
};
