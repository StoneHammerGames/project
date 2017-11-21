function init()
{
	loadAddedCourses();
	loadRemovedCourses();
	var addButton = document.getElementById("addButton");
	var remButton = document.getElementById("remButton");
	var regButton = document.getElementById("regButton");//New. handle registration button -SS
	addButton.onclick = clickAdd;
	remButton.onclick = clickRem;
	regButton.onclick = clickReg;//New.
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
			alert("Study program not found. The course won't be added");
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
				if (cname.toLowerCase() > name.toLowerCase())
				{
					res = i+1;
				}
				else
				{
					res = i;
					break;
				}
				//check if the course is not in the table
				if (cnumber == number)
				{
					res = -1;
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

//local storage part
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
function loadAddedCourses() {
	var courses = getStoreArray("addedCourses");
	for (var i = 0; i < courses.length; i++)
	{
		var pos = findPos(courses[i].number, courses[i].name);
		if (pos != -1)
		{
			addToTable(pos, courses[i].name, courses[i].number, courses[i].room);
		}
	}
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
function loadRemovedCourses()
{
	var courses = getStoreArray("removedCourses");
	for (var i = 0; i < courses.length; i++)
	{
		var row = document.getElementById(courses[i].number);
		removeFromTable(row);
	}
}
function saveCourse(cname, cnumber, croom)
{
	var list = getStoreArray("addedCourses");
	var newCourse = {name: cname, number: cnumber, room: croom};
	list.push(newCourse);
	localStorage.setItem("addedCourses", JSON.stringify(list));
}
function registerCourse(cname, cnumber, croom)
{
	var list = getStoreArray("registeredCourses");
	var newCourse = {name: cname, number: cnumber, room: croom};
	list.push(newCourse);
	localStorage.setItem("registeredCourses", JSON.stringify(list));
}
function saveDeletedCourse(row)
{
	var list = getStoreArray("removedCourses");
	var newCourse = createNew(row);
	list.push(newCourse);
	localStorage.setItem("removedCourses", JSON.stringify(list));
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

