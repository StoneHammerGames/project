window.onload = init;

function init()
{
	loadRegisteredCourses();
	var regButton = document.getElementById("regButton");
	regButton.onclick = clickReg;
}

function clickReg()
{
	//get the input
	var coursenuminput = document.getElementById("registercoursenum");
	var coursenumtoadd = coursenuminput.value.toUpperCase();

	//check to see if the input is a listed course and not removed
	var courses = getStoreArray("addedCourses");
	var removedcourses = getStoreArray("removedCourses");
	var foundflag = false;
	var removed = false;

	for (var i = 0; i < removedcourses.length; i++)
	{
		if (coursenumtoadd == removedcourses[i].number)
		{
			alert("I'm sorry, course " + coursenumtoadd + " has been removed.");
			removed = true;
			foundflag = true;
			location.reload();
		} 
	}


	for (var i = 0; i < courses.length; i++)
	{
		if ((coursenumtoadd == courses[i].number) && (removed == false))
		{
			foundflag = true;
			break;
		} 
	}

	if (foundflag)
	{
		if (notRegistered(coursenumtoadd))
		{
			alert("Registering for course " + coursenumtoadd);
			//add the course to the Student's list
			registerCourse(courses[i].name, courses[i].number, courses[i].room);
			location.reload();
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

function notRegistered(coursenumtoadd)
{
	var res = true;
	var courses = getStoreArray("registeredCourses");
	for (var i = 0; i < courses.length; i++)
	{
		if (coursenumtoadd == courses[i].number){
			res = false;
			break;			
		} 
	}
	return res;
}

function getStoreArray(key)
{
	var courses = localStorage.getItem(key);
	if (courses == null || courses == "")
	{
		courses = new Array();
	}
	else
	{
		courses = JSON.parse(courses);
	}
	return courses;
}

function registerCourse(cname, cnumber, croom)
{
	var list = getStoreArray("registeredCourses");
	var newCourse = {name: cname, number: cnumber, room: croom};
	list.push(newCourse);
	localStorage.setItem("registeredCourses", JSON.stringify(list));
}

function loadRegisteredCourses() {
	var courses = getStoreArray("registeredCourses");
	for (var i = 0; i < courses.length; i++)
	{
		var pos = findPos(courses[i].number, courses[i].name);
		if (pos != -1)
		{
			addToTable(pos, courses[i].name, courses[i].number, courses[i].room);
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