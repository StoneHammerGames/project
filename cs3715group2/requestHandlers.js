/**
 * http://usejsdoc.org/
 */
var fs = require("fs");

function writeCourseData(response, data)
{
	console.log(data);
	writeMyFile("courseData.json", data, response);
}

function writeRegisteredCoursesData(response, data)
{
	console.log(data);
	writeMyFile("studentData.json", data, response);
}

function writeMainData(response, data)
{
	console.log(data);
	writeMyFile("mainData.json", data, response);
}

function writeMyFile(name, data, response)
{
  fs.writeFile(name,data, "utf8", function(err){
    if(err)
    {
      console.log("Unable to write the data");
    }
    response.end();
  });
}

function indexHTML(response)
{
	readFileFunction(response, "index.html", "text/html");
}

function catalogHTML(response)
{
	readFileFunction(response, "catalog.html", "text/html");
}

function studentHTML(response)
{
	readFileFunction(response, "student.html", "text/html");
}

function previouscoursesHTML(response)
{
	readFileFunction(response, "previouscourses.html", "text/html");
}

function defaultCSS(response)
{
	readFileFunction(response, "default.css", "text/css");
}

function tabletsCSS(response)
{
	readFileFunction(response, "tablets.css", "text/css");
}

function smartphonesCSS(response)
{
	readFileFunction(response, "smartphones.css", "text/css");
}

function scriptJS(response)
{
	readFileFunction(response, "script.js", "text/javascript");
}

function addRemoveJS(response)
{
	readFileFunction(response, "addRemove.js", "text/javascript");
}

function registerJS(response)
{
	readFileFunction(response, "register.js", "text/javascript");
}

function loadTableJS(response)
{
	readFileFunction(response, "loadTable.js", "text/javascript");
}

function courseDataJSON(response)
{
	readFileFunction(response, "courseData.json", "application/json");
}

function studentDataJSON(response)
{
	readFileFunction(response, "studentData.json", "application/json");
}

function mainDataJSON(response)
{
	readFileFunction(response, "mainData.json", "application/json");
}

function imagesGVU(response)
{
	readFileImg(response, "images/GVU.png", "image/png");
}

function imagesCampus1Thumb(response)
{
	readFileImg(response, "images/campus1_thumb.png", "image/png");
}

function imagesCampus2Thumb(response)
{
	readFileImg(response, "images/campus2_thumb.png", "image/png");
}

function imagesCampus3Thumb(response)
{
	readFileImg(response, "images/campus3_thumb.png", "image/png");
}

function imagesCampus1Large(response)
{
	readFileImg(response, "images/campus1_large.jpg", "image/jpg");
}

function imagesCampus2Large(response)
{
	readFileImg(response, "images/campus2_large.jpg", "image/jpg");
}

function imagesCampus3Large(response)
{
	readFileImg(response, "images/campus3_large.jpg", "image/jpg");
}

function readFileFunction(response, name, type)
{
	fs.readFile(name, function(err, data){
		if (err)
		{
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(err + "\n");
			response.end();
		}
		else
		{
			response.writeHead(200, {"Content-Type": type});
			response.write(data);
			response.end();
		}
	});
}

function readFileImg(response, name, type)
{
	fs.readFile(name, "binary", function(err, data){
		if (err)
		{
			response.writeHead(500, {"Content-Type" : "text/plain"});
			response.write(err + "\n");
			response.end();
		}
		else
		{
			response.writeHead(200, {"Content-Type": type});
			response.write(data, "binary");
			response.end();
		}
	});
}

exports.indexHTML = indexHTML;
exports.catalogHTML = catalogHTML;
exports.studentHTML = studentHTML;
exports.previouscoursesHTML = previouscoursesHTML;
exports.defaultCSS = defaultCSS;
exports.tabletsCSS = tabletsCSS;
exports.smartphonesCSS = smartphonesCSS;
exports.scriptJS = scriptJS;
exports.addRemoveJS = addRemoveJS;
exports.registerJS = registerJS;
exports.loadTableJS = loadTableJS;
exports.imagesGVU = imagesGVU;
exports.imagesCampus1Thumb = imagesCampus1Thumb;
exports.imagesCampus2Thumb = imagesCampus2Thumb;
exports.imagesCampus3Thumb = imagesCampus3Thumb;
exports.imagesCampus1Large = imagesCampus1Large;
exports.imagesCampus2Large = imagesCampus2Large;
exports.imagesCampus3Large = imagesCampus3Large;
exports.courseDataJSON = courseDataJSON;
exports.studentDataJSON = studentDataJSON;
exports.mainDataJSON = mainDataJSON;
exports.writeCourseData = writeCourseData;
exports.writeMainData = writeMainData;
exports.writeRegisteredCoursesData = writeRegisteredCoursesData;