var map = [];
var pacman = {
    x: 1,
    y: 1
}

var ghost1 = {
    x: 1,
    y: 7,
    lastMove: 'u',
    onCoin: 'y',
    pacmanDies: 'n'
}

var score = 0;
String.prototype.removeSubtring=function(begin, end) {
	return this.substr(0, begin) + this.substr(end);
}

function Switch() {
	solutionString = document.getElementById("solution").value.split('\n');
	curLine = skipFirstLines;
	readSolAndApply();
}

var skipLastLines = 2;
var numTimes = 0;
var moveVar = "";
function readSolAndApply() {
	numTimes = 0;
	moveVar = "";
	if (curLine >= solutionString.length - skipLastLines) {
		return 0;
	}
	solutionString[curLine] = removeAllSpacesNTabs(solutionString[curLine]);
	if (solutionString[curLine] == "") {
		curLine++;
		readSolAndApply();
		return 0;
	}
	let i = 0;
	if((i = skipTill(i, '(')) == -1) {
		return -1;
	}
	moveVar = solutionString[curLine].substring(0, i);
	if (!(moveVar in availableFuncs)) {
		alert("the only code to write allowed is the Available-functions described in the EXPLANATION");
		return -1;
	}
	//skipping over the '('.
	i++;
	let j = i;
	if((j = skipTill(j, ')')) == -1) {
		return -1;
	}
	numTimes = parseInt(solutionString[curLine].substring(i,j));
	if (isNaN(numTimes)) {
		alert("only setting one-Number is allowed as an argument for the functions!");
		return -1;
	}
	j++;
	if (solutionString[curLine].charAt(j) !== ';') {
		alert("missing a semicolon ';' at line " + (curLine + 1) + ".");
		return -1;
	}
	j++;
	if (j < solutionString[curLine].length) {
		alert("please don't put anything after the semicolon ';' at line " + (curLine + 1) + ".");
	}
	id = setInterval(movePacman, 300);
	movePacman();
}
let availableFuncs = {"moveLeft":"left","moveUp":"up","moveDown":"down","moveRight":"right"};

//setting interval on this function to make changes on the pacman..
function movePacman() {
	if (numTimes <= 0){
		clearInterval(id);
		curLine++;
		readSolAndApply();
		return 0;
	}
	switch(moveVar){
		case "moveLeft":
			checkCodition(pacman.y, pacman.x - 1, );
			break;
		case "moveRight":
			checkCodition(pacman.y, pacman.x + 1);
			break;
		case "moveDown":
			checkCodition(pacman.y + 1, pacman.x);
			break;
		case "moveUp":
			checkCodition(pacman.y - 1, pacman.x);
			break;
		default:
			break;
	}
	numTimes--;
}

//this function checks if the pacman move was legal(no wall )and lives and eats or dies by ghost..
function checkCodition(y, x){ 
	if (map[y][x] !== 1) {
		if (map[y][x] === 2) {
			score++;
			$("#score").text("SCORE : " + `${score}`);
		} else if (map[y][x] === 4) {
			//ghost...
			clearInterval(id);
			map[pacman.y][pacman.x] = 3;
			pacman.x = x;
			pacman.y = y;
			map[y][x] = 4;
			drawWorld();
			//delaying 200 ms then resetting the level..
			$("#delay").toggle(200, function() {
				alert("owww man, our pacman was eaten by a ghost :(");
				defineLevels();
				drawWorld();
			});
			return -1;
		}
		map[pacman.y][pacman.x] = 3;
		pacman.x = x;
		pacman.y = y;
		map[y][x] = 5;
		drawWorld();
		if ((level == 1 && score >= 31) || (level == 2 && score == 26) || (level >= 3 && score == 31)) {
			clearInterval(id);
			$("#delay").toggle(200, function() {
				moveNextLevel();		
			});
		}
	}
}
//this func removes all the tabs and spaces from the string.
function removeAllSpacesNTabs(str) {
	let j = 0;
	for (let i = 0; i < str.length; i++) {
		//saving start index...
		j = i;
		//is space or tab then skip over all of them...
		if (str[i] == ' ' || str[i] == '\t') {
			while (str[j] == ' ' || str[j] == '\t'){
				j++;
				if (j >= str.length) {
					break;
				}
			}
			//removing all spaces and tabs..
			str = str.removeSubtring(i, j);
		}
	}
	return str;
}


//skip till the charToReach ...
function skipTill(j, charToReach, skipSpaceAlso = 0) {
	for (; solutionString[curLine].charAt(j) !== charToReach; ++j) {
		if (!skipSpaceAlso) {
			if (solutionString[curLine].charAt(j) === ' ') {
				break;
			}
		}
		if (j >= solutionString[curLine].length) {
			alert("missing '" + charToReach +"' at line " + (curLine + 1) + ".");
			return -1;
		}
	}
	return j;
}



