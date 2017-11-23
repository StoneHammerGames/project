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
function loadRemovedCourses()
{
	var courses = getStoreArray("removedCourses");
	for (var i = 0; i < courses.length; i++)
	{
		addToTable(courses[i].name, courses[i].number, courses[i].room, courses[i].time);
	}
}
function addToTable(name, number, room, time)
{
	var table = document.getElementById("catalogTable");
	var row = table.insertRow(table.rows.length);
	var newName = row.insertCell(0);
	var newNumber = row.insertCell(1);
	var newRoom = row.insertCell(2);
	var newTime = row.insertCell(3);
	newName.innerHTML = name;
	newNumber.innerHTML = number;
	newRoom.innerHTML = room;
	newTime.innerHTML = mapMonth(time.month) + " " + time.day + ", " + time.year;
	row.setAttribute("id",number);
}
function mapMonth(number)
{
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return months[number];
}
window.onload = loadRemovedCourses;