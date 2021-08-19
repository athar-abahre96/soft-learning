/*-----------------------Notes to Self--------------------------
	FIX:if the player clicks more than once on the play button
		the function Switch is called and a new animation is 
		started even tho the past animation wasn't done yet.
*/
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const face = new Image;
face.src ="img/face.png";
const body = new Image;
body.src ="img/body.png";
// load audio files

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";


// create the snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the food
let food = [];
food[0] = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// create the score var

let score = 0;

// control the snake

//document.addEventListener("keydown", direction);

let d;

function direction(event) {
    if (event.keyCode === 37 && d !== "RIGHT") {
        d = "LEFT";
        left.play();
    }
    else if (event.keyCode === 38 && d !== "DOWN") {
        d = "UP";
        up.play();
    }
    else if (event.keyCode === 39 && d !== "LEFT") {
        d = "RIGHT";
        right.play();
    }
    else if (event.keyCode === 40 && d !== "UP") {
        d = "DOWN";
        down.play();
    }
}

// check collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

var drawingTimes = 0;
// draw everything to the canvas
function draw() {
	if(broke) {
		goToGoal();
		drawingTimes = 1;
	}
	if (drawingTimes >= 0) {
		if (!firstMove) {
			drawingTimes--;
			if (drawingTimes < 0) {
				return;
			}
		}
		ctx.drawImage(ground, 0, 0);
		// old head position
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		// which direction
		
		if (d === "GoLeft"){ snakeX -= box; left.play();}
		if (d === "GoUp"){ snakeY -= box; up.play();}
		if (d === "GoRight"){ snakeX += box; right.play();}
		if (d === "GoDown"){ snakeY += box; down.play();}
		let itEat = false;
		
		// if the snake eats the food
		for(let i = 0; i < food.length; i++) {
			if (snakeX === food[i].x && snakeY === food[i].y) {
				score++;
				eat.play();
				/*food[i] = {
					x: Math.floor(Math.random() * 17 + 1) * box,
					y: Math.floor(Math.random() * 15 + 3) * box
				};
				*/
				food.splice(i,1);
				// we don't remove the tail
				itEat = true;
				break;
			}
		}
		if(!itEat){
			// remove the tail
			snake.pop();
		}

		// add new head
		let newHead = {
			x: snakeX,
			y: snakeY
		};

		// game over
		if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box
			|| snakeY > 17 * box || collision(newHead, snake)) {
			clearInterval(game);
			dead.play();
		}
		snake.unshift(newHead);
		for (let i = 0; i < snake.length; i++) {
			if (i === 0 ) {
				ctx.fillStyle = "green";
				ctx.drawImage(face, snake[i].x, snake[i].y);
				ctx.strokeStyle = "red";
				ctx.strokeRect(snake[i].x, snake[i].y, box, box);
			} else {
				ctx.fillStyle = "white";
				ctx.drawImage(body,	 snake[i].x, snake[i].y);
			}
		}
		for(let i = 0; i < food.length; i++){
			ctx.drawImage(foodImg, food[i].x, food[i].y);
		}
		ctx.fillStyle = "white";
		ctx.font = "45px Changa one";
		ctx.fillText(score, 2 * box, 1.6 * box);
		if (drawingTimes === -1 ) {
			clearInterval(game);
			//drawI();
			//requestAnimationFrame(function(){getInp(lines, numOfTimes)})
			getInp();			
		}
		//moving to next level!.
		if(food.length === 0) {
			setTimeout(alert, 100,"AMAZING YOU CLEARED THE LEVEL!! :)");
			level++;
			drawingTimes = 1;
			initLevels();
			if (level === 4) {
				lineNum = 1;
				drawingTimes = 0;
                let str = "int main() {\n    GoLeft(5);\n    GoUp(5);\n    GoRight(5);\n    GoDown(5);\n    return 0;\n}";
				lines = str.split('\n');
				clearInterval(game);
				getInp();
			} else {
				draw();
			}
			return;
		}
	} else {
		//cancelling out the past interval, because getInp sets a new interval.
		clearInterval(game);
		//calling getInp but this time with next line!.
		getInp();
	}
}




