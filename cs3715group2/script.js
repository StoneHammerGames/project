window.onload = init;

function init(){
	
	//Adds sample text on first visit, and after each clear
	checkFirstVisit();
	
	//Event Submit Button
	var eventsubmitbutton = document.getElementById("eventsubmit");
	eventsubmitbutton.onclick = handleEventSubmitClick;
	loadEventList();

	//Clear data button
	var clearButton = document.getElementById("clrButton");
	clearButton.onclick = clearStorage;
	
	//Default data button
	var defaultButton = document.getElementById("rstButton");
	defaultButton.onclick = setDefault;
	
	//Campus Info Update Button
	var campusinfosubmitbutton = document.getElementById("campusinfosubmit");
	campusinfosubmitbutton.onclick = handleCampusInfoSubmitClick;

	//Loading the campus information
	loadCampusList("1");
	loadCampusList("2");
	loadCampusList("3");
}

function checkFirstVisit(){
	if (localStorage.getItem("firstvisit") == "no"){
		console.log("do nothing");
	}
	else{
		localStorage.setItem("firstvisit", "no");
		fillSampleText();
	}
}


function clearStorage() {
	localStorage.clear();
	localStorage.setItem("firstvisit", "no");
	alert("All data cleared!");
}

function setDefault(){
	clearStorage();
	fillSampleText();
	alert("Set to default!");
}	
	
function handleEventSubmitClick(){

	//grab the name of the event from the text box
	var eventtextbox = document.getElementById("eventname"); 
	eventtext = eventtextbox.value;

	//create the element with the text as its value
	var li = document.createElement("li");
	li.innerHTML = eventtext;

	//add the element to the list
	var eventlist = document.getElementById("eventlist");
	eventlist.appendChild(li);
	
	//saving
	saveArray(eventtext, "eventlist"); //New. Saves (pushes) the first argument to the array named in the second argument -SS

}

function handleCampusInfoSubmitClick(){

	//determine which campus to update from the selection box
	var campusselect = document.getElementById("campusinfoselect");
	var num = campusselect.value;
	
	//var campustoupdate = document.getElementById(num);
	var campustoupdate = `${num}`;

	//get the input text from the text box
	var campusinfotextbox = document.getElementById("campusinfotext");
	eventtext = campusinfotextbox.value;
	
	//create the element with the text as its value
	var li = document.createElement("li");
	li.innerHTML = eventtext;

	//add the element to the list
	var campuslist = document.getElementById(campustoupdate);
	campuslist.appendChild(li);
	
	//saving
	saveArray(eventtext, campustoupdate);	
}


//===========Saving/Loading arrays=====================================

function saveArray(item, arrayname) {	
	var array = getStoreArray(arrayname);
	array.push(item);
	localStorage.setItem(arrayname, JSON.stringify(array));
}

function loadEventList() {
	var eventListArray = getSavedEvents();
	var ul = document.getElementById("eventlist");
	if (eventListArray != null) {
		for (var i = 0; i < eventListArray.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = eventListArray[i];
			ul.appendChild(li);
		}
	}
}

function getSavedEvents() {
	return getStoreArray("eventlist");
}

function getStoreArray(key) {
	var eventListArray = localStorage.getItem(key);
	if (eventListArray == null || eventListArray == "") {
		eventListArray = new Array();
	}
	else {
		eventListArray = JSON.parse(eventListArray);
	}
	return eventListArray;
}

//================Savid/Loading Campus info========================================
function loadCampusList(num) {
	var campustoupdate = `campus${num}info`;
	var eventListArray = getSavedCampus(campustoupdate);
	var ul = document.getElementById(campustoupdate);
	if (eventListArray != null) {
		for (var i = 0; i < eventListArray.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = eventListArray[i];
			ul.appendChild(li);

		}
	}
}
function getSavedCampus(campustoupdate) {
	return getStoreArray(campustoupdate);
}
//==================================================================================

//Text to fill the page on the first visit
function fillSampleText(){
	saveArray("Monday - Basketball Game", "eventlist"); 
	saveArray("Tuesday - Another thing", "eventlist"); 
	saveArray("Wednesday - Another thing", "eventlist"); 
	saveArray("Thursday - Another thing", "eventlist"); 
	saveArray("Friday - Another thing", "eventlist"); 
	saveArray("Saturday - Another thing", "eventlist"); 
	saveArray("Sunday - Another thing", "eventlist"); 

	saveArray("The new high-tech institute, great for students willing to get involved with technology.", "campus1info");
	saveArray("Its main study programs are Computer Science and Computer Engineering", "campus1info");

	saveArray("The campus with great history behind it.", "campus2info");
	saveArray("Its main study programs are Chemistry, Anthropology, English and Language Studies.", "campus2info");
	
	saveArray("The first campus.", "campus3info");
	saveArray("Its main study programs are Philosophy and Music", "campus3info");
}