$("textarea").keydown(function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
            end = this.selectionEnd;

        var $this = $(this);

        // set textarea value to: text before caret + tab + text after caret
        $this.val($this.val().substring(0, start)
                    + "\t"
                    + $this.val().substring(end));

        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        return false;
    }
});

var score = 0;          
var hero = {
	top: 534,
	left: 648
};
var missiles = [];
var enemies = [
   /*{ left: 400, top: 100 },
   { left: 500, top: 100 },
   { left: 600, top: 100 },
   { left: 700, top: 100 },
   { left: 800, top: 100 },
   { left: 900, top: 100 },
   { left: 400, top: 175 },
   { left: 500, top: 175 },
   { left: 600, top: 175 },
   { left: 700, top: 175 },
   { left: 800, top: 175 },
   { left: 900, top: 175 },
   */
];

function setEnemiesAndHero() {
	enemies = [
	   { left: 400, top: 100 },
	   { left: 500, top: 100 },
	   { left: 600, top: 100 },
	   { left: 700, top: 100 },
	   { left: 800, top: 100 },
	   { left: 900, top: 100 },
	   { left: 400, top: 175 },
	   { left: 500, top: 175 },
	   { left: 600, top: 175 },
	   { left: 700, top: 175 },
	   { left: 800, top: 175 },
	   { left: 900, top: 175 },
   
	];
	hero = {
		top: 534,
		left: 390
	};
	moveHero();
}

document.onkeydown = function (e) {
	/*
	if (e.keyCode === 37) {
		console.log("LEFT");
		hero.left -= 10;
		moveHero();

	}
	else if (e.keyCode === 39) {
		console.log("RIGHT");
		hero.left += 10;
		moveHero();

	}

	else if (e.keyCode === 32) {
		// space
		/*
		console.log("FIRE");
		missiles.push({
			left: hero.left + 15,
			top: hero.top
		})
		console.log(missiles);
		drawMissiles();
		
	}
	*/
}

function moveHero() {
	//moving the hero by changing the css left style.
	document.getElementById('hero').style.left = hero.left + "px";
}

function drawMissiles() {
	document.getElementById('missiles').innerHTML = "";
	for (var missile = 0; missile < missiles.length; missile = missile + 1) {
		document.getElementById('missiles').innerHTML +=
		`<div class='missile' style='left:${missiles[missile].left}px; top:${missiles[missile].top}px;'></div>`;
	}
}

function drawEnemies() {
	document.getElementById('enemies').innerHTML = "";
	for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
		//learning something new, add the div class by putting the div inside of '`' and also $ --> gets value
		document.getElementById('enemies').innerHTML +=
		`<div class='enemy' style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px;'></div>`;
	}
}

function moveMilssiles() {
	for (var missile = 0; missile < missiles.length; missile = missile + 1) {
		missiles[missile].top -= 5;
	}
}

function moveEnemies() {
	for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
		enemies[enemy].top += 1;
	}
}

function collisionDetection() {
	for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
		for (var missile = 0; missile < missiles.length; missile = missile + 1) {
			if ((missiles[missile].top <= enemies[enemy].top + 50) &&
				(missiles[missile].top >= enemies[enemy].top) &&
				(missiles[missile].left >= enemies[enemy].left) &&
				(missiles[missile].left <= enemies[enemy].left + 50)) {
				console.log("HIT");
				//the splice function is like this arrayName.splice(index, 0 or 1 (0 == insert, 1 == delete), if you put another elm here it will either insert it if(0) or replace it if(1).)
				enemies.splice(enemy, 1);
				missiles.splice(missile, 1);
				//so the above splice function is just removing the given indexes...
				score+= 10;
				$("#score").text(`${score}`);                        
			}
			if (enemies.length === 0) {
				moveNextLevel();
				//document.location.reload(true);
			}
		}
	}
}

function deathDetection() {
	for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) {
		if (enemies[enemy].top >= hero.top - 50) {
			//alert("You Lose");
			document.location.reload(true);
		}
	}
}
/*
setTimeout(moveMilssiles,400);
setTimeout(drawMissiles,400);
//moveEnemies();
setTimeout(drawEnemies,40);
setTimeout(collisionDetection,400);
setTimeout(deathDetection,400);      
*/
function gameLoop() {            
	setTimeout(gameLoop, 40);
	moveMilssiles();
	drawMissiles();
	//moveEnemies();
	drawEnemies();
	collisionDetection();
	deathDetection();            
}
gameLoop();



var skipFirstLines = 1;
var skipLastLines = 2;
var solutionString = "";
var curLine = 0;

var varsDic = {};
let nameOfVars = [];
let varsDicIndex = 0;

var workingTable = [];
let listOfTypes = { "string":"declare", "int":"declare", "String":"declare",
					"heroShoot":"func", "isAlienAhead":"func", "areThereEnemies":"func", "moveHero":"func","createInv":"func", "createHero":"func", "peek":"func", "if":"func", "else":"func", "else if":"func", "switch":"func",
					"break":"word", "continue":"word",
					"case":"case", "default":"case",
					"Stack":"object", "Queue":"object",
					"while":"loop", "for":"loop"
				};

let scopedFuncs = {"if":"func", "else":"func", "while":"func", "for":"func"};
let semicolonFuncs = {"heroShoot":"func", "isAlienAhead":"func", "areThereEnemies":"func", "moveHero":"func", "createInv":"func", "createHero":"func"};
let twoArgsFuncs = {"createInv":"func", "createHero":"func"};
let objectFunctions = {"isNotEmpty": "boolean", "push":"Stack", "pop":"Stack",
					   "enqueue":"Queue", "dequeue":"queue"};
let boolChecking = ["==",">=","<=","!=",">","<"];
let enumValues = {"moveColor":"justToCheckIfHePutEnumName","GREEN":1, "RED":2, "YELLOW":3, "BLUE":4};
let emptyVal = "!@#";
let isThereIf = false;
let curlyBraceOpened = 0;
let funcCurlyBracesLine = 0;
var winningStreak = 0;
let reseted = 1;

function Switch() {
	solutionString = document.getElementById("solution").value.split('\n');
	curLine = skipFirstLines;
	varsDic = {};
	nameOfVars = [];
	varsDicIndex = 0;
	workingTable = [];
	playerOrder = [];
	namesToTypesDic = {};
	curlyBraceOpened = 0;
	if (level == 2) {
		writingFunctionsChecking();
		checkLevelTwoConditions();
		return;
	}
	let res = readSolAndApply();
	if (res !== -1) {
		$("#doneButton").css("pointerEvents","none");
		playTheCode();
	}
	if($("#doneButton").css("pointerEvents").toLowerCase() != 'auto') {
		$("#doneButton").css("pointerEvents","auto");
	}
}


function checkLevelTwoConditions() {
	if (noChangeToFuncName != 4) {
		alert("please don't touch the already written code!");
		return -1;
	}
	if (!rightMoveHeroFunc) {
		alert("it seems you messed up at the moveHero function, and also please try to write minimum line of code there...");
		return -1;
	}
	if (!rightForLoop) {
		alert("you MUST use a for-loop only! and please use the given loop variable 'i', in case you used a for loop, please put correct condition and only add the value of the 'i' by 1 at a time...");
		return -1;
	}
	if (!rightIfCondition) {
		alert("you must use 'if' and put RIGHT condition inside in order to return the correct boolean");
		return -1;
	}
	if (!heReturnedTrue) {
		alert("missing a 'return true' on the function");
		return -1;
	}
	if (!heReturnedfalse) {
		alert("missing a 'return false' on the function");
		return -1;	
	}
	//he passed all!
	alert("AMAZING!, you declared the functions correctly! :)");
	moveNextLevel();
	return 0;
}


let noChangeToFuncName = 0;
let rightMoveHeroFunc = false;
let rightForLoop = false;
let rightIfCondition = false;
let heReturnedTrue = false;
let heReturnedfalse = false;
function writingFunctionsChecking() {
	noChangeToFuncName = 0;
	rightMoveHeroFunc = false;
	rightForLoop = false;
	rightIfCondition = false;
	heReturnedTrue = false;
	heReturnedfalse = false;
	for (let i = 0; i < solutionString.length; i++) {
		solutionString[i] =  removeAllSpacesNTabs(solutionString[i]);
		if (solutionString[i] == "" || solutionString[i].substring(0,2) == "//") {
			//in case it was empty line...only spaces and tabs...
			continue;
		}
		//noChangeToFuncName must be 4 on level 2!.
		if (solutionString[i] == "voidmoveHero(intdist){") {
			noChangeToFuncName++;
		}
		if (solutionString[i] == "boolisAlienAhead(invaders[],hero){") {
			noChangeToFuncName++;
		}
		if (solutionString[i] == "intsize=invaders.length;") {
			noChangeToFuncName++;
		}
		if (solutionString[i] == "inti;//<--loopvariable!") {
			noChangeToFuncName++;
		}
		
		if (solutionString[i] == "hero.x+=dist;" || solutionString[i] == "hero.x=hero.x+dist;" || solutionString[i] == "hero.x=dist+hero.x;") {
			rightMoveHeroFunc = true;
		}
		//all the shapes of the for-loop..
		if (solutionString[i] == "for(i=0;i<size;i++){" || solutionString[i] == "for(i=0;i<=size-1;i++){"
		 || solutionString[i] == "for(i=0;i<size;i+=1){" || solutionString[i] == "for(i=0;i<=size-1;i+=1){"
		 || solutionString[i] == "for(i=0;i<size;i=i+1){" || solutionString[i] == "for(i=0;i<=size-1;i=i+1){"
		 || solutionString[i] == "for(i=0;i<size;i=1+i){" || solutionString[i] == "for(i=0;i<=size-1;i=1+i){"
		 || solutionString[i] == "for(i=0;i<size;++i){" || solutionString[i] == "for(i=0;i<=size-1;++i){"
		|| solutionString[i] == "for(i=0;size>i;i++){" || solutionString[i] == "for(i=0;size-1>=i;i++){"
		 || solutionString[i] == "for(i=0;size>i;++i){" || solutionString[i] == "for(i=0;size-1>=i;++i){"
		 || solutionString[i] == "for(i=0;size>i;i+=1){" || solutionString[i] == "for(i=0;size-1>=i;i+=1){"
		 || solutionString[i] == "for(i=0;size>i;i=i+1){" || solutionString[i] == "for(i=0;size-1>=i;i=i+1){"	
		 || solutionString[i] == "for(i=0;size>i;i=1+i){" || solutionString[i] == "for(i=0;size-1>=i;i=1+i){"	
		|| solutionString[i] == "for(i=0;i<invaders.length;i++){" || solutionString[i] == "for(i=0;i<=invaders.length-1;i++){"
		 || solutionString[i] == "for(i=0;i<invaders.length;++i){" || solutionString[i] == "for(i=0;i<=invaders.length-1;++i){"
		 || solutionString[i] == "for(i=0;i<invaders.length;i+=1){" || solutionString[i] == "for(i=0;<=invaders.length-1;i+=1){"
		 || solutionString[i] == "for(i=0;i<invaders.length;i=i+1){" || solutionString[i] == "for(i=0;<=invaders.length-1;i=i+1){"	
		 || solutionString[i] == "for(i=0;i<invaders.length;i=1+i){" || solutionString[i] == "for(i=0;<=invaders.length-1;i=1+i){"	
		|| solutionString[i] == "for(i=0;invaders.length>i;i++){" || solutionString[i] == "for(i=0;invaders.length-1>=i;i++){"
		 || solutionString[i] == "for(i=0;invaders.length>i;++i){" || solutionString[i] == "for(i=0;invaders.length-1>=i;++i){"
		 || solutionString[i] == "for(i=0;invaders.length>i;i+=1){" || solutionString[i] == "for(i=0;invaders.length-1>=i;i+=1){"
		 || solutionString[i] == "for(i=0;invaders.length>i;i=i+1){" || solutionString[i] == "for(i=0;invaders.length-1>=i;i=i+1){"	
		 || solutionString[i] == "for(i=0;invaders.length>i;i=1+i){" || solutionString[i] == "for(i=0;invaders.length-1>=i;i=1+i){"	
		) {
			//he put a right for loop...
			rightForLoop = true;
		}
		if (solutionString[i] == "if(invaders[i].x==hero.x){" || solutionString[i] == "if(hero.x==invaders[i].x){"
		 || solutionString[i] == "if(invaders[i].x==hero.x)" || solutionString[i] == "if(hero.x==invaders[i].x)") {
			//he put a right if...
			rightIfCondition = true;
		}
		if (solutionString[i] == "returntrue;" || solutionString[i] == "return1;") {
			heReturnedTrue = true;
		}
		if (solutionString[i] == "returnfalse;" || solutionString[i] == "return0;") {
			heReturnedfalse = true;
		}
	}
	return 0;
}

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