// call the draw function every 100 ms
//let game = setInterval(draw, 100);
var firstMove = true;
function drawI(){	
	firstMove = true;
	d ="";
	draw();
	id = requestAnimationFrame(drawI);
}
drawI();
var id = null;
var numSkipLinesLast = 2;
var numSkipLinesStart = 1;
function Switch() {
	firstMove = false;
    cancelAnimationFrame(id);
	if (level === 4) {
		clearInterval(game);
		numSkipLinesLast = 4;
		numSkipLinesStart = 7;
		drawingTimes = 0;
	}
	getInput();
	//setInterval(draw,1000);
}

var lineNum = 1;
var lines = null;
function getInput(){
	lines = document.getElementById("textarea1").value.split('\n');	
	lineNum = numSkipLinesStart;
	if (level === 0){
		if (checkFunctions()){
			//game = setInterval(draw,100);
			return;
		}
	}
    getInp();
}
var broke = false;
//this function reads the first line of the code and sets call 
//interval on draw and draw calls getInp later for next line reading.
function getInp(){
	//gotta fix if thigns after the ';' and also when there is no number, we set the numOfTime to 1.
    if (lineNum < lines.length - numSkipLinesLast && (drawingTimes === 0 || drawingTimes === -1)){
		let begin = 0, endIndex = 0;
		let numOfSpaces = 0;
		let startCountSpaces = false;
		//the num of the ';' and to check if it exists or no.
		let endSemicolonExists = false;
		let lineOfError = lineNum + 1;
		var numOfLeftParenthesis = 0;
		var numOfRightParenthesis = 0;
		let j = 0;
		while (lines[lineNum].charAt(j) === ' ' || lines[lineNum].charAt(j) === '\t') {
			j++;
			if(j > lines[lineNum].length) {
				break;
			}
		}
		lines[lineNum] = lines[lineNum].replace(lines[lineNum].substring(0, j), "");
		if (lines[lineNum] === ""){
			lineNum++;
			getInp();
			return -1;
		}
		if (lines[lineNum].substring(0, 2) ===  "//"){
			lineNum++;
			getInp();
			return;
		}
		//checking loop-related code
		if (level === 4) {
			for(j = 0; j < lines[lineNum].length; j++) {
				if (lines[lineNum].charAt(j) === ';'){
					endIndex = j;
					break;
				}
			}
			if (endIndex === 0) {
				alert("a semicolon is expected at line" + lineNum + 1 + ".");
				lineNum++;
				getInp();	
				return -1;
			}
		}
		if (lines[lineNum].substring(begin, endIndex) === "break") {
			broke = true;
			lineNum++;
			getInp();
			return 0;
		} else {
			endIndex = 0;
			//checking function-related code.
			for(j = 0; j < lines[lineNum].length; j++){
				if(lines[lineNum].charAt(j) === ' '){
					begin++;
					continue;
				}
				if(lines[lineNum].charAt(j) === '('){
					if(numOfLeftParenthesis === 0){
						begin = j + 1;
					}
					numOfLeftParenthesis++;
					if(numOfLeftParenthesis > 1) {
						alert("dont put more than one left Parenthesis");
						lineNum++;
						getInp();
						return -1;
					}
				}
				if(lines[lineNum].charAt(j) === ')'){
					endIndex = j;
					numOfRightParenthesis++;
					if(numOfRightParenthesis > 1) {
						alert("dont put more than one right Parenthesis");
						lineNum++;
						getInp();
						return -1;
					}
				}
				if(begin !== 0){
					startCountSpaces = true;
				}
				if ( endIndex !== 0){
					startCountSpaces = false;
				}
				if (startCountSpaces) {
					if(lines[lineNum].charAt(j + 1) === ' '){
						numOfSpaces++;
					}
					if (isNaN(lines[lineNum].charAt(j + 1)) && lines[lineNum].charAt(j + 1) !== ')'){
						alert("please enter numbers only as arguments on line " + lineOfError);
						lineNum++;
						drawingTimes = 0;
						getInp();
						return -1;
					}
				}
				if (begin !== 0 && endIndex !== 0){
					if(lines[lineNum].charAt(j) !== ')' &&
						lines[lineNum].charAt(j) !== ' '){
						if(lines[lineNum].charAt(j) === ';'){
							j++;
							endSemicolonExists = true;
							while( j < lines[lineNum].length){
								if (lines[lineNum].charAt(j) !== ' '){
									alert("Dont put anything after ';' (line " + lineOfError + ")");
									lineNum++;
									getInp();	
									return -1;									
								}
							}
							break;
						}
						if (j >= lines[lineNum].length && !endSemicolonExists) {
							alert("please put semicolon ';' at end of line " + lineOfError);
						} else {
							alert("Dont put anything between the end of function and the ';' (line " + lineOfError + ")");
						}
						lineNum++;
						getInp();
						return -1;
					}
				}
			}		
			if(numOfSpaces === endIndex - begin) {
				if(endIndex === 0) {
					drawingTimes = 0;
				} else {
					drawingTimes = 1;
				}
			} else {
				drawingTimes = parseInt(lines[lineNum].substring(begin, endIndex));
			}		
			lines[lineNum] = lines[lineNum].replace(lines[lineNum].substring(begin - 1, lines[lineNum].length), "");
			d = lines[lineNum];
			game = setInterval(draw, 100);
		}
		lineNum++;
		//draw();
        //requestAnimationFrame(function(){getInp(seconds, i, lines, numOfTimes)})
		
    } else if (lineNum === lines.length - numSkipLinesLast){
		//drawI();
		if (level === 4) {
			if (broke){
				alert("WELL-DONE, THE LOOP WAS BROKEN");
				game = setInterval(draw,100);
				//level++;
				//initLevels();
				//drawingTimes = 1;
				//draw();
			} else {
				lineNum = 1;
                let str = "int main() {\n    GoLeft(5);\n    GoUp(5);\n    GoRight(5);\n    GoDown(5);\n    return 0;\n}";
				lines = str.split('\n');
				broke = false;
				numSkipLinesLast = 2;
				lineNum = numSkipLinesStart = 1;
				getInp();
			}
		}
	}
}
//related to level 0.
function checkFunctions(){
	lineNum = 2;
	let j = 0;
	while (lines[lineNum].charAt(j) === ' ' || lines[lineNum].charAt(j) === '\t') {
		j++;
		if(j > lines[lineNum].length) {
			break;
		}
	}
	lines[lineNum] = lines[lineNum].replace(lines[lineNum].substring(0, j), "");
	j = 0;
	while (lines[lineNum].charAt(j) !== '.') {
		j++;
		if (j >= lines[lineNum].length) {
			//0 means fail in this function.
			return 1;
		}
	}
	j++;
	if(lines[lineNum].charAt(j) !== 'y'){
		return 1;
	}
	j++;
	//check if it is "-=" operator.
	while (lines[lineNum].charAt(j) !== '='){
		j++;
	}
	if (lines[lineNum].charAt(j - 1) !== '-') {
		return 1;
	}
	lineNum = 6;
	j = 0;
	while (lines[lineNum].charAt(j) === ' ' || lines[lineNum].charAt(j) === '\t') {
		j++;
		if(j > lines[lineNum].length) {
			break;
		}
	}
	lines[lineNum] = lines[lineNum].replace(lines[lineNum].substring(0, j), "");
	j = 0;
	while (lines[lineNum].charAt(j) !== '.') {
		j++;
		if (j >= lines[lineNum].length) {
			//0 means fail in this function.
			return 1;
		}
	}
	j++;
	if(lines[lineNum].charAt(j) !== 'x'){
		return 1;
	}
	j++;
	//check if it is "-=" operator.
	while (lines[lineNum].charAt(j) !== '='){
		j++;
	}
	if (lines[lineNum].charAt(j - 1) !== '+') {
		return 1;
	}
	lineNum = 9;
	//all the function were changed correctly!. he passed! :).
	return 0;
}