var level = 3;
var beginLevel = 1;
function initLevels() {
	$("#solution").animate({
			left: "-=12%",
			width:'330px',
			top : "-=24%",
			height:'68vh'
		},1500);
	$("#operations").animate({
			left: "-=14%",
			width:'330px',
			top : "-=24%",
			height:'68vh'
	},1500,function(){
		$("#doneButton").fadeIn();
		let solution = $("#solution");
		solution.value = "void main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n}";
		if (level == 1) {
			skipFirstLines = 1;
			let operations = document.getElementById("operations");
			operations.value = "\n                          EXPLANATION\nWelcome to The Pacman Game!, out pacman is hungry as you all know, but it seems he can't move alone, he needs the help of your coding-skills!..\n\n\n 		                  TASK\n    -Help the poor pacman fill his stomach.\n\n\n\n		FUNCTIONS AVAILABLE\n    -------------------------------------------------\n	|------ moveLeft(numSteps)    ------|\n	|------ moveRight(numSteps)  ------|\n	|------ moveUp(numSteps)      ------|\n	|------ moveDown(numSteps) ------|";
			let solution = document.getElementById("solution");
			solution.value = "int main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    return 0;\n}";
		} else if (level == 2) {
			skipFirstLines = 1;
			let operations = document.getElementById("operations");
			operations.value = "\n                          EXPLANATION\nWelcome to The Pacman Game!, out pacman is hungry as you all know, but it seems he can't move alone, he needs the help of your coding-skills!..\n\n\n 		                  TASK\n    -Help the poor pacman fill his stomach.\n-CAREFUL ghosts are lurking around searching \n		for the poor starving pacman.\n\n\n		FUNCTIONS AVAILABLE\n    -------------------------------------------------\n	|------ moveLeft(numSteps)    ------|\n	|------ moveRight(numSteps)  ------|\n	|------ moveUp(numSteps)      ------|\n	|------ moveDown(numSteps) ------|";
			let solution = document.getElementById("solution");
			solution.value = "int main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    return 0;\n}";
		} else if (level == 3){
			skipFirstLines = 1;
			let operations = document.getElementById("operations");
			operations.value = "\n                          EXPLANATION\nWelcome to The Pacman Game!, out pacman is hungry as you all know, but it seems he can't move alone, he needs the help of your coding-skills!..\n\n\n 		                  TASK\n    -Help the poor pacman fill his stomach.\n-CAREFUL ghosts are lurking around searching \n		for the poor starving pacman.\n\n\n		FUNCTIONS AVAILABLE\n    -------------------------------------------------\n	|------ moveLeft(numSteps)    ------|\n	|------ moveRight(numSteps)  ------|\n	|------ moveUp(numSteps)      ------|\n	|------ moveDown(numSteps) ------|";
			let solution = document.getElementById("solution");
			solution.value = "int main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    return 0;\n}";
		} else {
			alert("CONGRATULATIONS!!!, you Completed all the Levels for this game! :)");
			skipFirstLines = 1;
			let operations = document.getElementById("operations");
			operations.value = "\n                          EXPLANATION\nWelcome to The Pacman Game!, out pacman is hungry as you all know, but it seems he can't move alone, he needs the help of your coding-skills!..\n\n\n 		                  TASK\n    -Help the poor pacman fill his stomach.\n-CAREFUL ghosts are lurking around searching \n		for the poor starving pacman.\n\n\n		FUNCTIONS AVAILABLE\n    -------------------------------------------------\n	|------ moveLeft(numSteps)    ------|\n	|------ moveRight(numSteps)  ------|\n	|------ moveUp(numSteps)      ------|\n	|------ moveDown(numSteps) ------|";
			let solution = document.getElementById("solution");
			solution.value = "int main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    return 0;\n}";
		}
	});
}
initLevels();

function moveNextLevel() {
	level++;
	$("#solution").animate({
			left: "+=12%",
			width:'0px',
			top : "+=24%",
			height:'0vh'
		},700);
	$("#operations").animate({
			left: "+=14%",
			width:'0px',
			top : "+=24%",
			height:'0vh'
	},700,function(){
		initLevels();
		defineLevels();
		drawWorld();
	})
}

function defineLevels() {
	if (level == 1) {
		map = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],	
			[1, 2, 1, 1, 1, 1, 1,1,1,1,1,2,1],
			[1, 2, 3, 3, 3, 3, 1, 3, 3, 3, 3, 2, 1]	,
			[1, 2, 3, 3, 3, 3, 1, 3, 3, 3, 3, 2, 1]	,
			[1, 2, 3, 3, 3, 3, 1, 3, 3, 3, 3, 2, 1]	,
			[1, 2, 1, 1, 1, 1, 1,1,1,1,1,2,1],
			[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]	,
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]	
		];
	} else if (level == 2) {
		map = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 5, 2, 2, 4, 3, 3, 4, 1, 2, 2, 2, 1],	
			[1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1]	,
			[1, 2, 2, 2, 1, 4,3, 3, 4, 2, 2, 2, 1]	,
			[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
			[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]	,
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]	
		];
	} else if (level == 3) {
		map = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1],
			[1, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 1],
			[1, 3, 1, 1, 1, 4, 2, 4, 1, 1, 1, 3, 1],
			[1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1],
			[1, 3, 1, 1, 1, 4, 2, 4, 1, 1, 1, 3, 1],
			[1, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 1],
			[1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]	
		];
	}
	pacman = {
		x: 1,
		y: 1
	}
	score = 0;
	$("#score").text("SCORE : " + `${score}`);
}
defineLevels();






function drawWorld() {
	
    document.getElementById("world").innerHTML = "";
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {

            if (map[y][x] === 1) {
                document.getElementById("world").innerHTML += "<div class='wall'></div>";
            }
            else if (map[y][x] === 2) {
                document.getElementById("world").innerHTML += "<div class='coin'></div>";
            }
            else if (map[y][x] === 3) {
                document.getElementById("world").innerHTML += "<div class='ground'></div>";
            }
            else if (map[y][x] === 4) {
                document.getElementById("world").innerHTML += "<div class='ghost1'></div>";
            }
            else if (map[y][x] === 5) {
                document.getElementById("world").innerHTML += "<div class='pacman'></div>";

            }
        }
        document.getElementById("world").innerHTML += "<br>";
    }
}
drawWorld();
