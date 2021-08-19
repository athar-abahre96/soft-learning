
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let noise = true;
let on = true;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const startButton = document.querySelector("#start");

startButton.addEventListener('click', (event) => {
    if (on || win) {
        play();
    }
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;
    if (flash === turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
		moveNextLevel();
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
			if (order[flash] === 1) one();
			if (order[flash] === 2) two();
			if (order[flash] === 3) three();
			if (order[flash] === 4) four();
			if (order[flash] != playerOrder[flash]) {
				alert("you missed up at the "+ (flash +1) + "th color!, try Again.");
			    clearInterval(intervalId);
				compTurn = false;
				clearColor();
				on = true;
			}
            flash++;
        }, 200);
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById("clip1")
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen"
}

function two() {
    if (noise) {
        let audio = document.getElementById("clip2")
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato"
}

function three() {
    if (noise) {
        let audio = document.getElementById("clip3")
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow"
}

function four() {
    if (noise) {
        let audio = document.getElementById("clip4")
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue"

}

function clearColor() {
    topLeft.style.backgroundColor = "darkgreen"
    topRight.style.backgroundColor = "darkred"
    bottomLeft.style.backgroundColor = "goldenrod"
    bottomRight.style.backgroundColor = "darkblue"

}

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen"
    topRight.style.backgroundColor = "tomato"
    bottomLeft.style.backgroundColor = "yellow"
    bottomRight.style.backgroundColor = "lightskyblue"

}

topLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

topRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

function check() {
    if (playerOrder[playerOrder.length -1] !== order[playerOrder.length -1]) {
        good = false;
    }

    if (playerOrder.length == 10 && good) {
        winGame();
    }

    if(good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!"
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();
            play();
            
           
        }, 800)

        noise = false;
    }

    if(turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800)
    }
       
}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}








var skipFirstLines = 1;
var skipLastLines = 1;
var solutionString = "";
var curLine = 0;

var varsDic = {};
let nameOfVars = [];
let varsDicIndex = 0;

var workingTable = [];
let listOfTypes = { "string":"declare", "int":"declare", "String":"declare",
					"playRhythm":"func", "peek":"func", "if":"func", "else":"func", "else if":"func", "switch":"func", "play":"func",
					"break":"word", "continue":"word",
					"case":"case", "default":"case",
					"Stack":"object", "Queue":"object",
					"while":"loop", "for":"loop"
				};
let oneWordFuncs = {"playRhythm":"func", "play":"func"};
let objectFunctions = {"isNotEmpty": "boolean", "push":"Stack", "pop":"Stack",
					   "enqueue":"Queue", "dequeue":"queue"};
let boolChecking = ["==",">=","<=","!=",">","<"];
let enumValues = {"moveColor":"justToCheckIfHePutEnumName","GREEN":1, "RED":2, "YELLOW":3, "BLUE":4};
let emptyVal = "!@#";
let isThereIf = false;
let curlyBraceOpened = false;
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
	curlyBraceOpened = false;
	let res = readSolAndApply();
	if (res !== -1) {
		$("#doneButton").css("pointerEvents","none");
		playTheCode();
	}
}

