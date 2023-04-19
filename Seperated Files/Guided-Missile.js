p1controllableCharacter = new Component(30, 30, "blue", 235, 135, true);
//global variable referencing the first controllable character is created
var player1Points = 0;
//points for player 1
p2controllableCharacter = new Component(10, 10, "orange", Math.floor(Math.random()*490)+ 5, Math.floor(Math.random()*290)+5, false);
//global variable referencing the second controllable character is created
var player2Points = 0;    
//New object referencing the entire area the game will take place is created
var gameArea = {
    canvas : document.createElement("canvas"),
    //the first property of the gameArea object, the canvas.
    //the property creates the html element 'canvas' in memory
    start : function() {
    //the second property, start, is a method within the gameArea object
    //instead of 'function start(){', you can also write 'function(){' 
        this.canvas.width = 500;
        this.canvas.height = 300;
        //the length and width of the canvas attribute (in memory) is set
        this.context = this.canvas.getContext("2d");
        //the this.canvas. getContext() method gets the rendering context of the canvas
        //calling the method with "2d" gets the 2d rendering context
        //with rendering context we can use various methods to draw on the canvas
        //the rendered context is assigned to the new property of gameArea, context
        this.canvas.style.position = "absolute";
        this.canvas.style.left = "0px";
        this.canvas.style.top = "100px";
        document.body.appendChild(this.canvas);
        //the canvas's position is absolute in specific coordinates.
        //the appendChild method appends this canvas (in memory) to the actual HTML file
        this.interval = setInterval(updateGameArea, 20);
        //a new property called interval is attributed the game area
        //setInterval is a window function. It calls updateGameArea() every 20 milliseconds
        window.addEventListener('keydown', function (e){
            //an event listener has been created that will activate this function when a key is pressed
            gameArea.keys = (gameArea.keys || []);
            //gameArea.keys becomes an empty array IF it is has not already been initialised
            //this allows the status of multiple keys to be accessed in one area
            gameArea.keys[e.code] = (e.type == "keydown");
            //a new value, of the code (letter) of the key, is created in the status of keys
            //the value of the code is a boolean true, even though the code doesn't need to check for it
            //however, checking before assigning is good practice, so its not just assigned as true
        })
        window.addEventListener('keyup', function (e){
            gameArea.keys = (gameArea.keys || []);
            //this does not need to be added since the keydown listener is called before the keyup
            //hence, a list of keys will always already exist
            //however, it is good practice to never variable/property before declaring it
            gameArea.keys[e.code] = false;
            //the right hand side will always return false, falsifying the boolean value for the key
        })
    },
    //clear function will clear the entire gameArea
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        //will clear everything within the rectangle of coordinates specified
        //in this case, everything within the canvas area is cleared
        //this allows for the previous frame of an updated gameArea to clear
    }
}

