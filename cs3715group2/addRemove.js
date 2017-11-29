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
console.log("the campus selected is");
console.log(campusName);

var addedCourses = [];
var removedCourses = [];

function init()
{	
  var url = "courseData.json";
  var data;
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function()
  {
    if (request.status == 200)
    {
      data = request.responseText;
      data = JSON.parse(data);
      addedCourses = data["addedCourses"];
      removedCourses = data.removedCourses;
      afterInit();
    }
  }
  request.send(null);
}

function afterInit()
{
	loadAddedCourses();
	//loadRemovedCourses();
	var addButton = document.getElementById("addButton");
	var remButton = document.getElementById("remButton");
	var regButton = document.getElementById("regButton");
	addButton.onclick = clickAdd;
	remButton.onclick = clickRem;
	regButton.onclick = clickReg;
	
	//Setting the header to the correct campus name
	document.getElementById("heading").innerHTML = campusName;
	
}

function clickAdd()
{
	var name = document.getElementById("addName");
	var number = document.getElementById("addNumber");
	var room = document.getElementById("addRoom");
	var cname = name.value;
	var cnumber = number.value.toUpperCase();
	var croom = room.value.toUpperCase();
	if (cnumber != "" && cname != "" && croom != "")
	{
		var pos = findPos(cnumber, cname);
		if (pos != -1)
		{
			addToTable(pos, cname, cnumber, croom);
			saveCourse(cname, cnumber, croom);
		}
		else
		{
			alert("Study program not found or the course number already exists. The course won't be added");
		}
		name.value = "";
		number.value = "";
		room.value = "";
	}
	else
	{
		alert("Please complete all the fields");
	}
}

function clickRem()
{
	var text = document.getElementById("remNumber");
	var cnumber = text.value.toUpperCase();
	if (cnumber != "")
	{
		var row = document.getElementById(cnumber);
		if (row != null)
		{
			saveDeletedCourse(row);
			removeFromTable(row);
		}
		else
		{
			alert("There is not a course with number: " + cnumber);
		}
	}
	else
	{
		alert("Please enter a course number");
	}
	text.value = "";
}

//SS
function clickReg()
{
  var studentName = document.getElementById("sName").value;
  if (studentName != "")
  {
    //get the input
    var coursenuminput = document.getElementById("registercoursenum");
    var coursenumtoadd = coursenuminput.value.toUpperCase();

    var found = false;
    var i = -1;
    for (i = 0; i < addedCourses.length; i++)
    {
      if (coursenumtoadd == addedCourses[i].number)
      {
        found = true;
        break;
      } 
    }

    if (found)
    {
      loadRegisteredCourses(studentName, coursenumtoadd, i);
    }
    else
    {
      alert("Course not found.");
    } 
  }
  else
  {
    alert("Please select your name");
  }
}

function loadRegisteredCourses(studentName, coursenumtoadd, i)
{
  var url = "studentData.json";
  var data;
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function()
  {
    if (request.status == 200)
    {
      data = request.responseText;
      data = JSON.parse(data);
      if (notRegistered(data[studentName], coursenumtoadd))
      {
        alert("Registering for course " + coursenumtoadd);
        //add the course to the Student's list
        registerCourse(data, studentName, addedCourses[i].name, addedCourses[i].number, addedCourses[i].room);
        location.reload();
      }
      else
      {
        alert("You are already registered for course: " + coursenumtoadd);
      }
    }
  }
  request.send(null);
}

function notRegistered(courses, coursenumtoadd)
{
	var res = true;
	for (var i = 0; i < courses.length; i++)
	{
		if (coursenumtoadd == courses[i].number){
			res = false;
			break;			
		} 
	}
	return res;
}

