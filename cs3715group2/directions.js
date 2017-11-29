/**
 * http://usejsdoc.org/
 */
function getUrlVars() {
    var campusName = "";
	var url = window.location.href,
        vars = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
         key = decodeURIComponent(key);
         value = decodeURIComponent(value);
         campusName = value;
    });
    return campusName;
}
var campusName = getUrlVars();

function init()
{	 	
	console.log("running init");
	//Setting the header to the correct campus name
	document.getElementById("heading").innerHTML = campusName;
}

var map = null;
var ourCoords =  {
    latitude: 47.624851,
    longitude: -122.52099
};
 
window.onload = getMyLocation;
 
function getMyLocation() {
	init();
    if (navigator.geolocation) {
 
        navigator.geolocation.getCurrentPosition(
            displayLocation,
            displayError);
    }
    else {
        alert("Oops, no geolocation support");
    }
}
 
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
 
    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
 
    showMap(position.coords);
    console.log(latitude + " " + longitude);
}

 
function showMap(coords) {
	console.log("show map "+coords);
    var googleLatAndLong = new google.maps.LatLng(coords.latitude,
                                                  coords.longitude);
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
   
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
   
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
}
 
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: {lat: 47.50, lng: -52.99}, //GEOLOCATION NEEDS TO BE SET
      destination: {lat: 47.50, lng: -52.99},
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        console.log("window should be displayed now");
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
 
function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
	}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied",
        2: "Position is not available",
        3: "Request timeout"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}