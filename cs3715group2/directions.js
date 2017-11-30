/**
 * http://usejsdoc.org/
 */
window.onload = getMyLocation;

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



function getMyLocation() {
	if (navigator.geolocation) {

		//navigator.geolocation.getCurrentPosition(
			//displayLocation, 
			//displayError);
		displayLocation();
	}
	else {
		alert("Oops, no geolocation support");
	}
	init();
}

function displayLocation() {
	//var latitude = position.coords.latitude;
	//var longitude = position.coords.longitude;
	var div = document.getElementById("location");
	var hardcoords = {latitude: 47.50, longitude: -52.99}
	showMap(hardcoords);
}

function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, 
												  coords.longitude);
	var mapOptions = {
		zoom: 10,
		center: {lat: 47.50, lng: -52.99},
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
      origin: {lat: 47.58, lng: -52.73},
      destination: {lat: 47.50, lng: -52.99},
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
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