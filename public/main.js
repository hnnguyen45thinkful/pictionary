//Include socket io
var socket = io();
var pictionary = function() {
    //Define the canvas, context, guessBox variables.
    var canvas; 
    var context;
    //create a guessBox variable;
    var guessBox;
    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };
    //Add in the onKeyDown and showing guess function below
    var onKeyDown = function(event){
        if (event.keyCode ! = 13) {
        }
        //Put in the function here
        function showGuess(guess){
            $('#show-guess').text(guess);
        };
        //Define guess variable
        var guess = guessBox.val();
    };
    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    canvas.on('mousemove', function(event) {
        var offset = canvas.offset();
        var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top};
        draw(position);
    });
};

$(document).ready(function() {
    pictionary();
});

// Listen for the broadcast draw event in public/main.js, and call the draw function when it is received
// Only draw on mousedown
// In order to make the drawing experience nicer, alter the code in public/main.js, so that it only draws when the mouse button is held down. In order to achieve this you will need to:

// Listen for the mousedown event
// When the event is fired, set a variable called drawing to true
// Listen for the mouseup event
// When the event is fired, set the drawing variable to false
// Only perform the mousemove actions when drawing is set to true