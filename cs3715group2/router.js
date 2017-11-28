/**
 * http://usejsdoc.org/
 */
function route(map, pathname, response, postdata)
{
	console.log("Routing to "+ pathname);
	if (postdata == "")
	{
		if (typeof map[pathname] === 'function')
		{
			map[pathname](response);		
		}
		else
		{
			console.log("No request handler found for: " + pathname);
			response.writeHead(404, {"Content-Type": "text-plain"});
			response.write("404 Not found");
			response.end();
		}
	}
	else
	{
		map[pathname](response, postdata);
	}
}
exports.route = route;