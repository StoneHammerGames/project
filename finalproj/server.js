/**
 * http://usejsdoc.org/
 */
var http = require("http");
var url = require("url");

function start(routeFunction, map)
{
	function onRequest(request, response)
	{
		var pathname = url.parse(request.url).pathname;
		
		routeFunction(map, pathname, response);
	}
	http.createServer(onRequest).listen(3332);
}
exports.start = start;