//find the corresponding position of the new row, assuming the rows are sorted
function findPos(cnumber, cname)
{
	var table = document.getElementById("courseTable");
	var rows = table.rows;
	var sameProgram = false;
	var newProgram = false;
	var res = -1;
	for (var i = 0; i < rows.length; i++)
	{
		var cols = rows[i].getElementsByTagName("td");
		if (cols.length == 3)
		{
			var name = cols[0].innerHTML;
			var number = cols[1].innerHTML;
			if (newProgram && !sameProgram)
			{
				sameProgram = match(number.toLowerCase(),cnumber.toLowerCase());
				newProgram = false;
			}
			if (sameProgram)
			{
        if (cnumber == number)
				{
					res = -1;
					break;
				}
				if (cname.toLowerCase() > name.toLowerCase())
				{
					res = i+1;
				}
				else
				{
					res = i;
					break;
				}
			}
		}
		else
		{
			newProgram = true;
			if (sameProgram)
			{
				break;
			}
		}
	}
	return res;
}
//check if both strings correspond to the same study program
function match(course1, course2)
{
	var res = true;
	var len = Math.min(course1.length,course2.length);
	for (var i = 0; i < len; i++)
	{
		if (isLetter(course1.charAt(i)) && isLetter(course2.charAt(i)))
		{
			if (course1.charAt(i) != course2.charAt(i))
			{
				res = false;
				break;
			}
		}
		else if (!isLetter(course1.charAt(i)) && !isLetter(course2.charAt(i)))
		{
			break;
		}
		else
		{
			res = false;
			break;
		}
	}
	return res;
}
function isLetter(character)
{
	var res;
	if ((character >= 'a' && character <= 'z'))
	{
		res = true;
	}
	else
	{
		res = false;
	}
	return res;
}


function loadAddedCourses() {
	var courses = addedCourses;
	for (var i = 0; i < courses.length; i++)
	{
		var pos = findPos(courses[i].number, courses[i].name);
		if (pos != -1)
		{
			addToTable(pos, courses[i].name, courses[i].number, courses[i].room);
		}
	}
}

function addToTable(pos, name, number, room)
{
	var table = document.getElementById("courseTable");
	var row = table.insertRow(pos);
	var newName = row.insertCell(0);
	var newNumber = row.insertCell(1);
	var newRoom = row.insertCell(2);
	newName.innerHTML = name;
	newNumber.innerHTML = number;
	newRoom.innerHTML = room;
	row.setAttribute("id",number);
}

function removeFromTable(row)
{
	var table = document.getElementById("courseTable");
	table.deleteRow(row.rowIndex);
}

/*function loadRemovedCourses()
{
	var courses = removedCourses;
	for (var i = 0; i < courses.length; i++)
	{
		var row = document.getElementById(courses[i].number);
		removeFromTable(row);
	}
}*/

function saveCourseData()
{
  var fullData = { addedCourses: addedCourses, removedCourses: removedCourses};
  fullData = JSON.stringify(fullData);
  //console.log(fullData);
  var params = 'data='+fullData;
  var request = new XMLHttpRequest();
  request.open("POST", "/writeCourseData");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(params);
}

function saveRegisteredCourses(courses)
{
  courses = JSON.stringify(courses);
  var params = 'data='+courses;
  var request = new XMLHttpRequest();
  request.open("POST", "/writeRegisteredCoursesData");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(params);
}

function saveCourse(cname, cnumber, croom)
{
	var newCourse = {name: cname, number: cnumber, room: croom};
  addedCourses.push(newCourse);
  removeFromArray(removedCourses, newCourse);
	saveCourseData();
}

function removeFromArray(courses, newCourse)
{
  var index = -1;
  for (var i = 0; i < courses.length; i++)
  {
    if (courses[i].name == newCourse.name && courses[i].number == newCourse.number && courses[i].room == newCourse.room)
    {
      index = i;
      break;
    }
  }
  if (index != -1)
  {
    courses.splice(index,1);
  }
}

function registerCourse(list, studentName, cname, cnumber, croom)
{
	var newCourse = {name: cname, number: cnumber, room: croom};
	list[studentName].push(newCourse);
	saveRegisteredCourses(list);
}

function saveDeletedCourse(row)
{
	var newCourse = createNew(row);
	removedCourses.push(newCourse);
  removeFromArray(addedCourses, newCourse);
	saveCourseData();
}

function createNew(row)
{
	name = row.cells[0].innerHTML;
	number = row.cells[1].innerHTML;
	room = row.cells[2].innerHTML;
	var d = new Date();
	time = {day: d.getDate(), month: d.getMonth(), year: d.getFullYear()};
	var newCourse = {name: name, number: number, room: room, time: time};
	return newCourse;
}
window.onload = init;