function readSolAndApply() {
	if (solutionString.length - skipLastLines > curLine) {
		var stringArg = "";
		do {
			var i, k, j;
			//cleaning all the spaces before the arg.
			for(i = 0; solutionString[curLine].charAt(i) === ' '; ++i) {}
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
				curlyBraceOpened = false;
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
				//j++;
				//skipping spaces after nameOfVariable.
				/*
				for (;solutionString[curLine].charAt(j) === ' '; ++j) {
					if (solutionString[curLine].length <= j) {
						alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
						return;
					}
				}
				*/
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
								while (solutionString[curLine].charAt(j) !== '(' 
										&& solutionString[curLine].charAt(j) !== ' '){
									j++;
									if (j >= solutionString[curLine].length) {
										alert("no such value variable/function at line " + (curLine + 1) + ".");
										return -1;
									}
								}
								if (solutionString[curLine].substring(i,j) in listOfTypes) {
									stringArg += solutionString[curLine].substring(i,j);
									varsDic[nameOfVars[varsDicIndex]] = solutionString[curLine].substring(i, j);
									j++;
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
				if (solutionString[curLine].substring(0, k) in oneWordFuncs){
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
						curlyBraceOpened = true;
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
				i++;
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
					if (curlyBraceOpened) {
						alert("please close the opened curly braces of the function above line " + (curLine + 1) + ".");
						return -1;
					}
					curlyBraceOpened = true;
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
				//getting into the the ( of the while (
				if (solutionString[curLine].charAt(i) !== '(') {
					alert("missing a opening braces '(' at line " + (curLine + 1) + ".");
					return -1;					
				}
				i++;
				//getting into the first argumet inside the loop...
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
					alert("missing ')' at line " + (curLine + 1) + ".");
					return -1;
				}
				//in order to make the line '}' pass.
				curlyBraceOpened = true;
				j++;
				while (j < solutionString[curLine].length){
					if (solutionString[curLine].charAt(j) !== ' '){
						alert("please don't put anything after the semi-colon '{' at line " + (curLine + 1) + ".");
						return -1;
					}
					j++;
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

let aiChoice = "";
let namesToTypesDic = {};
let arraySizes = {};
function playTheCode() {
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
							} else if (arguments[2] == "pop" || arguments[2] == "denqueue") {
								//pops the last element from the object given as argument.
								popElmFrom(argument[1]);
							}
						} else {
							alert("can't use function '" + arguments[2] +"' on object of type '" + namesToTypesDic[arguments[1]]+"'.");
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
				if (arguments[1] == "playRhythm") {
					if ( level != 1 ) {
						alert("you can not use the function 'playRhythm' on this level");	
						$("#doneButton").css("pointerEvents","auto");
						return -1;
					}
					playRhythm(arguments[2]);
					return 0;
				} else if (arguments[1] == "if") {
					if (arguments[3] != "==") {
						alert('the only avaiable boolean operator on this level is "=="');
						$("#doneButton").css("pointerEvents","auto");
						return -1;
					}
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
			} else if (listOfTypes[arguments[0]] == "loop") {
				var loopIndex = i;
				//skip over the rest lines of the loop
				if(arguments[3] == "isNotEmpty") {
					if (varsDic[arguments[2]] == "") {
						do {
							i++;
							arguments = workingTable[i].split(',');		
						} while(arguments[0] != "endFunc");
					}
					//else do nothing... just continue to next code-line...
				} else {
					//while is empty...
					if (varsDic[arguments[2]] != "") {
						do {
							i++;
							arguments = workingTable[i].split(',');		
						} while(arguments[0] != "endFunc");	
					}
				}
			} else if (arguments[0] == "endFunc") {
				//will enter here only if there was a for or a while before....
				i = loopIndex - 1;
			}
		}
	}
	if (level != 1) {
		playRhythm(playerOrder);
	}
	return 0;
}

let indexOfPlayArray = 0;
function playColor(color) {
	playerOrder[indexOfPlayArray] = color;
	indexOfPlayArray++;
}

function skipSpaces(j){
	for (;solutionString[curLine].charAt(j) === ' '; ++j) {
		if (solutionString[curLine].length <= j) {
			alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
			return -1;
		}
	}
	return j;
}


function playRhythm(array) {
	indexOfPlayArray = 0;
    win = false;
	if(level === 1) {
		order = [enumValues.BLUE, enumValues.BLUE, enumValues.GREEN, enumValues.RED, enumValues.YELLOW];
		turn = 5;	
		//the array-variable is actually the name of the array, and the value lies in the varsDic... 
		let arrVals = (varsDic[array]).split('-');
		if (order.length != arraySizes[array]) {
			alert("the size of the array doesn't match up with the rhythm moves that are made for the current level");
			$("#doneButton").css("pointerEvents","auto");
			return -1;
		}
		//sorting the values of the array.
		let curElm, temp;
		for (let i = 0; i < arrVals.length; ++i) {
			for (let j = 0; j < arrVals.length - 1 - i; ++j) {
				var a = (arrVals[j].split('.'))[0]
				var b = (arrVals[j + 1].split('.'))[0];
				if (a > b) {
					temp = arrVals[j];
					arrVals[j] = arrVals[j + 1];
					arrVals[j + 1] = temp;
				}
			}
		}
		let theValsArr;
		for (let i = 0; i < arrVals.length; ++i) {
			theValsArr = arrVals[i].split('.');
			if (i != theValsArr[0]) {
				alert("missing value for the element number " + i + " of the array");
				$("#doneButton").css("pointerEvents","auto");						
				return -1;
			}
			playerOrder[theValsArr[0]] = theValsArr[1];
		}
	
	} else if (level === 2) {
		order = [enumValues.BLUE, enumValues.RED , enumValues.YELLOW, enumValues.YELLOW, enumValues.GREEN];
		turn = 5;
		//we fill the playerOrder in the play-function...we call the play function when all the text-area code is read.
	} else if (level === 3) {
		order = [enumValues.BLUE, enumValues.RED , enumValues.YELLOW, enumValues.YELLOW, enumValues.GREEN];
		turn = 5;
		//we fill the playerOrder in the play-function...we call the play function when all the text-area code is read.	
	}
	turnCounter.innerHTML = 1;
	flash = 0;
	good = true;
	compTurn = true;
	//calling the function for the first time without the time delay of 800mseconds.
	gameTurn();
	intervalId = setInterval(gameTurn, 800);
}

function checkObject() {
	//.
}
function checkVar() {
	//in varsDic
}
function checkFunc() {
	//
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
	} while (c !== '-' && varsDic[objectName].length != 0);
	return fullElmPopped;
}

function moveNextLevel() {
	level++;
	flashColor();
	setTimeout(clearColor, 1000);
	$("#doneButton").fadeOut();
	$("textarea").fadeOut(1000, function() {
		initLevels();
		$("#doneButton").css("pointerEvents","auto");

	});
}

var level = 1;
var beginLevel = 1;
function initLevels() {
	let solution = document.getElementById("solution");
	solution.value = "void main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n}";
	if (level === 1) {
		skipFirstLines = 5;
		let operations = document.getElementById("operations");
		operations.value = "\nEXPLANATION\nYou are shown 5 rhythm moves, BLUE,BLUE,GREEN,RED and YELLOW, now your GOAL is to make an array of ints and call the function playRhythm(arr) where arr is the array you declared. \n\nTASKS\nin order to pass the level, you must:\n-Declare an ARRAY of ints with size of the number of the rhythm-moves of this level EXACTLY.\n-The array must have the rhythm-moves within and in CORRECT ORDER.\n-Don't forget to use the enum variable shown in code to set your array values. \n\nABOUT ENUM\n here is an Example of how the enum used:\n int yellowColor = moveColor.YELLOW;";
		let solution = document.getElementById("solution");
		solution.value = "enum moveColor {\n   GREEN= 1, RED, YELLOW, BLUE\n}\n//the code above must not be changed\nvoid main() {\n    \n    \n    \n    \n    \n    \n   \n    \n    \n    \n    \n}";
	} else if (level === 2) {
		skipFirstLines = 5;
		let operations = document.getElementById("operations");
		operations.value = "\nEXPLANATION\non this level, you must create a QUEUE-object and put all the required-rhythm moves for this level which are (BLUE, RED, YELLOW, YELLOW AND GREEN).\n\nNOTES\n-The available functions for the QUEUE are: enqueue(element), dequeue() and isNotEmpty()\n\n-Elements in the Queue are TAKEN OUT (dequeued) in First In First Out (FIFO) manner.\n\n-On this level you can't use the function 'playRhythm', but, you can use another function called 'play(color)' in which the function plays one-color at a time.\n-you can only use -WHILE- as loop function";
		let solution = document.getElementById("solution");
		solution.value = "enum moveColor {\n    GREEN= 1, RED, YELLOW, BLUE\n}\n//the code above must not be changed\nvoid main() {\n    \n    \n    \n    \n    \n    \n   \n    \n    \n    \n    \n}";
	} else if (level == 3){
		skipFirstLines = 5;//On this level you can't use the function 'playRhythm', but, you can use another function called 'play(color)' in which the function plays one-color at a time.
		let operations = document.getElementById("operations");
		operations.value = "\nEXPLANATION\nThis is the last Level. Now, instead of creating a Queue object like on the past Level, you must create a STACK object, you must push all the required-rhythm moves for this level which are (BLUE, RED, YELLOW, YELLOW AND GREEN).\n\nNOTES\n-The available functions for the STACK are: push(element), pop() and isNotEmpty()\n\n-ELEMENTS in the stack are popped out in *Last In First Out* (LIFO) manner.\n\n-Like level 2, You can't use 'playRhythm' function, so instead use WHILE-LOOP and set one of the above functions as condition and use the 'play(color)' function.";
		let solution = document.getElementById("solution");
		solution.value = "enum moveColor {\n    GREEN= 1, RED, YELLOW, BLUE\n}\n//the code above must not be changed\nvoid main() {\n    \n    \n    \n    \n    \n    \n   \n    \n    \n    \n    \n}";
	} else {
		alert("CONGRATULATIONS!!!, you Completed all the Levels for this game! :)");
		skipFirstLines = 5;//On this level you can't use the function 'playRhythm', but, you can use another function called 'play(color)' in which the function plays one-color at a time.
		let operations = document.getElementById("operations");
		operations.value = "\nEXPLANATION\nThis is the last Level. Now, instead of creating a Queue object like on the past Level, you must create a STACK object, you must push all the required-rhythm moves for this level which are (BLUE, RED, YELLOW, YELLOW AND GREEN).\n\nNOTES\n-The available functions for the STACK are: push(element), pop() and isNotEmpty()\n\n-ELEMENTS in the stack are popped out in *Last In First Out* (LIFO) manner.\n\n-Like level 2, You can't use 'playRhythm' function, so instead use WHILE-LOOP and set one of the above functions as condition and use the 'play(color)' function.";
		let solution = document.getElementById("solution");
		solution.value = "enum moveColor {\n    GREEN= 1, RED, YELLOW, BLUE\n}\n//the code above must not be changed\nvoid main() {\n    \n    \n    \n    \n    \n    \n   \n    \n    \n    \n    \n}";
	}
	if (level == beginLevel) {
		$("textarea").hide();
	}
	$("textarea").slideDown(2000, function(){ $("#doneButton").fadeIn();});
}
initLevels();