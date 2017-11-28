/**
 * http://usejsdoc.org/
 */
var http = require("http");
var url = require("url");
var querystring = require('querystring');

function start(routeFunction, map)
{
	function onRequest(request, response)
	{
		request.setEncoding("utf-8");
		console.log(request.method);
		var pathname = url.parse(request.url).pathname;
		if (request.method == "POST")
		{
			var body = '';
			request.addListener("data", function(datachunk)
			{
				body += datachunk;		
			});
			request.addListener("end", function()
			{
				var data = querystring.parse(body).data;
				console.log(data);
				routeFunction(map, pathname, response, data);
			});
		}
		else
		{
			routeFunction(map, pathname, response, "");		
		}
		
	}
	http.createServer(onRequest).listen(3332);
}
exports.start = start;