//related to level 4.
function goToGoal() {
	if (snake[0].x > food[0].x) {
		d = "GoLeft";
	} else if (snake[0].x < food[0].x){	
		d = "GoRight";
	} else if (snake[0].y > food[0].y) {
		d = "GoUp";
	} else if (snake[0].y < food[0].y) {
		d = "GoDown";
	}
}

let game = null;



let level = 0;
initLevels();
function initLevels() {
	score = 0;
	if (level === 1) {
		snake = [];
		snake[0] = {
			x: 9 * box,
			y: 10 * box
		};
		var options = document.getElementById("options");
		options.value = "\n\n\nGOAL \nEat all the fruits.\n\nBONUS\nUse least number of moves.\n\nOPERATIONS AVAILABLE\nGoLeft(x),GoRight(x),GoUp(x),GoDown(x)";
		var code = document.getElementById("textarea1");
		code.value="int main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    	\n    \n    \n   return 0;\n}";
        food[0] = {
            x: Math.floor(0.1 * 17 + 1) * box,
            y: Math.floor(0.5 * 15 + 3) * box
        };
        food[1] = {
            x: Math.floor(0.1 * 17 + 1) * box,
            y: Math.floor(0.2 * 15 + 3) * box
        };
        food[2] = {
            x: Math.floor(0.3 * 17 + 1) * box,
            y: Math.floor(0.5 * 15 + 3) * box
        };
	} else if (level === 2) {
		snake = [];
		snake[0] = {
			x: 9 * box,
			y: 10 * box
		};
		var options = document.getElementById("options");
		options.value = "\n\n\nGOAL \nEat all the fruits.\n\nBONUS\nUse least number of moves.\n\nOPERATIONS AVAILABLE\nGoLeft(x),GoRight(x),GoUp(x),GoDown(x)";
		var code = document.getElementById("textarea1");
		code.value="int main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    	\n    \n    \n   return 0;\n}";
		for (let i = 1; i <= 6; i++){
            food[i - 1] = {
                x: Math.floor(0.1 * i * 17 + 3) * box,
                y: Math.floor(0.15 * 15 + 3) * box
            };
		}
		for (let i = 1; i <= 6; i++){
            food[i - 1 + 6] = {
                x: Math.floor(0.1 * i * 17 + 3) * box,
                y: Math.floor(0.75 * 15 + 3) * box
            };
		}
		for (let i = 1; i <= 3; i++){
            food[i - 1 + 12] = {
                x: Math.floor(0.1 * 17 + 3) * box,
                y: Math.floor(0.15 * (i + 1) * 15 + 3) * box
            };
		}
		for (let i = 1; i <= 3; i++){
            food[i - 1 + 15] = {
                x: Math.floor(0.6 * 17 + 3) * box,
                y: Math.floor(0.15 * (i + 1) * 15 + 3) * box
            };
		}
	} else if (level === 3) {
		snake = [];
		snake[0] = {
			x: 9 * box,
			y: 10 * box
		};
		var options = document.getElementById("options");
		options.value = "\n\n\nGOAL \nEat all the fruits.\n\nBONUS\nUse least number of moves.\n\nOPERATIONS AVAILABLE\nGoLeft(x),GoRight(x),GoUp(x),GoDown(x)";
		var code = document.getElementById("textarea1");
		code.value="int main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    	\n    \n    \n   return 0;\n}";
		for (let i = 1; i <= 6; i++){
            food[i - 1] = {
                x: Math.floor(0.1 * i * 17 + 3) * box,
                y: Math.floor(0.15 * 15 + 3) * box
            };
		}
	} else if (level === 4){
		snake = [];
		snake[0] = {
			x: 9 * box,
			y: 10 * box
		};
		var options = document.getElementById("options");
		options.value = "\n\n\nGOAL \nStop Spinning!.\n\n.\n\nHINT\n\nthink how to break the loop.";
		var code = document.getElementById("textarea1");
		code.value="int main() {\n    while(true){\n        GoLeft(5);\n        GoUp(5);\n        GoDown(5);\n        GoRight(5);\n        //add code to stop the spin.\n        \n    }\n    GoToGoal();\n    return 0;\n}";
		
        food[0] = {
            x: Math.floor(0 * 17 + 1) * box,
            y: Math.floor(0 * 15 + 3) * box
        };
		
	} else if(level === 0) {
        food[0] = {
            x: Math.floor(0 * 17 + 9) * box,
            y: Math.floor(0 * 15 + 9) * box
        };
        snake[0] = {
            x: Math.floor(0 * 17 + 6) * box,
            y: Math.floor(0 * 15 + 11) * box
        };
		var options = document.getElementById("options");
        options.value = "\n\nEXPLANATION\nThe programmer wrote the GoUp,GoRight functions, but it seems it not working in the right-manner, GoUp is making the snake go LEFT instead of going UP, and GoRight is making it go Left instead of right, fix the functions and call the them in main.\n\n NOTE:\n snake is a struct that has 2 parameters within, x and y.\nx corresponds to the x-axis.\ny corresponts to the y-axis.";
		var code = document.getElementById("textarea1");
		code.value="void GoUp(int numTimesMove) {\n    /*fix the code.*/\n    snake.x -= numMoves;\n}\nvoid GoRight(int numTimesMove) {\n    /*fix the code.*/\n    snake.x -= numMoves;\n}\nint main() {\n     //call the functions\n    \n    \n    return 0;\n}";
	}
}