function Component(width, height, colour, x, y, player1){
    //this function returns an object with the below parameters when called with 'new'
    //this is because of the 'this' keyword which returns an object by default
    this.width = width;
    this.height = height;
    this.x = x;
    //pixels from left
    this.y = y;
    //pixels from top
    //attributes for the object is set
    this.player1 = player1
    //the speed in certain directions (its just 0, negative, or positive)
    if (!(this.player1)){
        this.p2updone = false;
        this.p2downdone = false;
        this.p2rightdone = false;
        this.p2leftdone= false;
        this.p2up = false;
        this.p2down = false;
        this.p2right = false;
        this.p2left = false;
        //the "done" properties will describe if the direction has occured within a point
        //the non-"done" properties are the current active direction
    }
    this.reset = function() {
        if (this.player1){
            this.x = 235;
            this.y = 135;
        }
        if(!this.player1){
            this.x = Math.floor(Math.random()*490)+ 5;
            this.y = Math.floor(Math.random()*290)+ 5;
            this.p2updone = false;
            this.p2downdone = false;
            this.p2rightdone = false;
            this.p2leftdone= false;
            this.p2up = false;
            this.p2down = false;
            this.p2right = false;
            this.p2left = false;
        }
    }
    this.update = function() {
    //update method for a component
    //when this is called, the component in data will be modified onto the canvas
    //BELOW is a condition for the speed change
    if (gameArea.keys){
        if (this.player1){
            //checks that property has even been created
            //otherwise an error would occur if we access an undefined array
            //the following conditionals control movement of the first player
            if (gameArea.keys["KeyS"]){
                if(gameArea.keys["KeyW"]){
                    //this.x += 0; -not required but implied
                }
                else{
                    this.y += 3;
                }
            }
            else if (gameArea.keys["KeyW"]){
                //since S is not active due to else if, no need for a within conditional checking it
                this.y -= 3;
            }
            if (gameArea.keys["KeyD"]){
                if(gameArea.keys["KeyA"]){
                    //this.x += 0; -not required but implied
                }
                else{
                    this.x += 3;
                }
            }
            else if (gameArea.keys["KeyA"]){
                this.x -= 3;
            }
        }
        else{
            //the below four controls have conditions that only let them activate if opposite directions have not been
            if (gameArea.keys["ArrowUp"]){
                if (!(this.p2downdone)){
                    //you cannot travel up if you have already travelled down
                    this.p2up = this.p2updone = true;
                    //you are now travelling up, this.p2updone must be true
                    this.p2left = this.p2right = false;
                    //to avoid travelling diagnolly, p2left and p2right become false (but the 'done's stay true)
                }
            }
            //similar concept for the "ArrowUp" condition for the next three conditions
            if (gameArea.keys["ArrowDown"]){
                if (!(this.p2updone)){
                    this.p2down = this.p2downdone = true;
                    this.p2left = this.p2right = false;
                }
            }
            if (gameArea.keys["ArrowRight"]){
                if (!(this.p2leftdone)){
                    this.p2right = this.p2rightdone = true;
                    this.p2up = this.p2down = false;
                }
            }
            if (gameArea.keys["ArrowLeft"]){
                if (!(this.p2rightdone)){
                    this.p2left = this.p2leftdone = true;
                    this.p2up = this.p2down = false;
                }
            }
            //these test what the current direction of the square is, then sends it 10 pixels in that direction
            if (this.p2up){
                this.y -= 10;
            }
            if (this.p2down){
                this.y += 10;
            }
            if (this.p2right){
                this.x += 10;
            }
            if (this.p2left){
                this.x -= 10;
            }
        }
    }
    gameArea.context.fillStyle = colour;
    //the fill style of the game area is the colour parameter
    gameArea.context.fillRect(this.x, this.y, this.width, this.height);
    //a rectangle with the coordinates of this component is filled (with the fillstyle)
    }
}

function pointChecker() {
    if ((-30<= (p1controllableCharacter.x-p2controllableCharacter.x) && (p1controllableCharacter.x-p2controllableCharacter.x) <=9) && (-30<= (p1controllableCharacter.y-p2controllableCharacter.y) && (p1controllableCharacter.y-p2controllableCharacter.y) <=9)) {
        score("p2");
        //checks for intersection between the two components and adds a score for player 2 if its true
    }
    if ((p1controllableCharacter.x<0)||(p1controllableCharacter.x-29>500)||(p1controllableCharacter.y+29>300)||(p1controllableCharacter.y<0)){
        score("p2");
        //checks if player 1 goes out of bounds
    }
    if ((p2controllableCharacter.x<0)||(p2controllableCharacter.x-9>500)||(p2controllableCharacter.y+9>300)||(p2controllableCharacter.y<0)){
        score("p1");
        //checks if player 2 goes out of bounds
    }
    
}

//function to update game area and character positions
function updateGameArea() {
    gameArea.clear();
    //the entire canvas (including the components are wiped)
    p1controllableCharacter.update();
    //the update method is called, hence the character reappears on the canvas in the new position
    p2controllableCharacter.update();
    //the second character's position is also updated
    pointChecker();
    //check if the two characters intersect or if one has gone out of bounds
}

//the below function will run upon the body being loaded
function startGame() {
    gameArea.start();
    //the start method in the gameArea object will run
}
function score(winner) {
    if (winner == "p1") {
        player1Points += 1;
        document.getElementById("player1score").innerHTML = "Player 1 Score: " + player1Points;
        //get's the div which has the player score and modifies it's html to be "player 2 score + x (points)"
    }
    else {
        player2Points += 1;
        document.getElementById("player2score").innerHTML = "Player 2 Score: " + player2Points;
        //similar to adding a score for p1, but for p2
    }
    p1controllableCharacter.reset();
    p2controllableCharacter.reset();
    //the two characters a reset to their starting positions
    //ADD A FUNCTION THAT PAUSES THE GAME FOR A SECOND AFTER POINTS (IN FUTURE UPDATE)
}