let stringArg = "";
function readSolAndApply() {
	if (solutionString.length - skipLastLines > curLine) {
		stringArg = "";
		do {
			var i, k, j;
			//cleaning all the spaces before the arg.
			for(i = 0; solutionString[curLine].charAt(i) === ' ' || solutionString[curLine].charAt(i) === '\t' ; ++i) {}
			solutionString[curLine] = solutionString[curLine].replace(solutionString[curLine].substring(0, i), "");
			//checking if the line is empty or a NOTE line. if yes, moving to next line.
			if(solutionString[curLine] == "" || solutionString[curLine].substring(0, 2) == "//"){
				curLine++;
				let res = readSolAndApply();
				return res;
			} else if (solutionString[curLine].charAt(0)  === '}') {
				if (!curlyBraceOpened) {
					alert("missing an opening curly braces open '{' at line " + (curLine + 1) + ".");
					return -1;
				}
				workingTable[workingTable.length] = "endFunc";
				curlyBraceOpened--;
				i = 0;
				i++;
				for(; solutionString[curLine].charAt(i) === ' '; ++i) {}
				solutionString[curLine] = solutionString[curLine].replace(solutionString[curLine].substring(0, i), "");
				//checking if the line is empty or a NOTE line. if yes, moving to next line.
				if(solutionString[curLine] == "" || solutionString[curLine].substring(0, 2) == "//"){
					curLine++;
					let res = readSolAndApply();
					return res;
				}
			}
			
			//getting to end of first arg. it is till ' '(String, int etc) or ';'(break, cont...) or '(' (if(..), playMove(..))
			for (i = 0; solutionString[curLine].charAt(i) !== '(' ; ++i) {
				//break if it is a one-word arg.
				if(solutionString[curLine].charAt(i) === ';') {
					break;
				}
				//break if there is a setVal arg.
				if (solutionString[curLine].charAt(i) === '=' ){
					break;
				}
				//break if there is a space.
				if (solutionString[curLine].charAt(i) === ' ') {
					break;
				}
				//break if there is a ':' for the 'default' case.
				if (solutionString[curLine].charAt(i) === ':') {
					break;
				}
				//break if there is a ':' for the 'default' case.
				if (solutionString[curLine].charAt(i) === '[') {
					break;
				}
				//break if there is a '.' for the Objects-functions.
				if (solutionString[curLine].charAt(i) === '.') {
					break;
				}
				if (i >= solutionString[curLine].length) {
					alert("missing semi-colon ';' at line " + (curLine + 1) +".");
					return -1;
				}
			}
			//this k is for saving the index of the last-letter of the first word in the line...
			k = i;
			//added the type to the string,
			if(solutionString[curLine].substring(0, i) in listOfTypes){
				stringArg += solutionString[curLine].substring(0, i) + ",";
				//stringArg += listOfTypes[solutionString[curLine].substring(0, i)] + ",";
			} else {
				//it means we are in setVal!, cause the only thing that isn't in listOfTypes is the variables themselves.
				//let j = i;
				var nameOfVarIs = solutionString[curLine].substring(0, i);
				j = i;
				//skipping spaces...
				for(; solutionString[curLine].charAt(i) === ' '; ++i) {}
				//it must be a setVal arg, otherwise alert.... the 0-->j has the variable name, i is at first char after
				//var name after skipping spaces.
				if (solutionString[curLine].charAt(i) === '=') {
					if(solutionString[curLine].substring(0, j) in varsDic) {
						//remember that Javascript is function-scoped...so variableName is declared in all of the readSolAndApply func.
						var variableName = solutionString[curLine].substring(0, j);
						//so far we get : "setVal,varName,"
						stringArg += "setVal," + solutionString[curLine].substring(0, j) + ",";
					} else {
						alert("the variable " + solutionString[curLine].substring(0, j) + " at line " + (curLine +1) + " is not declared.");
						return -1;
					}
					//must read the object Stack..........................
				} else if(solutionString[curLine].charAt(i) === '[') {
					if(solutionString[curLine].substring(0, j) in varsDic) {
						stringArg += "setVal," + solutionString[curLine].substring(0, j) + ",";
						//now we need to know the index value of the array that is put on.
						i++;
						i = skipSpaces(i);
						j = i;
						for (; solutionString[curLine].charAt(j) !== ' ', solutionString[curLine].charAt(j) !== ']'; j++){
							if ( j >= solutionString[curLine].length){
								alert("missing a closing brackets ']' at line " + (curLine + 1) + ".");
								return -1;
							}
						}
						stringArg += solutionString[curLine].substring(i, j) + ',';
						j = skipSpaces(j);
						if (solutionString[curLine].charAt(j) !== ']' ){
							alert("missing a closing brackets ']' at line " + (curLine + 1) + ".");
							return -1;
						}
						j++;
						j = skipSpaces(j);
						if (solutionString[curLine].charAt(i) === '=') {							
							alert("missing an equal sign '=' at line " + (curLine + 1) + ".");
							return -1;
						}
						i = j;
					} else {
						alert("the variable " + solutionString[curLine].substring(0, j) + " at line " + (curLine +1) + " is not declared.");
						return -1;
					}
				} else if (solutionString[curLine].charAt(i) === '.'){
					//adding the name of the object to the string.
					stringArg += "setVal," + solutionString[curLine].substring(0, i) + ",";
					i++;
					for (; solutionString[curLine].charAt(j) !== ' ', solutionString[curLine].charAt(j) !== '('; j++){
						if ( j >= solutionString[curLine].length){
							alert("missing a opening braces '(' at line " + (curLine + 1) + ".");
							return -1;
						}
					}
					//adding the name of the function of the object.
					stringArg += solutionString[curLine].substring(i, j) + ",";
					j = skipSpaces(j);
					i = j;
					if (solutionString[curLine].charAt(i) !== '(') {
						alert("missing a opening braces '(' at line " + (curLine + 1) + ".");
						return -1;					
					}
					i++;
					i = skipSpaces(i);
					if (solutionString[curLine].charAt !== '('){ 
						j = i;
						for (; solutionString[curLine].charAt(j) !== ' ' && solutionString[curLine].charAt(j) !== ')' && solutionString[curLine].charAt(j) !== '.'; j++){
							if ( j >= solutionString[curLine].length){
								alert("missing a opening braces '(' at line " + (curLine + 1) + ".");
								return -1;
							}
						}
						//if it was a '.' then it means it is an enum VARIABLE!. (unless i add a get and set in future).
						if (solutionString[curLine].charAt(j) === '.') {
							if (!(solutionString[curLine].substring(i, j) in enumValues)) {
								alert("no such enum variable at line" + (curLine + 1) + ".");
								return -1;	
							}
							j++;
							i = j;
							//going over the enum value.
							for (; solutionString[curLine].charAt(j) !== ' ', solutionString[curLine].charAt(j) !== ')'; j++){
								if ( j >= solutionString[curLine].length){
									alert("missing a opening braces '(' at line " + (curLine + 1) + ".");
									return -1;
								}
							}
							//checking whether it is an enum value or not actually.
							if (!(solutionString[curLine].substring(i, j) in enumValues)){ 
								alert("no such enum-value at line " + (curLine + 1) + ".");
								return -1;
							}
							stringArg += enumValues[solutionString[curLine].substring(i, j)];
							j = skipSpaces(j);
						} else if (solutionString[curLine].charAt(j) === ')') {
							//do nothing
						} else if (solutionString[curLine].substring(i, j) in varsDic) {
							//it means that he put a variable value...
							stringArg += solutionString[curLine].substring(i, j);
							j = skipSpaces(j);
						} else {
							//he put somethinng that doesn't exist for the function as a variable.
							alert("can't put non-existant variabe in function at line " + (curLine + 1) + ".");
							return -1;
						}
						// we are in the ')'
						if (solutionString[curLine].charAt(j) === ')') {
							j++;
							j = skipSpaces(j);
							//this break sends us to the end of do-while(0)...
							break;
						}
					} else {
						//it means that he didn't put an opening braces so it failed.
						alert("missing an opening braces '(' for the object-function at line " + (curLine + 1) + ".");
						return -1;
					}
				} else {
					alert("no such arg at line: " + (curLine + 1) + ".");
					return -1;
				}
				
				
				
				//we are at the '=' so we do i++ to pass it and then we skip the spaces<<<<<<<<<<<<<<<<<<<<<<important.
				i++;
				i = skipSpaces(i);
				j = i;
				//rushing till end of name of the variable that was after the '='.
				while (solutionString[curLine].charAt(j) !== ' ' 
						&& solutionString[curLine].charAt(j) !== ';' 
						&& solutionString[curLine].charAt(j) !== '"'
						&& solutionString[curLine].charAt(j) !== '('
						&& solutionString[curLine].charAt(j) !== '.'){ ++j; }//the '.' for the enumValues, gotta add for the Objects.
				
				//we reached the end, is it whitespace or is it ';'
				//we got the name of the first var.
				//checking if he put a val of other variable!
				if (solutionString[curLine].substring(i, j) in varsDic){
					//setting the VALUE of the variable in the dictionary.
					//stringArg += varsDic[solutionString[curLine].substring(i, j)];
					stringArg += solutionString[curLine].substring(i, j);
					varsDic[variableName] = varsDic[solutionString[curLine].substring(i, j)];
				} else if (solutionString[curLine].substring(i, j) in enumValues) {
					//the value for setting the enums...
					j++;
					i = j;
					for(; solutionString[curLine].charAt(j) !== ' ', solutionString[curLine].charAt(j) !== ';'; ++j) {
						if (j >= solutionString[curLine].length){
							alert("missing a closing brackets ']' at line " + (curLine + 1) + ".");
							return -1;
						}
					}
					if (!(solutionString[curLine].substring(i,j) in enumValues)) {
						alert("please insert correct enum value at line " + (curLine + 1) + ".");
						return -1;
					}
					stringArg += enumValues[solutionString[curLine].substring(i, j)];
					varsDic[variableName] = varsDic[solutionString[curLine].substring(i, j)];
					/*
					j = skipSpaces(j);
					if (solutionString[curLine].charAt(j) !== ';'){
						if (j >= solutionString[curLine].length) {
							alert("missing a semi-colon ';' at line " + (curLine + 1) + ".");
							return -1;	
						}
					}
					*/
				} else if(solutionString[curLine].substring(i, j) in listOfTypes){					
					//maybe he put a returning-value func!? :).
					if (listOfTypes[solutionString[curLine].substring(i, j)] != "func"){
						alert("you can't put types as values at line " + (curLine + 1) + ".");
						return -1;
					}
					//adding the func name to the stringArg.
					stringArg += solutionString[curLine].substring(i, j);
					varsDic[variableName] = solutionString[curLine].substring(i, j);
					//skipping spaces;
					j = skipSpaces(j);
					//it must be '('.
					if(solutionString[curLine].charAt(j) !== '(') {
						alert("missing '(' at line " + (curLine + 1) + ".");
						return -1;
					}
					j++;
					//skipping spaces;
					j = skipSpaces(j);
					//checking if no args func...
					if(solutionString[curLine].charAt(j) === ')') {
						//stringArg += "," + emptyVal;
						j++;
					} else {
						//maybe 1 arg func!. we are now at the first letter of the val-function argument!
						//........work on this, if needed in future. i meant by that, check if variable or not 
						//cause the variable value changes by each line passing by....
						i = j;
						for(; solutionString[curLine].charAt(j) !== ')', solutionString[curLine].charAt(j) !== ' '; j++){
							if (j >= solutionString[curLine].length) {
								alert("missing ')' at line " + (curLine + 1) + ".");
								return -1;
							}
						}
						//we get now: "setVal,varName,funcName,funcArg"
						stringArg += solutionString[curLine].substring(i,j);
						j = skipSpaces(j);
						//it must be ')' otherwise ..the below happens..
						if(solutionString[curLine].charAt(j) !== ')') {
							alert("missing ')' at line " + (curLine + 1) + ".");
							return -1;
						}
					}
					//checking if he put a semicolon and nothign after semicolon.
					j = skipSpaces(j);
					if (solutionString[curLine].charAt(j) !== ';') {
						alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
						return -1;		
					}
					j++;
					for(; j < solutionString[curLine].length; ++j) {
						if (solutionString[curLine].charAt(j) !== ' ') {
							alert("please don't put anything after the semicolor ';' at line " + (curLine + 1) + ".");
							return -1;
						}
					}
					//if we reached here means everything was ALRIGHT! :) and line is done.
					curLine++;
					varsDicIndex++;
					workingTable[workingTable.length] = stringArg;
					let res = readSolAndApply();
					return res;
					//to avoid danger of the value 'j' i put the above lines instead of making the code go down then doooown to it.
					
				//it means that it is a abstract string like "rock", "whatevahaaa" or a valueFunc;
				} else if (solutionString[curLine].substring(i, j) == "new") {
					//no allocating more than once.
					if (varsDic[nameOfVarIs] != emptyVal) {
						alert("the Object '" + nameOfVarIs + "' was allocated memory before");
						return -1;
					}
					j = skipSpaces(j);
					i = j;
					//reaching end of object-type...
					for (; solutionString[curLine].charAt(j) != ' ' && solutionString[curLine].charAt(j) != '('; j++) {}
					//checking whether he is allocating as same type of the variable.
					if (solutionString[curLine].substring(i, j) != namesToTypesDic[nameOfVarIs]) {
						alert("you are allocating an object of type'" + solutionString[curLine].substring(i, j) + "', meanwhile the object '" + nameOfVarIs + "' is of type '" + namesToTypesDic[nameOfVarIs] +"'.");
						return -1;
					}
					//checking if he put pure ()
					j = skipSpaces(j);
					if(solutionString[curLine].charAt(j) != '(') {
						alert("missing an opening braces '(' at line " + (curLine + 1) + ".");
						return -1;
					}
					j++;
					j = skipSpaces(j);
					for (; solutionString[curLine].charAt(j) != ')'; j++){
						if (j >= solutionString[curLine].length) {
							alert("missing an closing braces ')' at line " + (curLine + 1) + ".");
							return -1;								
						}
					}
					j++;
					stringArg += "allocateByDeleteEmptyVal";
					//going to end of the do-while(0).
					break;
				} else {
					//getting into the '"' or the '('.
					if (solutionString[curLine].charAt(j) !== '"' ){ 
						alert("the variable " + solutionString[curLine].substring(i, j) + " at line " + curLine + " is not declared.");
						return -1;	
					}
					
					j++;
					i = j;
					for(; solutionString[curLine].charAt(j) !== '"'; j++) {
						if (j >= solutionString[curLine].length) {
							alert("invalid value is put at line ", + (curLine + 1) + ".");
							return -1;
						}
					}
					stringArg += solutionString[curLine].substring(i - 1, j + 1);
					//setting right value in dictionary also...
					varsDic[variableName] = solutionString[curLine].substring(i, j);
					j++;
				}
				j = skipSpaces(j);
				i = j;
				//checking if we reached a semi-colon.
				if (solutionString[curLine].charAt(j) !== ';') {
					alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
					return -1;			
				}
				j++;
				for (;j < solutionString[curLine].length; ++j) {
					if (solutionString[curLine].charAt(j) !== ' '){
						alert("please don't put anything after semi-colon ';' at line ", + (curLine + 1) + ".");
						return -1;			
					}
				}
			}
			if (listOfTypes[solutionString[curLine].substring(0, k)] == "declare") {
				while(1) {
					//skipping spaces.
					for(; solutionString[curLine].charAt(i) === ' '; ++i) {}
					//let j = i;
					j = i;
					//rushing till end of name of the variable.
					while (solutionString[curLine].charAt(j) !== ' ' 
						&& solutionString[curLine].charAt(j) !== ','
						&& solutionString[curLine].charAt(j) !== ';'
						&& solutionString[curLine].charAt(j) !== '['){
							++j;
					}
					//we reached the end, is it whitespace or is it ';'
					//we got the name of the first var.
					stringArg += solutionString[curLine].substring(i, j) + ",";
					nameOfVars[varsDicIndex] = solutionString[curLine].substring(i, j);
					namesToTypesDic[solutionString[curLine].substring(i, j)] = solutionString[curLine].substring(0, k);
					if (nameOfVars[varsDicIndex] in varsDic) {
						alert ("variable '" + nameOfVars[varsDicIndex] +"' at line " + (curLine + 1) +" was declared before");
						return -1;
					}
					//skipping spaces after nameOfVariable.
					j = skipSpaces(j);
					i = j;
					//checking if we reached a semi-colon.
					if (solutionString[curLine].charAt(j) === ';') {
						//setting empty value of the name element.
						varsDic[nameOfVars[varsDicIndex]] = emptyVal;
						stringArg += emptyVal;
						//the break sends us to the end of the do-while(0).
						break;
					} else if (solutionString[curLine].charAt(j) === '['){
						stringArg = stringArg.replace('int', 'declareArray');
						j++;
						j = skipSpaces(j);
						if (solutionString[curLine].charAt(j) !== ']') {
							// we reached a number, the size of the array.
							i = j;
							for (; solutionString[curLine].charAt(j) !== ' ', solutionString[curLine].charAt(j) !==']';++j){
								if (j >= solutionString[curLine].length) {
									alert("there is no closing brackets ']' at line " + (curLine + 1) + ".");
									return -1;
								}
							}
							//i set empty val because all of the values inside are trash value, now i change it bit by bit
							//for example arr,0-2-3 means that there is a value on the arr[0],arr[2],arr[3] :).
							varsDic[nameOfVars[varsDicIndex]] = emptyVal;
							if (isNaN(solutionString[curLine].substring(i,j))) {
								let enterAlert = false;
								if (solutionString[curLine].substring(i,j) in varsDic){
									if (isNaN(varsDic[solutionString[curLine].substring(i,j)])) {
										enterAlert = true;
									} else {
										//maybe later, in case he put a variable, then i eneed to put the variable instead of the value.
										//and on the time of calling the readCodeNApply function i will put the alert there if the var isnt int.
										stringArg += varsDic[solutionString[curLine].substring(i,j)];
									}
								}
								if (enterAlert) {
									alert("please put numeric value as when declaring the array size at line " + (curLine + 1) + ".");
									return -1;
								}
								
							} else {
								stringArg += solutionString[curLine].substring(i,j);
								//we have now "declareArray,arrName,size"
							//	break;
							}
							j++;
							j = skipSpaces(j);
							//checking if we reached a semi-colon.
							if (solutionString[curLine].charAt(j) !== ';') {
								alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
								return -1;			
							}
							j++;
							for (;j < solutionString[curLine].length; ++j) {
								if (solutionString[curLine].charAt(j) !== ' '){
									alert("please don't put anything after semi-colon ';' at line ", + (curLine + 1) + ".");
									return -1;			
								}
							}
							break;
						} else {
							//it means that there is no size declared and so there must be a = after that;
							j++;
							j = skipSpaces(j);
							if (solutionString[curLine].charAt(j) !== '=') {
								alert("please put a size of the array you declared at line " + (curLine + 1) + ".");
								return -1;
							}
							j++;
							j = skipSpaces(j);
							if (solutionString[curLine].charAt(j) !== '{') {
								alert("missing an opening curly-brackets" + (curLine + 1) + ".");
								return -1;	
							}
							//now need to specify the enum-working method.
						}
					} else {
						//it MUST be a ',' or '='.					
						j = i;
						//checking if it a value...
						if (solutionString[curLine].charAt(i) === '='){
							i++;
							let index = i;
							//getting the value.
							while (solutionString[curLine].charAt(i) !== '"'){
								i++;
								if (i >= solutionString[curLine].length) {
									i = index;
									break;
								}
							}
							if (i == index){
								i++;
								i = skipSpaces(i);
								j = i;
								//skipping till the end or a function...
								while (solutionString[curLine].charAt(j) !== '(' 
										&& solutionString[curLine].charAt(j) !== ' '
										&& solutionString[curLine].charAt(j) !== ';'){
									j++;
									if (j >= solutionString[curLine].length) {
										alert("missing ';' at line" + (curLine + 1) + ".");
										return -1;
									}
								}
								//for the return-value functions!!!!!!!!!!!!!!!!!!!!
								if (solutionString[curLine].substring(i,j) in listOfTypes) {
									stringArg += solutionString[curLine].substring(i,j);
									varsDic[nameOfVars[varsDicIndex]] = solutionString[curLine].substring(i, j);
									j++;
								} else if( !(solutionString[curLine].substring(i,j) in varsDic) && isNaN(solutionString[curLine].substring(i,j))) {
									alert("no such value variable/function at line " + (curLine + 1) + ".");
									return -1;
								} else {
									//it is a variable or a val...
									stringArg += solutionString[curLine].substring(i,j);
									varsDic[nameOfVars[varsDicIndex]] = solutionString[curLine].substring(i, j);
									j++;
									j = skipSpaces(j);
									//going to the end of the do-while(0)... the value at the j must be ';'.
									break;
								}
								j = skipSpaces(j);
								if (solutionString[curLine].charAt(j) !== ')') {
									alert("current level get-value-function doesn't accept any arguments");
									return -1;
								}
							} else {
								i++;
								//the i points to the first letter of the value...
								j = i;
								while (solutionString[curLine].charAt(j) !== '"'){
									j++;
									if (j >= solutionString[curLine].length) {
										alert("missing a quotation ' \" ' at line " + (curLine + 1) + ".");
										return -1;
									}
								}
								//the j points to the last ".
								stringArg += solutionString[curLine].substring(i - 1, j + 1);
								varsDic[nameOfVars[varsDicIndex]] = solutionString[curLine].substring(i, j);
							}
							//moving one letter from ')' or '"' to check what is after it.
							j++;
							while(solutionString[curLine].charAt(j) !== ';' && solutionString[curLine].charAt(j) !== ','){
								if (j >= solutionString[curLine].length) {
									alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
									return -1;
								}
								j++;
							}
							if(solutionString[curLine].charAt(j) === ';') {
								//the break sends us to the end of the do-while(0).
								break;
							}
							j++;
							stringArg += ",";
							varsDicIndex++;
							i = j;
						} else if (solutionString[curLine].charAt(i) === ',') {
							i++;
							stringArg += emptyVal +",";
							varsDic[nameOfVars[varsDicIndex]] = emptyVal;
							varsDicIndex++;
							//moving to next loop...
						} else {
							alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
							return -1;
						}
					}
				}
			} else if (listOfTypes[solutionString[curLine].substring(0, k)] == "setVal") {
				//this case was actually dealt with above,even before the if-statement.
			} else if (listOfTypes[solutionString[curLine].substring(0, k)] == "func") {
				var colonCurle;
				if (solutionString[curLine].substring(0, k) in semicolonFuncs){
					colonCurle = ';'
				} else {
					colonCurle = '{';
				}
				//we have now : 'func,functionName,' we need the 'argument'.
				stringArg += solutionString[curLine].substring(0, i) + ",";
				
				//else we have added in the aboveeeeee lines the :'func,two-words funcName,'.
				//let j = i;
				j = i;
				i = skipSpaces(i);
				//the next 26 lines are to check if it is 2 words or 1 word function (e.g. 'if-else' or 'if')...
				let h = i;
				let breakItNow = false;
				for (; solutionString[curLine].charAt(h) !== '(', solutionString[curLine].charAt(h) !== ' '; ++h){
					if (solutionString[curLine].charAt(h) === '{') {
						//removing the ','
						stringArg = stringArg.substring(0, stringArg.length - 1);
						curlyBraceOpened++;
						breakItNow = true;
						break;
					}
					if (solutionString[curLine].length <= h) {
						break;
					}
					//need do a special case for the 'else {'... cause it has no ()
				}
				if (breakItNow){
					break;
				}
				if(listOfTypes[solutionString[curLine].substring(i, h)] == "func") {
					//so far we get : "setVal,varName,"
					stringArg = "func," + solutionString[curLine].substring(0, k) + " " + solutionString[curLine].substring(i, h) + ",";
					i = h;
				} else {
					i = j;
				}
				//this variable is to count the number of opened '(' INSIDE OF THE FUNCTION...).
				let numberBracesOpened = 0;
				//skipping spaces.
				j = i;
				j = skipSpaces(j);
				if (solutionString[curLine].charAt(j) !== '(') {
					//if we got here it means it is a two-words command (e.g. else-if)...
					i = j;//find the RIGHT PLACE FOR the {} of the above if...
					for(; solutionString[curLine].charAt(j) !== ' ', solutionString[curLine].charAt(j) !== '('; ++j) {
						if (j >=  solutionString[curLine].length) {
							alert("missing '(' at line " + (curLine + 1) + ".");
							return -1;
						}
					}
					//it must be a func-type (E.g. else 'if')
					if (!(solutionString[curLine].substring(i,j) in listOfTypes)){
						alert("no such argument at line " + (curLine+ 1)+".");
						return -1;
					}
					//removing the ','
					stringArg = stringArg.substring(0, stringArg.length - 1);
					stringArg += " " + solutionString[curLine].substring(i,j) + ",";	
					//we have now :"func, two-words FuncName,"
					j = skipSpaces(j);
					//it must be a '('.
					if (solutionString[curLine].charAt(j) !== '(') {
						alert("missing '(' at line " + (curLine + 1) + ".");
						return -1;
					}
				}
				i = j;
				//passing the '('
				i++;
				if (solutionString[curLine].substring(0, k) in twoArgsFuncs){
					if ((i = readAllPlusMinusMultAdd(i,',')) == -1 ) {
						return -1;
					}					
					i++;
					if ((i = readAllPlusMinusMultAdd(i,')')) == -1 ) {
						return -1;
					}
					i++;
					//skipping till ';'
					i = skipSpaces(i);
					break;
				} else if (solutionString[curLine].substring(0, k) in semicolonFuncs) { 
					//calculating everysing...~~ :)
					if ((i = readAllPlusMinusMultAdd(i,')')) == -1 ) {
						return -1;
					}
					i++;
					//skipping till ';'
					i = skipSpaces(i);
					break;
				
				}
				var argsEnded = false;
				//skipping the spaces...
				i = skipSpaces(i);
				//place of the first arg in the function.................. play (    ->arg   );
				j = i;
				//rushing till end of name of the variable.
				while (solutionString[curLine].charAt(j) !== ' '
						&& solutionString[curLine].charAt(j) !== ')'
						&& solutionString[curLine].charAt(j) !== '='
						&& solutionString[curLine].charAt(j) !== '.'){ 
					if (solutionString[curLine].charAt(j) == '(') {
						numberBracesOpened++;
						break;
					}
					++j;
				}
				if(solutionString[curLine].charAt(j) === '.') {
					stringArg += solutionString[curLine].substring(i, j) + ",";
					if (!(solutionString[curLine].substring(i, j) in varsDic)) {
						alert("the variable " + solutionString[curLine].substring(i, j) + " at line " + (curLine + 1) + " is not declared.");
						return -1;			
					}
					//jumping over the '.'
					j++;
					i = j;
					let hi;
					while (solutionString[curLine].charAt(j) !== ' '){ 
						hi = solutionString[curLine].charAt(j);
						if (solutionString[curLine].charAt(j) == '(') {
							numberBracesOpened++;
							break;
						}
						++j;
					}
				}
				//we reached the end, is it whitespace or is it ')'
				//we got the name of the first var.
				if (solutionString[curLine].substring(i, j) in varsDic){
					//if we got here, it means that the word was a existant variable name.
					//stringArg += varsDic[solutionString[curLine].substring(i, j)];
					stringArg += solutionString[curLine].substring(i, j);
					j = skipSpaces(j);
					if (solutionString[curLine].charAt(j) === ')'){
						argsEnded = true;
					} else {
						stringArg += ",";
					}
				} else if (solutionString[curLine].substring(i, j) in objectFunctions) {
					stringArg += solutionString[curLine].substring(i, j);
					j = skipSpaces(j);
					if (solutionString[curLine].charAt(j) != '(') {
						alert("missing an opening braces '(' for the object-function at line " + (curLine + 1) + ".");
						return -1;
					}
					j++;
					j = skipSpaces(j);
					argsEnded = true;
					//n then we skip everything and go to the while(numberBracesOpened)...
				} else if (solutionString[curLine].substring(i, j) in semicolonFuncs) {
					//a function that doesn't accept any arguments for now...
					stringArg += solutionString[curLine].substring(i, j);
					j++;
					if ((j = skipSpaces(j, ')')) == -1) {
						return -1;
					}
					//there were a 2 ')'
					j++;
					if ((j = skipSpaces(j, ')')) == -1) {
						return -1;
					}
					j++;
					if ((j = skipSpaces(j, '{')) == -1) {
						return -1;
					}
					curlyBraceOpened++;
					j++;
					while (j < solutionString[curLine].length){
						if (solutionString[curLine].charAt(j) !== ' ' && solutionString[curLine].charAt(j) !== '\n'){
							alert("please don't put anything after the '" + colonCurle + "' at line " + (curLine + 1) + ".");
							return -1;
						}
						j++;
					}
					//going to end of do-while(0)...
					break;
				} else {
					let k = j;
					k = skipSpaces(k);
					//the func doesn't accept args, which is peek() func in our case;
					if (solutionString[curLine].charAt(k) === ')'){
						if (solutionString[curLine].charAt(i) === '"' || solutionString[curLine].charAt(j - 1) === '"'){
							//increasing the i and reducing the j by 1, so we dont include the '"' in our saving...
							i++;
							//removing the emptyVal, because actually there was a val...
							stringArg += solutionString[curLine].substring(i - 1, j) + ",";						
						} else {
							stringArg += emptyVal;
						}
						//j = skipSpaces(j);
						j = k;
						argsEnded = true;
					} else if (solutionString[curLine].charAt(i) !== '"' || solutionString[curLine].charAt(j - 1) !== '"'){
						alert("the variable " + solutionString[curLine].substring(i, j) + " at line " + (curLine + 1) + " is not declared.");
						return -1;			
					} else {
						//increasing the i and reducing the j by 1, so we dont include the '"' in our saving...
						i++;
						//removing the emptyVal, because actually there was a val...
						//stringArg = stringArg.substring(0, stringArg.length - emptyVal.length);
						stringArg += solutionString[curLine].substring(i - 1, j ) + ",";
					}
				}
				
				
				//the j was stopped on the ')'.
				if (!argsEnded) {
					//this is for the conditions insie the if's ==, >= ...etc
					colonCurle = '{';
					j = skipSpaces(j);
					var whatIsIt = solutionString[curLine].substring(j,j+2);
					if (!(boolChecking.includes(whatIsIt))){
						alert ("missing a boolean statement at line " + (curLine + 1) + ".");
						return -1;
					}
					i = j;
					j += 2;
					stringArg += solutionString[curLine].substring(i,j) + ",";
					j++;
					j = skipSpaces(j);
					i = j;
					for (j; solutionString[curLine].charAt(j) !== ' ', solutionString[curLine].charAt(j) !== ')'; j++){
						if (j >=  solutionString[curLine].length) {
							alert("missing ')' at line " + (curLine + 1) + ".");
							return -1;
						}
					}
					if (solutionString[curLine].substring(i, j) in varsDic){
						//if we got here, it means that the word was a existant variable name.
						//stringArg += varsDic[solutionString[curLine].substring(i, j)];
						stringArg += solutionString[curLine].substring(i, j);
					} else {
						if (solutionString[curLine].charAt(i) !== '"' || solutionString[curLine].charAt(j - 1) !== '"'){
							alert("the variable " + solutionString[curLine].substring(i, j) + " at line " + curLine + " is not declared.");
							return -1;
						} else {
							//increasing the i and reducing the j by 1, so we dont include the '"' in our saving...
							i++;
							stringArg += solutionString[curLine].substring(i - 1, j);
						}
					}
				}
				//i did !== -1 because the loop includes the main one, but the numberBracesOpened doesn't!.
				while (numberBracesOpened !== -1) {
					j = skipSpaces(j);
					i = j;
					if (solutionString[curLine].charAt(j) !== ')') {
						alert("missing ')' at line " + (curLine + 1) + ".");
						return -1;
					}					
					j++;
					numberBracesOpened--;
				}
				j = skipSpaces(j);
				if (solutionString[curLine].charAt(j) !== colonCurle){
					alert("missing '"+ colonCurle +"' at end of line " + (curLine + 1) + ".");
					return -1;
				}
				if (colonCurle === '{'){
					//...................................................................................................................................................................................................i guess i will need to delete the below line in order to allow nesting!.
					curlyBraceOpened++;
					funcCurlyBracesLine = curLine + 1;
				}
				j++;
				while (j < solutionString[curLine].length){
					if (solutionString[curLine].charAt(j) !== ' ' && solutionString[curLine].charAt(j) !== '\n'){
						alert("please don't put anything after the '" + colonCurle+ "' at line " + (curLine + 1) + ".");
						return -1;
					}
					j++;
				}
			} else if (listOfTypes[solutionString[curLine].substring(0, k)] == "word") {
				//'break'
				stringArg += solutionString[curLine].substring(0, i);
				i = skipSpaces(i);
				if (solutionString[curLine].charAt(i) !== ';') {
					alert("missing a semi-colon ';' at line " + (curLine + 1) + ".");
					return -1;
				}
				i++;
				while (i < solutionString[curLine].length){
					if (solutionString[curLine].charAt(i) !== ' '){
						alert("please don't put anything after the ':' at line " + (curLine + 1) + ".");
						return -1;
					}
					i++;
				}
			} else if (listOfTypes[solutionString[curLine].substring(0, k)] == "case"){
				stringArg += solutionString[curLine].substring(0, i) + ",";
				i = skipSpaces(i);
				//let j = i;
				j = i;
				for(; solutionString[curLine].charAt(j) !== ' ', solutionString[curLine].charAt(j) !== ':'; ++j){
					if (j >= solutionString[curLine].length) {
						alert("missing a ':' after the case statement at line " + (curLine + 1) + ".");
						return -1;
					}
				}
				stringArg += solutionString[curLine].substring(i, j);
				j = skipSpaces(j);
				if (solutionString[curLine].charAt(j) !== ':'){
					alert("missing a ':' after the case statement at line " + (curLine + 1) + ".");
					return -1;				
				}
				j++;
				while (j < solutionString[curLine].length){
					if (solutionString[curLine].charAt(j) !== ' '){
						alert("please don't put anything after the ':' at line " + (curLine + 1) + ".");
						return -1;
					}
					j++;
				}
			} else if (listOfTypes[solutionString[curLine].substring(0, k)] == "object") {
				let theType = solutionString[curLine].substring(0, k);
				//skipping spaces.
				for(; solutionString[curLine].charAt(i) === ' '; ++i) {}
				//let j = i;
				j = i;
				//rushing till end of name of the variable.
				while (solutionString[curLine].charAt(j) !== ' ' 
					&& solutionString[curLine].charAt(j) !== ','
					&& solutionString[curLine].charAt(j) !== ';'){
						++j;
				}
				if (solutionString[curLine].charAt(j) === ',') {
					alert("please declare/create ONE object at a time!");
					return -1;
				}
				//we reached the end, is it whitespace or is it ';'
				//we got the name of the first var.
				stringArg += solutionString[curLine].substring(i, j) + ",";
				nameOfVars[varsDicIndex] = solutionString[curLine].substring(i, j);
				namesToTypesDic[solutionString[curLine].substring(i, j)] = solutionString[curLine].substring(0, k);
				if (nameOfVars[varsDicIndex] in varsDic) {
					alert ("there is an existant variable/object with the same name");
					return -1;
				}
				varsDic[nameOfVars[varsDicIndex]] = emptyVal;
				//skipping spaces after nameOfVariable.
				j = skipSpaces(j);
				i = j;
				//checking if we reached a semi-colon.
				if (solutionString[curLine].charAt(j) === ';') {
					//setting empty value of the name element.
					varsDic[nameOfVars[varsDicIndex]] = emptyVal;
					stringArg += emptyVal;
					//the break sends us to the end of the do-while(0).
					break;
				} else {
					//it MUST be a ',' or '='.					
					j = i;
					//checking if it a value...
					if (solutionString[curLine].charAt(i) === '='){
						i++;
						i = skipSpaces(i);
						j = i;
						for(; solutionString[curLine].charAt(j) !== ' '; ++j) {
							if (j >= solutionString[curLine].length) {
								alert("missing the word 'new' when allocating the object at line", + (curLine + 1) + ".");
								return -1;
							}
						}
						if (solutionString[curLine].substring(i,j) != "new") {
							alert("missing the word 'new' when allocating the object at line", + (curLine + 1) + ".");
							return -1;						
						}
						//moving one letter from 'new' to check what is after it.
						j++;
						j = skipSpaces(j);
						i = j;
						for(; solutionString[curLine].charAt(j) !== ' ', solutionString[curLine].charAt(j) !== '('; ++j) {
							if (j >= solutionString[curLine].length) {
								alert("missing the type of the object after ", + (curLine + 1) + ".");
								return -1;
							}
						}
						j = skipSpaces(j);
						if (solutionString[curLine].charAt(j) !== '(') {
							alert("missing a '(' at line" + (curLine + 1) + ".");
							return -1;
						}
						j++;
						j = skipSpaces(j);
						if (solutionString[curLine].charAt(j) !== ')') {
							alert("missing a ')' at line" + (curLine + 1) + ".");
							return -1;	
						}
						j++;
						while(solutionString[curLine].charAt(j) !== ';'){
							if (j >= solutionString[curLine].length) {
								alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
								return -1;
							}
							j++;
						}
						//the break sends us to the end of the do-while(0).
						break;
						/*
						if(solutionString[curLine].charAt(j) === ';') {
							//the break sends us to the end of the do-while(0).
							break;
						}
						
						j++;
						stringArg += "";
						i = j;
						*/
					} else {
						//it is a ','
						alert("please declare/create ONE object at a time!");
						return -1;
					}
				}
			} else if (listOfTypes[solutionString[curLine].substring(0, k)] == "loop") {
				//loop, nameOfFunction, 
				stringArg += solutionString[curLine].substring(0, i) + ",";
				i = skipSpaces(i);
				//reads object and its 0-parameters function..in case failed returns -1.
				if (solutionString[curLine].substring(0, k) == "while"){
					if ( solutionString[curLine].charAt(i) !== '(') {
						alert("missing a '(' at line " + (curLine + 1) + ".");
						return -1;
					}
					//j = checkObject(i);
					i++;
					//skip till, but don't skip the spaces..
					if((j = skipTill(i, '(')) == -1) {
						return -1
					}
					if (!solutionString[curLine].substring(i, j) in listOfTypes) {
						alert("'" + solutionString[curLine].substring(i,k) + "' at line " + (curLine + 1) + " is not available on this level!");
						return -1;
					}
					//adding the boolean function for the while as a condition...
					stringArg += solutionString[curLine].substring(i, j);
					j++;
					if((j = skipSpaces(j)) == -1) {
						return -1;
					}
					if (solutionString[curLine].charAt(j) !== ')') {
						alert("missing a ')' at line " + (curLine + 1) + ".");
						return -1;
					}
					
					//there was two ')'
					j++;
					if((j = skipSpaces(j)) == -1) {
						return -1;
					}
					if (solutionString[curLine].charAt(j) !== ')') {
						alert("missing a ')' at line " + (curLine + 1) + ".");
						return -1;
					}
					j++;
					//skipping spaces also till '{', the second parameter is to tell what is missing...
					if ((j = skipSpaces(j, '{')) == -1) {
						return -1;
					}
					if (solutionString[curLine].charAt(j) !== '{') {
						alert("missing a '{' at line " + (curLine + 1) + ".");
						return -1;
					}
					curlyBraceOpened++;
					j++;
					//reading after the { ....... only spaces /tabs allowed..
					while (j < solutionString[curLine].length) {
						if (solutionString[curLine].charAt(j) != ' ' && solutionString[curLine].charAt(j) != '\t') {
							alert("please don't put anything after the '{' at line " + (curLine + 1) + ".");
							return -1;
						}
					}
					//DONE.
				} else if (solutionString[curLine].substring(0, k) == "for") {
					j = forLoopRead(i);
				}
				if (j == -1) {
					return -1;
				}
				//going to the end of do-while(0).
				break;
			}
		} while(0);
		if (j < solutionString[curLine].length) {
			j = skipSpaces(j);
			if (solutionString[curLine].charAt(j) === ';') {
				j++;
				while (j < solutionString[curLine].length){
					if (solutionString[curLine].charAt(j) !== ' '){
						alert("please don't put anything after the semi-colon ';' at line " + (curLine + 1) + ".");
						return -1;
					}
					j++;
				}
			}
		}
		
		curLine++;
		varsDicIndex++;
		workingTable[workingTable.length] = stringArg;
		let res = readSolAndApply();
		return res;
	} else {
		if(curlyBraceOpened) {
			alert("missing a closing curly braces '}' for the function opened at line " + funcCurlyBracesLine + ".");
			return -1;
		}
	}
}


