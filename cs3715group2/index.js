/**
 * 
 */
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var map = {};
map["/"] = requestHandlers.indexHTML;
map["/index.html"] = requestHandlers.indexHTML;
map["/catalog.html"] = requestHandlers.catalogHTML;
map["/student.html"] = requestHandlers.studentHTML;
map["/previouscourses.html"] = requestHandlers.previouscoursesHTML;
map["/default.css"] = requestHandlers.defaultCSS;
map["/tablets.css"] = requestHandlers.tabletsCSS;
map["/smartphones.css"] = requestHandlers.smartphonesCSS;
map["/script.js"] = requestHandlers.scriptJS;
map["/addRemove.js"] = requestHandlers.addRemoveJS;
map["/register.js"] = requestHandlers.registerJS;
map["/loadTable.js"] = requestHandlers.loadTableJS;
map["/images/GVU.png"] = requestHandlers.imagesGVU;
map["/images/campus1_thumb.png"] = requestHandlers.imagesCampus1Thumb;
map["/images/campus2_thumb.png"] = requestHandlers.imagesCampus2Thumb;
map["/images/campus3_thumb.png"] = requestHandlers.imagesCampus3Thumb;

server.start(router.route, map);

//60!!!!