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
      loadRemovedCourses();
    }
  }
  request.send(null);
}
function loadRemovedCourses()
{
	var courses = removedCourses;
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
window.onload = init;