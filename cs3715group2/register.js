window.onload = init;
var addedCourses = [];
var registeredCourses = {};

function init()
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
      registeredCourses = data;
      var select = document.getElementById("sName");
      select.onchange = function()
      {
        if (select.value != "")
        {
          loadRegisteredCourses(registeredCourses[select.value]);
        }
        
      }
      var regButton = document.getElementById("regButton");
      regButton.onclick = clickReg;
    }
  }
  request.send(null);
}

function clickReg()
{
  var studentName = document.getElementById("sName").value;
  if (studentName != "")
  {
    //get the input
    var coursenuminput = document.getElementById("registercoursenum");
    var coursenumtoadd = coursenuminput.value.toUpperCase();
    
    loadAdded(coursenumtoadd, studentName);
  }
  else
  {
    alert("Please select your name");
  }
}

function loadAdded(coursenumtoadd, studentName)
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
      validateAndRegister(coursenumtoadd, studentName);
    }
  }
  request.send(null);
}

function validateAndRegister(coursenumtoadd, studentName)
{
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
    if (notRegistered(registeredCourses[studentName], coursenumtoadd))
    {
      alert("Registering for course " + coursenumtoadd);
      //add the course to the Student's list
      registerCourse(registeredCourses, studentName, addedCourses[i].name, addedCourses[i].number, addedCourses[i].room);
      //location.reload();
    }
    else
    {
      alert("You are already registered for course: " + coursenumtoadd);
    }
  }
  else
  {
    alert("Course not found.");
  } 
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

function saveRegisteredCourses(courses)
{
  courses = JSON.stringify(courses);
  var params = 'data='+courses;
  var request = new XMLHttpRequest();
  request.open("POST", "/writeRegisteredCoursesData");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(params);
}

function registerCourse(list, studentName, cname, cnumber, croom)
{
	var newCourse = {name: cname, number: cnumber, room: croom};
  var pos = findPos(cnumber, cname);
  if (pos != -1)
  {
    addToTable(pos, cname, cnumber, croom);
  }
	list[studentName].push(newCourse);
	saveRegisteredCourses(list);
}

function loadRegisteredCourses(courses) {
  cleanTable();
	for (var i = 0; i < courses.length; i++)
	{
		var pos = findPos(courses[i].number, courses[i].name);
		if (pos != -1)
		{
			addToTable(pos, courses[i].name, courses[i].number, courses[i].room);
		}
	}
}

function cleanTable()
{
	var table = document.getElementById("regTable");
  var rows = table.rows;
  for (var i = 1; i < rows.length; i++)
  {
    var cols = rows[i].getElementsByTagName("td");
    if (cols[1].innerHTML != "CS4754")
    {
      table.deleteRow(i);
    }
  }
	
}

function findPos(cnumber, cname)
{
	var table = document.getElementById("regTable");
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
	return res;
}

function addToTable(pos, name, number, room)
{
	var table = document.getElementById("regTable");
	var row = table.insertRow(pos);
	var newName = row.insertCell(0);
	var newNumber = row.insertCell(1);
	var newRoom = row.insertCell(2);
	newName.innerHTML = name;
	newNumber.innerHTML = number;
	newRoom.innerHTML = room;
	row.setAttribute("id",number);
}