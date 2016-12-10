//Here is a list of random words for pictionary game.
var WORDS = [
    "word", "letter", "number", "person", "pen", "class", "people",
    "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air",
    "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question",
    "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east",
    "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish",
    "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area",
    "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"
];
// Creating a random number for WORDS above.
function randomNumber(count){
    return Math.floor(Math.random() * count);
}
//Include socket io
var socket = io();
var pictionary = function() {
    //Define the canvas, context, guessBox variables.
    var canvas; 
    var context;
    //Assume drawing false meaning nothing happens yet.
    var drawing = false;
    //create a guessBox variable;
    var guessBox;
    //All other variables declared
    var guessDisplay = $('#guess-display');
    var drawDisplay = $('#draw-display');
    var drawDisplayText = $('#draw-display span');
    var userID;
    var drawer = false;
    var guesser = $('#guess');
    var randomNum = randomNumber(WORDS.length);
    console.log(randomNum);
    
    socket.on('user', function(user){
        userID = user;
        if (userID == 1) {
            drawer = true;
            guesser.css('display','none');
            drawDisplayText.text(WORDS[randomNum]);
        } else {
            drawDisplay.css('display','none');
        }
    });
    
    var onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
            return;
        }
        
        socket.emit('guess', guessBox.val());
        console.log(guessBox.val());
        guessBox.val('');
    };
    
    guessBox = $('#guess input');
    guessBox.on('keydown', onKeyDown);
    
        
    socket.on('guess', function(guess){
        guessDisplay.text(guess);
    });
    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    canvas.on('mousedown', function(event) {
        drawing = true;
    });
    canvas.on('mouseup', function(event) {
        drawing = false;
    });
    canvas.on('mousemove', function(event) {
        if (drawing && drawer) {
            var offset = canvas.offset();
            var position = {x: event.pageX - offset.left,
                            y: event.pageY - offset.top};
            draw(position);
            socket.emit('draw', position);
        }
    });
    socket.on('draw', function(draw_image){
        draw(draw_image);
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