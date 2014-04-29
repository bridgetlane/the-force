/*
@author Nathan Murray
@url N/A
@lastupdated 2014-04-28
@version 1.0.0
@comments server-side code for the force
*/

var app = require('http').createServer(starter),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	path = require('path')
	
app.listen(80);
var url = require('url');
var folder = __dirname + '/public/';

extensions = {
	".html" : "text/html",
	".css" : "text/css",
	".js" : "application/javascript",
	".png" : "image/png",
	".gif" : "image/gif",
	".jpg" : "image/jpeg"
}

function getFile(filePath, response, type){
	fs.exists(filePath, function(exists){
		if(exists){
			fs.readFile(filePath, function(error, contents){
				if(!error){
					headers(response, type);
					response.end(contents);
				}
				else{
					console.dir(error);
				};
			});
		}
		else {
			send404(response);
		};
	});
};

var speed = 0;
var turnSpeed = 0;
function starter(request, response){
	//console.log('Connection');
	var name = url.parse(request.url).pathname;
	var ext = path.extname(name);
	
	switch(name){
        case '/':
            headers(response, 'text/html');
            response.end();
            break;
        /*case '/server.html':
            fs.readFile(__dirname + name, function(err, data){
                if (err){ 
                    return send404(response);
                }
                headers(response, 'text/html');
                response.write(data, 'utf8');
                response.end();
            });*/
			//break
        /*case '/controller.html':
        	fs.readFile(__dirname + name, function(err, data){
        		if(err){
        			return send404(response);
        		}
        		headers(response, 'text/html');
        		response.write(data, 'utf8');
        		response.end();
        	});*/
        	//break;
        //default: send404(response);
		default: getFile((folder + name), response, extensions[ext]);
    }
};

function headers(response, type){
	response.writeHead(200, {'Content-Type': type, 'Speed': speed, 'TurnSpeed': turnSpeed});
}

send404 = function(response){
	response.writeHead(404);
	response.write('404 : File does not exist');
	response.end();
}

io.set('log level', 1);

io.sockets.on('connection', function(socket) {
	
	socket.on('updateSpeed', function(spd, trnSpd){
		console.log('forward speed: ' + spd + ' turn speed: ' + trnSpd);
		speed = spd;
		turnSpeed = trnSpd;
	});
});