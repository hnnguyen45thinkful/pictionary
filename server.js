var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

// Here is what adding over here for the emit drawing event for the io.on //
// The event should contain the position object as data.//
// In server.js, listen for the draw event, and broadcast it out to all other clients.//
//Start ar user equal 1.
var user = 1;

io.on('connection', function (socket) {
	
	socket.emit('user', user);
    user++;
    
    socket.on('draw', function(position) {
       io.sockets.emit('draw', position);
    });
    
    socket.on('guess', function(guess){
       io.sockets.emit('guess', guess); 
    });
    
});

//Applying the console.log for the localhose:8080//.
server.listen(process.env.PORT || 8080);
console.log('Server is running at http://localhost:8080');

// Challenges
// Networking the drawing
// Now that you know how to draw to the canvas, try making this networked using Socket.IO. In order to do this you will need to:

// Emit a draw event from your mousemove function to the Socket.IO server.
// The event should contain the position object as data.
// In server.js, listen for the draw event, and broadcast it out to all other clients.
// Listen for the broadcast draw event in public/main.js, and call the draw function when it is received
// Only draw on mousedown
// In order to make the drawing experience nicer, alter the code in public/main.js, so that it only draws when the mouse button is held down. In order to achieve this you will need to:

// Listen for the mousedown event
// When the event is fired, set a variable called drawing to true
// Listen for the mouseup event
// When the event is fired, set the drawing variable to false
// Only perform the mousemove actions when drawing is set to true