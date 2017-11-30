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
var long = 1.11;
var lati = 1.11;

function init()
{	 	
	console.log("running init");
	//Setting the header to the correct campus name
	document.getElementById("heading").innerHTML = campusName;
	getCampusLocation();
}
function getCampusLocation(){
	switch(campusName){
	case "Caltex Centre" : lati=parseFloat('47.50'); long=parseFloat('-52.99'); break;
	case "Ferris College" : lati=parseFloat('47.52'); long=parseFloat('-52.81'); break;
	case "Ableman Institute" : lati=parseFloat('47.53'); long=parseFloat('-52.90'); break;
	default : console.log("no campus");
	}
}


function getMyLocation() {
	init();
	console.log("long and lat are "+long+ " and " + lati);
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
	showMap(position.coords);
}

function showMap(coords) {
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
	calculateAndDisplayRoute(directionsService, directionsDisplay, googleLatAndLong);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, googleLatAndLong) {
    directionsService.route({
      origin: googleLatAndLong,
      //destination: {lat: 47.50, lng: -52.99},
      destination: {lat: lati, lng: long},
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