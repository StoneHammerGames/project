/**
 * http://usejsdoc.org/
 */

var fs = require('fs');

function addinfo(user, info){
	
	var obj = {
			table: []
	};
	
	obj.table.push({id: user, information:info});
	
	var json = JSON.stringify(obj);
	
	
	fs.writeFile('myjsonfile.json', json, 'utf8', callback);
}

function retrieveInfo(user){	
	var returnData;
	fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
	    if (err){
	        console.log(err);
	    } else {
	    obj = JSON.parse(data); //now it an object
	    obj.table.push({id: 2, square:3}); //add some data
	    json = JSON.stringify(obj); //convert it back to json
	    returnData = fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
	}});
	return returnData;
}