String.prototype.replaceAt=function(index, replacement) {
	return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
String.prototype.removeSubtring=function(begin, end) {
	return this.substr(0, begin) + this.substr(end);
}

let aiChoice = "";
let namesToTypesDic = {};
let arraySizes = {};
function playTheCode() {
	var doThirdScopeForLoop = 0;
	//firstScopeString is a stack that has the info of the firstscope of the loop.
	var firstScopeString = [];
	//stack is a stack that has the line of the for-loops...
	var stack = [];
	//varsDicIndex = 0;
	varsDic = {};
	namesToTypesDic = {};
	arraySizes = {};
	/*for the if- functions.
	 - enteredFunc =2 => no if-statement(normal code). 
	 - enteredFunc =1 => entered the if, correct statement until "endFunc". 
	 - enteredFunc =0 => false-statement.*/
	var enteredFunc = 2;
	for (let i = 0; i < workingTable.length; ++i){
		curLine = i;
		var arguments = workingTable[i].split(',');
		if (arguments[0] == "endFunc" && enteredFunc === 1) {
			//gotta skip all the else-if n else statements.
			do {
				i++;
				arguments = workingTable[i].split(',');		
				if (i < workingTable.length) {
					arguments = workingTable[i].split(',');
					if (arguments[1] == "else if" || arguments[1] == "else"){
						do {
							i++;
							arguments = workingTable[i].split(',');
						} while(arguments[0] != "endFunc");
					} else {
						enteredFunc = 2;
						break;
					}
				} else {
					enteredFunc = 0;
					break;
				}
			}while(1);
		} else if (arguments[0] == "endFunc" && enteredFunc === 0) {
			enteredFunc = 3;
		}
		if (enteredFunc){
			if(listOfTypes[arguments[0]] == "declare"){
				for (let j = 1; j < arguments.length - 1; j += 2) {
					varsDic[arguments[j]] = arguments[j + 1];
					namesToTypesDic[arguments[j]] = arguments[0];
				}
			} else if (arguments[0] == "setVal"){
				//setVal, name, value
				//setVal, name, index, value or setVal, name, putValueFunc, argument
				if (arguments.length === 4) {
					if(listOfTypes[namesToTypesDic[arguments[1]]] == "object") {
						//if the func belong to that object (e.g. push to stack or enqueue to queue...)
						if (namesToTypesDic[arguments[1]] == objectFunctions[arguments[2]]) {
							//if func == setValFunc[funcName]) (e.g push , enqueue, put, set, whatevah (in future maybe)...
							if (varsDic[arguments[1]] == emptyVal) {
								alert("the object '" + arguments[1] + "' wasn't allocated memory");
								$("#doneButton").css("pointerEvents","auto");
								return -1;
							}
							if (arguments[2] == "push" || arguments[2] == "enqueue") {
								//the value is gonna be separated by the '-'.
								if (varsDic[arguments[1]] != "") {
									varsDic[arguments[1]] += '-';
								}
								varsDic[arguments[1]] += arguments[3];
							} else if (argument[2] == "pop" || arguments[2] == "denqueue") {
								//pops the last element from the object given as argument.
								popElmFrom(argument[1]);
							}
						} else {
							alert("can't use function '" + argument[2] +"' on object of type '" + namesToTypesDic[arguments[1]]+"'.");
							$("#doneButton").css("pointerEvents","auto");
							return -1;
						}
					} else {
						//if 4 arguments it means it a setVal for array element.
						//setVal, arrName, index, val.
						let arrayElms = varsDic[arguments[1]].split('-');
						let inde;
						if (parseInt(arguments[2]) >= parseInt(arraySizes[arguments[1]])) {
							alert("out of bounds of declared array");
							$("#doneButton").css("pointerEvents","auto");
							return -1;
						}
						for(inde = 0; inde < arrayElms.length; ++inde){
							if ((arrayElms[inde].split('.'))[0] === arguments[2]){
								//lets say 3rd place --> 2*4 = 8 + 2 = 10th letter -->1.a-2.b-3.c <<<c is 10th letter. 
								varsDic[arguments[1]] = varsDic[arguments[1]].replaceAt(inde*4 + 2, arguments[3])
								break;
							}
						}
						if(inde === arrayElms.length) {
							if (varsDic[arguments[1]] == emptyVal){
								varsDic[arguments[1]] = arguments[2] + "." + arguments[3];
							} else {	
								varsDic[arguments[1]] += "-" + arguments[2] + "." + arguments[3];
							}
						}
					}
				} else {
					//setVal, varName, value
					if(arguments[2] == "peek") {
						//this line won't be reached becuase of the replace func at beginning of the for above.
						varsDic[arguments[1]] = aiChoice;
					} else {
						if ( arguments[2] in varsDic) {
							varsDic[arguments[1]] = varsDic[arguments[2]];
						} else if(listOfTypes[namesToTypesDic[arguments[1]]] == "object"){
							//it means he is allocating memory now... setVal, objectName, allocateOrder!..the checking was done in the past func..
							//if arguments[2] == "allocateByDeleteEmptyVal"....
							varsDic[arguments[1]] = "";
							//by doing the above line we erase the emptyVal, so the object was allocating memory now...
						} else {
							varsDic[arguments[1]] = arguments[2];
						}
					}
				}
			} else if (listOfTypes[arguments[0]] == "func"){
				//it was func,functionName,arguments...now it is functionName,functionName, arguments...
				//it went that way because i made nameToType dictionary..
				if (arguments[1] in twoArgsFuncs ) {
					//name, name, args..., end, args2.., end,
					let l = 2;
					//converting all the variables to their numeric values.
					for (; arguments[l] != "end"; l++) {
						if (arguments[l] in varsDic){
							arguments[l] = varsDic[arguments[l]];
						}
					}
					//skipping over the first end;
					l++;
					//converting after the first end... 
					for (; arguments[l] != "end"; l++) {
						if (arguments[l] in varsDic){
							arguments[l] = varsDic[arguments[l]];
						}
					}
					//calculating all the numeric value...
					let x = sumAllValues(arguments, 2, "end");
					let ind;
					for (ind = 2; arguments[ind] != "end"; ind++){}
					ind++;
					let y = sumAllValues(arguments, ind, "end");
					if (x == -1 || y == -1) {
						return -1;
					}
					if (arguments[1] == "createInv"){
						if (level != 1 ) {
							alert("you can not use the function '" + arguments[1] + "' on this level");	
							$("#doneButton").css("pointerEvents","auto");
							return -1;
						}
						createInvader(x, y);
						//return 0;
					} else if (arguments[1] == "createHero") {
						if (level != 1 ) {
							alert("you can not use the function '" + arguments[1] + "' on this level");	
							$("#doneButton").css("pointerEvents","auto");
							return -1;
						}
						createHero(x, y);
						//return 0;
					}
				} else if (arguments[1] == "moveHero") {
					
					let l = 2;
					//converting all the variables to their numeric value..
					for (; arguments[l] != "end"; l++) {
						if (arguments[l] in varsDic){
							arguments[l] = varsDic[arguments[l]];
						}
					}
					//calculating the value of the step
					let x = sumAllValues(arguments, 2, "end");
					hero.left += x;
					if (hero.left >= 1100 || hero.left <= 350) {
						hero.left -= x;
						if (missiles.length != 0 && missiles.length < enemies.length) {
							alert("there are TWO invaders at same x-axis point!, so i guess shooting once isn't enough to kill them both!");
							hero.left = 390;
							moveHero();
							return -1;
						}
					}
					moveHero();
				} else if (arguments[1] == "heroShoot") {
					console.log("FIRE");
					missiles.push({
						left: hero.left + 15,
						top: hero.top
					})
					console.log(missiles);
					drawMissiles();
				} else if (arguments[1] == "if") {
					if (arguments[2] != "isAlienAhead") {
						alert('only the given boolean functions are allowed to be set as conditions on this level');
						$("#doneButton").css("pointerEvents","auto");
						return -1;
					}
					if(isEnemyAhead() == true) {
						enteredFunc = 1;
					} else {
						enteredFunc = 0;
					}
					/*
					if (arguments[2] in varsDic){
						arguments[2] = varsDic[arguments[2]];
					}
					if (arguments[4] in varsDic){
						arguments[4] = varsDic[arguments[4]];
					}
					
					if (arguments[2] == arguments[4]){
						enteredFunc = 1;
					} else {
						enteredFunc = 0;
					}
					*/
				} else if (arguments[1] == "else if") {
					if (enteredFunc == 1){
						continue;
					} else if (enteredFunc == 2) {
						alert("missing if-statement before the else-if statement at line " + (i + 1) +".");
						$("#doneButton").css("pointerEvents","auto");
						return -1;
					} else if (enteredFunc == 3) {
						if (arguments[2] in varsDic){
							arguments[2] = varsDic[arguments[2]];
						}
						if (arguments[4] in varsDic){
							arguments[4] = varsDic[arguments[4]];
						}
						
						
						if (arguments[2] == arguments[4]) {
							enteredFunc = 1;
						} else {
							enteredFunc = 0;
						}
					}
				} else if (arguments[1] == "else"){
					//do nothing...
				} else if (arguments[1] == "switch"){
					if (!(arguments[2] in varsDic)){
						alert("please put an existant variable as argument for the switch-function.");
						$("#doneButton").css("pointerEvents","auto");
						return -1;
					}
					let switchVariableVal = varsDic[arguments[2]];
					//gotta skip all the else-if n else statements.
					//let j = i;
					j = i;
					do {
						i++;
						arguments = workingTable[i].split(',');		
						if (i < workingTable.length) {
							if (arguments[1] == "case" && arguments[2] == switchVariableVal){
								break;
							} else if (arguments[0] == "endFunc") {
								//searching for the default spot.
								do{
									j++;
									arguments = workingTable[j].split(',');
									if (j >= workingTable.length) {
										alert("missing a 'default' case for the switch statement.");
										$("#doneButton").css("pointerEvents","auto");
										return -1;
									}
									i = j;
								} while (arguments[1] != "default");
								//breaking the do-while and going to the next-iteration in the big-for loop.
								break;
							}
						} else {
							alert("missing a closing curly brackets '}'.");
							$("#doneButton").css("pointerEvents","auto");
							return -1;
						}
					} while(1);
				} else if (arguments[1] == "play") {
					//func, func, argument -or- func,func, object, getValFunc -or- func,func, variable.
					if (arguments[2] in varsDic) {
						if (listOfTypes[namesToTypesDic[arguments[2]]] == "object") {
							//it is either pop or dequeue...
							if (arguments[3] == "pop") {
								playColor(popElmFrom(arguments[2]));
							} else if (arguments[3] == "dequeue") {
								playColor(dequeueElmFrom(arguments[2]));	
							}
						} else {
							//a simple variable...
							playColor(varsDic[arguments[2]]);
						}
					} else {
						playColor(arguments[2]);
					}
				} else if (arguments[1] == "push") {
					
				}
			} else if (listOfTypes[arguments[0]] == "word") {
				//word, theFuncWord.
				if (arguments[1] == "break") {
					do{
						i++;
						arguments = workingTable[i].split(',');
						if (i >= workingTable.length) {
							alert("missing a closing curly brackets '}'.");
							$("#doneButton").css("pointerEvents","auto");
							return -1;
						}
					} while (arguments[0] != "endFunc");				
				}
			} else if (arguments[0] == "declareArray") {
				//declareArray,arrName,sizeArr or vals in form (1.2-4.hi) 
				if (arguments.length === 3) {
					varsDic[arguments[1]] = emptyVal;
					arraySizes[arguments[1]] = arguments[2];
					namesToTypesDic[arguments[1]] = "int-Array";
				} else {
					//gotta put the arraySize according to the number of the '-'...
				}
			} else if (listOfTypes[arguments[0]] == "object") {
				if (arguments[0] != "Stack" && level == 3) {
					alert("only Stack objects are allowed on this level!");
					$("#doneButton").css("pointerEvents","auto");
					return -1;
				} else if (arguments[0] != "Queue" && level == 2) {	
					alert("only Queue objects are allowed on this level!");
					$("#doneButton").css("pointerEvents","auto");
					return -1;
				}
				if (arguments[2] == "") {
					//it means that it was allocated so we no put emptyVal...
					varsDic[arguments[1]] = "";
				} else {
					//it means that it wasn't allocated with the 'new'...
					varsDic[arguments[1]] = emptyVal;
				}
				//objectName --> type ( stack, queue, list ... etc).
				namesToTypesDic[arguments[1]] = arguments[0];
			} else if (arguments[0] == "while") {
				var loopIndex = i;
				stack.push(i);
				//skip over the rest lines of the loop
				if (arguments[2] == "areThereEnemies") {
					if (enemies.length <= missiles.length) {
						stack.pop();
						let numSkippings = 0;
						do {
							i++;
							if (arguments[0] in scopedFuncs){
								numSkippings++;
							}
							if (arguments[0] == "endFunc") {
								numSkippings--;
							}
							arguments = workingTable[i].split(',');
						} while(arguments[0] != "endFunc" && numSkippings != 0);
					}
					//else do nothing... just continue to next code-line...
				} else {
					alert("wrong AVAILABLE condition for the while-loop on this current level.");
					return -1;
					//while is empty...
					if (varsDic[arguments[2]] != "") {
						do {
							i++;
							arguments = workingTable[i].split(',');		
						} while(arguments[0] != "endFunc");	
					}
				}
				
			} else if (arguments[0] == "for") {
				stack.push(i);
				//for,for,type Or not, variable , valToSet, firstScopeDone, var, booleanOper, var/num, secondScopeDone, var, val,op,val,op,val,op,val..,end,
				var loopIndex = i;
				let index = 2;
				if(arguments[2] != "firstScopeDone") {
					//it means first time entering for-loop...
					let declareOrVar = ""
					if (arguments[2] in listOfTypes){
						declareOrVar = arguments[2];
						//simply removing it....(we read the firstscope n delete directly...
						arguments.splice(2,1);
					} else {
						declareOrVar = arguments[index];
						if (!(arguments[index] in varsDic)) {
							alert("the variable '" + declareOrVar + "' wasn't declared before...");
							return -1;
						}
					}
					//setting the declared var.. or the alr-existant var to the given value..
					varsDic[arguments[index]] = arguments[index + 1];
					//removing the val...
					arguments.splice(index + 1,1);
					//removing the var from the ARGUMENTS... for correct index val...
					arguments.splice(index,1);
					
					let indexOfBeginOfFirstScope = workingTable[i].indexOf(declareOrVar);
					//now we need the end index...
					//NOTE: arguments[index] equals "firstScopeDone"
					let indexOfEndFirstScope = workingTable[i].indexOf(arguments[index]);
					//adding the gonna-be-deleted firstScope data from the working table to the firstScopeString stack!
					firstScopeString.push(workingTable[i].substring(indexOfBeginOfFirstScope,indexOfEndFirstScope));
					//removing the before firstScopeDone and after for,for,
					workingTable[i] = workingTable[i].removeSubtring(indexOfBeginOfFirstScope,indexOfEndFirstScope);
				}
				
				
				let indexForThirdScope = index;
				while(arguments[indexForThirdScope] != "secondScopeDone"){
					indexForThirdScope++;
				}
				indexForThirdScope++;
				//points to the values to be calculated .....
				let searchMultDiv = indexForThirdScope + 1;
				let noMultDiv = false;
				if (doThirdScopeForLoop) {
					doThirdScopeForLoop--;
					//converting the variable names to their values.
					arguments = convertToNumbers(arguments, searchMultDiv, "thirdScopeDone")
					//getting back to beginning...
					searchMultDiv = indexForThirdScope + 1;
					varsDic[arguments[indexForThirdScope]] = (sumAllValues(arguments, searchMultDiv, "thirdScopeDone")).toString();
					//DONE!!!!! HURRAYYY :).
					if (varsDic[arguments[indexForThirdScope]] == -1) {
						return -1;
					}
				}
						
				//skipping over to var in second scope.--->var, booleanOper, var/num, secondScopeDone
				while(arguments[index] != "firstScopeDone"){
					index++;
				}
				index++;
				//converting to numbers........
				if (arguments[index] in varsDic) {
					arguments[index] = varsDic[arguments[index]];
				}
				if (arguments[index + 2] in varsDic) {
					arguments[index + 2] = varsDic[arguments[index + 2]];
				}
				let keepLoop = checkSecondScopeOfFor(arguments[index], arguments[index + 1] , arguments[index + 2]);
				//keepLoop --> the next time we loop over back to this loop or no!.
				if (!keepLoop) {
					//removing the loop from the stack....
					let forLoopIndex = stack.pop();
					let indexToInsert = workingTable[forLoopIndex].indexOf("firstScopeDone");
					let firstScopeDecNvar = firstScopeString.pop();
					//resetting that line to the same as it was before! :)...
					workingTable[forLoopIndex] = workingTable[forLoopIndex].substring(0, indexToInsert) + firstScopeDecNvar + workingTable[forLoopIndex].substring(indexToInsert);
					firstScopeDecNvar = firstScopeDecNvar.split(',');
					//if the first element was "type" then we remove it from the varsDic...
					if (listOfTypes[firstScopeDecNvar[0]] == "declare"){
						delete varsDic[firstScopeDecNvar[1]];
					}
					//skip all the lines by ( stack...)
					let numberOfEndFuncSkippings = 0;
					while(1) {
						i++;
						arguments = workingTable[i].split(',');
						if (arguments[0] == "endFunc" && numberOfEndFuncSkippings == 0) {
							break;
						}
						if (listOfTypes[arguments[0]] == "loop") {
							numberOfEndFuncSkippings++;
						}
						if (arguments[0] == "endFunc") {
							numberOfEndFuncSkippings--;
						}
					}
				} else {
					
				}
			} else if (arguments[0] == "endFunc") {
				//will enter here only if there was a for or a while before....
				//i = loopIndex - 1;
				i = stack.pop() - 1;
				doThirdScopeForLoop++;
			}
		}
	}
	if (level == 1) {
		if (checkLevelOneConditions() == -1) {
			return -1;
		}
		moveNextLevel();
	}
	return 0;
}
function checkLevelOneConditions() {
	if (enemies.length != 12){
		alert("you must create exactly 12 space invaders!");
		return -1;
	}
	for (let i = 0; i < enemies.length; i++) {
		for (let j = 0; j < enemies.length; j++) {
			if (i != j){
				if (enemies[i]['left'] == enemies[j]['left']
				 && enemies[i]['top'] == enemies[j]['top']) {
					alert("there is at least two invaders that are on the same exact spot!");
					return -1
				}
			}
		}
	}
	return 0;
}
	


/**
	checkSecondScopeOfFor function returns true if the condition is true and the loop must BREAK, otherwise false.
*/
function checkSecondScopeOfFor(variable, operation, value) {
	switch(operation) {
		case "==":{
			if (variable == value){
				return true;
			}
			return false;
		}
		case ">":{
			if (variable > value){
				return true;
			}
			return false;
		}
		case "<":{
			if (variable < value){
				return true;
			}
			return false;
		}
		case ">=":{
			if (variable >= value){
				return true;
			}
			return false;
		}
		case "<=":{
			if (variable <= value){
				return true;
			}
			return false;
		}
		case "!=":{
			if (variable != value){
				return true;
			}
			return false;
		}
	}
}


function skipSpaces(j, theEndChar = ';'){
	for (;solutionString[curLine].charAt(j) === ' '; ++j) {
		if (solutionString[curLine].length <= j) {
			alert(" missing a '" + TheEndChar + "' at end of line ", + (curLine + 1) + ".");
			return -1;
		}
	}
	return j;
}

function createInvader(x, y) {
	enemies.push({left: x, top:y});
}
function createHero(x, y) {
	//enemy.push({x, y});
}

function convertToNumbers(arguments, index, stopString){
	while(arguments[index] != stopString){
		//converting all the variables to numbers only (in string numbers).
		if (arguments[index] in varsDic) {
			arguments[index] = varsDic[arguments[index]];
		}
		index++;
	}
	return arguments;
}


/**
  checkObject: this function reads an object and its function (without parameters function).
*/
function checkObject(i) {
	var j;
	//getting into the the ( of the while (
	if (solutionString[curLine].charAt(i) !== '(') {
		alert("missing a opening braces '(' at line " + (curLine + 1) + ".");
		return -1;					
	}
	i++;
	//getting into the first argument inside the loop...
	i = skipSpaces(i);
	j = i;
	//on this game we are only allowed to put the function of the object which are booolean only..
	for (; solutionString[curLine].charAt(j) !== '.'; j++){
		if (j >= solutionString[curLine].length){
			//it means that he put some other conditions?
			alert("please don't use anything beside the specified functions for this level, line" + (curLine + 1) + ".");
			return -1;
		}
	}
	//checking if the object is actually declared or no...
	if (!(solutionString[curLine].substring(i, j) in varsDic)) {
		alert("the object " + solutionString[curLine].substring(i, j) + ", at line " + (curLine + 1) + ", wasn't declared/allocated before.");
		return -1;
	}
	//adding the name of the object.
	stringArg += solutionString[curLine].substring(i, j) + ",";
	//in case he put something like this q.   push()...
	j = skipSpaces(j);
	i = j + 1;
	for (; solutionString[curLine].charAt(j) != '('; j++){
		if (solutionString[curLine].charAt(j) == ' ') {
			break;
		}
		var batta = solutionString[curLine].charAt(j);
		if (j >= solutionString[curLine].length) {
			//it means that he put some other conditions?
			alert("please don't use anything beside the specified functions for this level, line" + (curLine + 1) + ".");
			return -1;
		}
	}
	//checking if the function is actually an existant one.
	if (!(solutionString[curLine].substring(i, j) in objectFunctions)) {
		alert("no such function at line " + (curLine + 1) + ".");
		return -1;
	//checking if the function is a boolean - returning type.
	} else if (objectFunctions[solutionString[curLine].substring(i, j)] != "boolean") {
		alert("please put only boolean-returning function in the while loop at line " + (curLine + 1) + ".");
		return -1;
	}
	//adding the name of the function in the while loop...
	stringArg += solutionString[curLine].substring(i, j);
	j = skipSpaces(j);
	if (solutionString[curLine].charAt(j) !== '(') {
		alert("missing a opening braces '(' at line " + (curLine + 1) + ".");
		return -1;					
	}
	//cause we had a function one for function ')' and one for the while ')' so from 1 to -1 ==> 2 times.
	let numberBracesOpened = 1;
	j++;
	//i did !== -1 because the loop includes the main one, but the numberBracesOpened doesn't!.
	while (numberBracesOpened !== -1) {
		j = skipSpaces(j);
		i = j;
		if (solutionString[curLine].charAt(j) !== ')') {
			alert("missing ')' at line " + (curLine + 1) + ".");
			return -1;
		}					
		j++;
		numberBracesOpened--;
	}
	j = skipSpaces(j);
	if (solutionString[curLine].charAt(j) !== '{') {
		alert("missing '{' after the ')' of the loop at line " + (curLine + 1) + ".");
		return -1;
	}
	//in order to make the line '}' pass.
	curlyBraceOpened++;
	j++;
	while (j < solutionString[curLine].length){
		if (solutionString[curLine].charAt(j) !== ' '){
			alert("please don't put anything after the semi-colon '{' at line " + (curLine + 1) + ".");
			return -1;
		}
		j++;
	}
	return j;
}

/**
 * the arguments are array of strings, index is begin index of all the arguments, stopString is when to stop in the arguments..
 */
function sumAllValues(arguments, index, stopString) {
	let searchMultDiv = index;
	let noMultDiv = false;
	//now calculating first the * and the /
	while(1){
		while(arguments[searchMultDiv] != "*" && arguments[searchMultDiv] != "/" ){
			searchMultDiv++;
			if (arguments[searchMultDiv] == stopString){
				noMultDiv = true;
				break;
			}
		}
		//there was a mult or div...
		if (!noMultDiv) {
			let firstNum;
			let secondNum;
			firstNum = parseInt(arguments[searchMultDiv - 1]);								
			secondNum = parseInt(arguments[searchMultDiv + 1]);
			if (isNaN(firstNum) || isNaN(secondNum)) {
				alert("expected numbers before and after the operation ' " + arguments[searchMultDiv] + " ' at line " + (curLine + 1) + ".");
				return -1;
			}
			if (arguments[searchMultDiv] == "*") {
				firstNum *= secondNum;
			} else {
				firstNum /= secondNum;
			}
			//removing the second num
			arguments.splice(searchMultDiv + 1,1);
			//removing the * num
			arguments.splice(searchMultDiv,1);
			//removing the first num and inserting the new value.
			arguments.splice(searchMultDiv - 1,1, firstNum.toString());
			//going back to the next loop to cutOff the mult or div again...
			searchMultDiv = index;
			noMultDiv = false;
		} else {
			//breaking the multDiv loop...
			break;
		}
	}
	//now we need to do all the +, - values...
	let totalVal = 0;
	let op = "+";
	searchMultDiv = index;
	//now adding all the values together (adding the addition and minus)..
	while(arguments[searchMultDiv] != stopString){
		//is it an operation!?
		if (arguments[searchMultDiv] == "+" || arguments[searchMultDiv] == "-") {
			op = arguments[searchMultDiv];
		} else {
			//it was a number...
			if (op == "+") {
				totalVal += parseInt(arguments[searchMultDiv]);
			} else {
				//it was a MINUS!!! OMG.
				totalVal -= parseInt(arguments[searchMultDiv]);
			}
			if (isNaN(totalVal)) {
				alert("expected numbers before and after the operation '" + op + "' at line " + (curLine + 1) + ".");
				return -1;
			}
		}
		searchMultDiv++;
	}
	return totalVal;
}



function forLoopRead(i) {
	//we are at the (
	i++;
	i = skipSpaces(i);
	//if we stopped at ' ' it maybe that the user is trying to make a declaration actually....
	var j = skipTill(i, '=');
	theVarWasDeclared = false;
	if (listOfTypes[solutionString[curLine].substring(i, j)] == "declare") {
		stringArg += solutionString[curLine].substring(i, j) + ",";
		theVarWasDeclared = true;
	} else {
		//it was settingVal to begin with so we call the func with the past i and with theVarWasDeclared as FALSE.
		j = i;
	}
	i = skipSpaces(j);
	j = settingValueToVar(i, theVarWasDeclared);
	if (j === -1) {
		//failed...
		return -1;
	}
	//we are at the first ';'.
	j++;
	j = skipSpaces(j);
	stringArg += "firstScopeDone,";
	if ((j = readConditions(j)) === -1) {
		return -1;
	}
	stringArg += "secondScopeDone,";
	j++;
	//reaching the name of the variable.......
	j = skipSpaces(j);
	i = j;
	//+=, -=, ++ or --
	j = addValueToVar(j, ')');
	stringArg += "thirdScopeDone,";
	// we were at ')', we checked it inside the past function so we move on...
	j++;
	if((j = skipTill(j, '{', 1)) === -1) {
		return -1;
	}
	curlyBraceOpened++;
	j++;
	//checking if he put anything after the '{'
	while (j < solutionString[curLine].length) {
		if (solutionString[curLine].charAt(j) !== ' ') {
			alert("please don't put anything after the '{' at line " + (curLine + 1) + ".");
			return -1;
		}
		j++;
	}
	return j;
}

function settingValueToVar(j, newlyDeclaredVar) {
	//this func goes like this >> var = value;
	var i = j;
	for (; solutionString[curLine].charAt(j) !== ' ' && solutionString[curLine].charAt(j) !== '='; ++j) {
		if (j >= solutionString[curLine].length) {
			alert("missing '=' at line " + (curLine + 1) + ".");
			return -1;
		}
	}
	//checking if the var was declared before.
	if (solutionString[curLine].substring(i, j) in varsDic && newlyDeclaredVar) {
		alert("the variable '" + solutionString[curLine].substring(i, j) + "' at line " + (curLine + 1) + " was declared before");
		return -1;
	}
	varsDic[solutionString[curLine].substring(i, j)] = "";
	stringArg += solutionString[curLine].substring(i, j) + ",";
	j = skipSpaces(j);
	//skipping over the '='
	j++;
	j = skipSpaces(j);
	i = j;
	j = skipTill(j, ';');
	//adding the value...
	stringArg += solutionString[curLine].substring(i, j) + ",";
	j = skipSpaces(j);
	//we are at the ';' now :)
	return j;
}

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

function readConditions(j) {
	var i = j;
	j = skipTillBooleanOperator(j);
	stringArg += solutionString[curLine].substring(i, j) + ",";
	j = skipSpaces(j);
	i = j;
	j = readBooleanOperator(j);
	j = skipSpaces(j);
	i = j;
	j = skipTill(j, ';');
	//adding the variable or the number or whatever it is...
	stringArg += solutionString[curLine].substring(i, j) + ",";
	j = skipSpaces(j);
	if (solutionString[curLine].charAt(j) !== ';') {
		alert("missing ';' in the for loop at line " + (curLine + 1) + ".");
		return -1;
	}
	return j;
}

function addValueToVar(j, stopChar) {
	var i = j;
	//reading till we meet '+' or  '-' they will be +
	j = readTilPlusMinusEqual(j);
	if (!(solutionString[curLine].substring(i, j) in varsDic)) {
		alert("the variable '" + solutionString[curLine].substring(i, j) + "' wasn't declared before.");
		return -1;
	}
	stringArg += solutionString[curLine].substring(i, j) + ",";
	var k = j;
	j = skipSpaces(j);
	if (solutionString[curLine].substring(j, j + 2) == "+=" || solutionString[curLine].substring(j, j + 2) == "-=") {
		stringArg += solutionString[curLine].substring(i, k) + "," + solutionString[curLine].charAt(j) + ",";
		j = j + 2;
		j = skipSpaces(j);
		i = j;
		//reading all the vals from +, - , *, / whatevah...
		if((j = readAllPlusMinusMultAdd(j, stopChar)) == -1 ) {
			return -1;
		}
		
	} else if (solutionString[curLine].substring(j, j + 2) == "++" || solutionString[curLine].substring(j, j + 2) == "--") {
		stringArg += solutionString[curLine].substring(i, k) + "," + solutionString[curLine].charAt(j + 1) + ",1,";
		j = j + 2;
		j = skipSpaces(j);
		//we are at ')'
	} else if (solutionString[curLine].charAt(j) === '=') {
		//copy the above...
		j++;
		j = skipSpaces(j);
		i = j;
		//reading all the vals from +, - , *, / whatevah...
		j = readAllPlusMinusMultAdd(j, stopChar);
	} else {
		alert("expected the operators '++, --, -=, +=' at line " + (curLine + 1) + ".");
		return -1;
	}
	if (solutionString[curLine].charAt(j) !== ')') {
		alert("missing ')' at line " + (curLine + 1) + ".");
		return -1;
	}
	return j;
}
/**
	this functions reads and determines the type of the operator...+=, ++, --
*/
function  readTilPlusMinusEqual(j) {
	for (; solutionString[curLine].charAt(j) !== ' '; ++j) {
		 if (solutionString[curLine].charAt(j) === '=') {
			break;
		} else if (solutionString[curLine].charAt(j) === '+'){
			break;
		} else if (solutionString[curLine].charAt(j) === '-') {
			break;
		} else if (solutionString[curLine].charAt(j) === '*') {
			break;
		} else if (solutionString[curLine].charAt(j) === '/') {
			break;
		}
		if (j >= solutionString[curLine].length) {
			alert("missing an operation on the 3rd scope of the for-loop at line " + (curLine + 1 )  + "." );
			return -1;
		}
	}
	return j;
}


function readAllPlusMinusMultAdd(j, stopChar) {
	var k, i = j;
	//we are at 'var x = -->| a + b+ c +41213;' we are at the place of -->|
	for (;; ++j) {
		k = j;
		if (solutionString[curLine].charAt(j) === ' ') {
			j = skipSpaces(j);
		}
		//if we skipped spaces n found a variable then we recurvsivele call it again.
		if (solutionString[curLine].charAt(j) === '+' 
		  ||solutionString[curLine].charAt(j) === '-'
		  ||solutionString[curLine].charAt(j) === '*'
		  ||solutionString[curLine].charAt(j) === '/'){
			if (isNaN(solutionString[curLine].substring(i,k)) && !(solutionString[curLine].substring(i,k) in varsDic)) {
					alert("'" + solutionString[curLine].substring(i,k) + "' at line " + (curLine + 1) + " is neither a value nor a declared variable");
					return -1;
			}			
			//adding : 'varName,operation,'
			stringArg += solutionString[curLine].substring(i,k) + "," + solutionString[curLine].charAt(j) + ",";
			j++;
			break;
		} else if (solutionString[curLine].charAt(j) === stopChar) {
			stringArg += solutionString[curLine].substring(i,k) + ",end,";
			return j;
		} else if (k != j) {
			//means we skipped spaces but found something that is not operator! so call func again (to give the 'i' right val.
			break;
		}
		if (j >= solutionString[curLine].length) {
			alert("missing an operation on the 3rd scope of the for-loop at line " + (curLine + 1 )  + "." );
			return -1;
		}
	}
	return readAllPlusMinusMultAdd(j, stopChar);
}

/**
	this functions reads and determines the type of the boolean operator...
*/
function readBooleanOperator(j) {
	if (solutionString[curLine].substring(j, j + 2) == ">=") {
		stringArg +=  ">=,";
		return j + 2;
	} else if (solutionString[curLine].substring(j, j + 2) == "<=") {
		stringArg +=  "<=,";
		return j + 2;
	} else if (solutionString[curLine].substring(j, j + 2) == "==") {
		stringArg +=  "==,";
		return j + 2;
	} else if (solutionString[curLine].charAt(j) == '>'){
		stringArg +=  ">,";
		return j + 1;	
	} else if (solutionString[curLine].charAt(j) == '<'){
		stringArg +=  "<,";
		return j + 1;
	} else if (solutionString[curLine].charAt(j) == '='){
		alert("please put only boolean operators (==, >=, <=, >, <) in second-scope of the for-loop");
		return -1;
	}
	alert("missing boolean operators (==, >=, <=, >, <) in second-scope of the for-loop");
	return -1;
}
function skipTillBooleanOperator(j) {
	for (; solutionString[curLine].charAt(j) !== ' '; ++j) {
		if (solutionString[curLine].charAt(j) === '>'
		 && solutionString[curLine].charAt(j) === '<'
	 	 && solutionString[curLine].charAt(j) === '=') {
			break;	
		}
		if (j >= solutionString[curLine].length) {
			alert("missing boolean operator (<=, >=, ==, !=, >, <) at line " + (curLine + 1) + ".");
			return -1;
		}
	}
	return j;
}

function popElmFrom(objectName) {
	let c;
	let fullElmPopped = "";
	do {
		c = varsDic[objectName].charAt(varsDic[objectName].length - 1);
		if (c != '-'){
			fullElmPopped += c;
		}
		//removing the last char until we reach a '-' or ""
		varsDic[objectName] = varsDic[objectName].substring(0, varsDic[objectName].length - 1);			
	} while (c != '-' && varsDic[objectName].length != 0);
	return fullElmPopped;
}

function isEnemyAhead() {
	for (let i = 0; i < enemies.length; ++i) {
		var hi = enemies[i]['left'];
		//the enemy size is 50 so in middle is 25...
		if (hero.left == enemies[i]['left']) {
			return true;
		}
	}
	return false;
}

function dequeueElmFrom(objectName) {
	let c;
	let fullElmPopped = "";
	do {
		c = varsDic[objectName].charAt(0);
		if (c != '-'){
			fullElmPopped += c;
		}
		//removing the last char until we reach a '-' or ""
		varsDic[objectName] = varsDic[objectName].substring(1, varsDic[objectName].length);			
	} while (c != '-' && varsDic[objectName].length != 0);
	return fullElmPopped;
}

function moveNextLevel() {
	level++;
	$("#doneButton").fadeOut();
	/*
	$("textarea").fadeOut(1000, function() {
		initLevels();
		$("#doneButton").css("pointerEvents","auto");

	});*/
	$("#solution").animate({
		height: '0px',
	},800,function(){
		$("#solution").animate({
			width: '0px',
			left: "+=13%"
		},1200,function(){
			initLevels();
			$("#doneButton").css("pointerEvents","auto");
		});
	});
	$("#operations").animate({
		height: '0px',
	},800,function(){
		$("#operations").animate({
			width: '0px',
			left: "+=13%"
		},1200);
	});
}

var level = 1;
var beginLevel = 1;
function initLevels() {
	let solution = document.getElementById("solution");
	solution.value = "void main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n}";
	if (level == 1) {
		skipFirstLines = 1;
		let operations = document.getElementById("operations");
		operations.value = "\n                          EXPLANATION\nWelcome to Space Invaders Coding Game!, On this first level it seems that the space background is existant, but the Invaders and the hero's Spaceship are not!. So your very first task is to create 12 Invaders in TWO-LINES and create one hero SpaceShip!.\n\n                  FUNCTIONS AVAILABLE\n-Create the invaders and hero's spaceShip by the functions: createInv(x,y), createHero(x,y)\n-The only loop available is the FOR-loop\n\n                                  NOTES\n-The first invader starts at 400-x axis value and the distance between each invader is 100.\n-the invaders in first line lie at the value of 100 y-axis and the second line lie at value of 175.\n-The hero x and y are (534,648).";
		let solution = document.getElementById("solution");
		solution.value = "int main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    return 0;\n}";
	} else if (level == 2) {
		skipFirstLines = 5;
		let operations = document.getElementById("operations");
		operations.value = "\n			EXPLANATION\nNow that we have the Invaders and our Hero, we need now to create 2 functions!, those functions are called MoveHero and isAlienAhead functions\n\nmoveHero function accept one parameter 'step' and moves that hero by that step value\nisAlienAhead function returns boolean and accepts array of invaders and the hero, it tells if the hero and at least one alien is at same x-axis value!\n				TASK\n-Build the MoveHero, isAlienAhead functions!\n 				NOTE\nThe hero and the invaders each has x and y parameters, example of use:\n			  invader[0].x = 400;\n  			      hero.x = 534;\nTo get size of invaders use 'invaders.length;'";
		let solution = document.getElementById("solution");
		solution.value = "void moveHero(int step) {\n    \n    \n}\n\nbool isAlienAhead(invaders[] , hero) {\n    int size = invaders.length;\n    int i;  // <-- loop variable!\n    \n    \n    \n    \n}";
	} else if (level == 3){
		setEnemiesAndHero();
		skipFirstLines = 1;//On this level you can't use the function 'playRhythm', but, you can use another function called 'play(color)' in which the function plays one-color at a time.
		let operations = document.getElementById("operations");
		operations.value = "\n\t\t\tEXPLANATION\nthats Great!, we now have the Invaders, the hero and the functions: moveHero(step), bool isAlienAhead(). I guess it is about time we kill those invaders!, in order to do that, TWO new functions have been unlocked!, heroShoot() which makes the hero Shoot ONE-time, and the boolean areThereEnemies() function which tells if there are still enemies alive!. \n\n				TASKS\n-This time only WHILE loop is allowed!, use it and put ONE of the 4-given functions as condition for the while.\n-Move our hero step by step inside the loop...\n-Use another one of the 4-functions to determine if enemy is ahead of you!\n-Use the shoot function to kill that evil spirit!!\n-THERE are TWO invaders in each COLUMN!\n			GOOD LUCK Hero!";
		let solution = document.getElementById("solution");
		solution.value = "int main() {\n    \n    \n    \n    \n    \n    \n   \n    \n    \n    \n    \n    return 0;\n}";
	} else {
		alert("CONGRATULATIONS!!!, you Completed all the Levels for this game! :)");
		setEnemiesAndHero();
		skipFirstLines = 1;//On this level you can't use the function 'playRhythm', but, you can use another function called 'play(color)' in which the function plays one-color at a time.
		let operations = document.getElementById("operations");
		operations.value = "\n\t\t\tEXPLANATION\nthats Great!, we now have the Invaders, the hero and the functions: moveHero(step), bool isAlienAhead(). I guess it is about time we kill those invaders!, in order to do that, TWO new functions have been unlocked!, heroShoot() which makes the hero Shoot ONE-time, and the boolean areThereEnemies() function which tells if there are still enemies alive!. \n\n				TASKS\n-This time only WHILE loop is allowed!, use it and put ONE of the 4-given functions as condition for the while.\n-Move our hero step by step inside the loop...\n-Use another one of the 4-functions to determine if enemy is ahead of you!\n-Use the shoot function to kill that evil spirit!!\n-THERE are TWO invaders in each COLUMN!\n			GOOD LUCK Hero!";
		let solution = document.getElementById("solution");
		solution.value = "int main() {\n    \n    \n    \n    \n    \n    \n   \n    \n    \n    \n    \n    return 0;\n}";
	}
	
	$("#operations").animate({
		width: '340px',
		left: "-=13%"
	},800,function(){
		$("#operations").animate({
			height: '68vh',
		},1200,function(){
			$("#doneButton").fadeIn();
		});
	});
	$("#solution").animate({
		width: '340px',
		left: "-=13%"
	},800,function(){
		$("#solution").animate({
			height: '68vh',
		},1200);
	});
	
}
initLevels();

//gotta make the work on the for loop functioning adn after that i gotta declare a function that is called the createAlient,
//in which that function accepts two parameters x and y and i gotta point out the 
