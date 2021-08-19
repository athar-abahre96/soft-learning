//getElemntby class name is returning all the items that has a word ,option, in it
//meaning that if you go look at the index.html there are 3 divs that has the word
// 'option' in it which are 'option rock', 'option paper', 'option scissors'.
let options = document.getElementsByClassName("option");
let choices = ['"rock"', '"paper"', '"scissors"'];
let winState = { '"rock"': '"scissors"', '"paper"': '"rock"', '"scissors"': '"paper"' };
let battle_elem = document.getElementById("battle");
let reset_elem = document.getElementById("reset");
let reseted = 1;

//alert (options.length);
let score = 0;
let aiScore = 0;
let storage = window.localStorage;
/*
if (storage.getItem("score")) {
	score = storage.getItem("score");
}

if (storage.getItem("aiScore")) {
    score = storage.getItem("aiScore");
}
*/
let score_elem = document.getElementById("score");
let aiScore_elem = document.getElementById("aiScore");
score_elem.innerHTML = score;
aiScore_elem.innerHTML = aiScore;
/*
for (let i = 0; i < options.length; i++) {
	//alert(options[i].dataset.choice);
    let option = options[i];
    option.addEventListener("click", function () {
        this.classList.add("selected");
        disableOptions();
        battle(this);
    })
}
*/
var oldScore;
var aiChoice;
function battle(option) {
	$(".game").animate({maxWidth:'650px'},2000);
	$(".selected").animate({width:'140px',
						  height:'140px'
						  },2000);
	//option.dataset => if you go to the HTML, u find data-choice
	//data- ==>dataset and after the "-" comes the property (choice).
    let choice = option.dataset.choice;
	oldScore = score;
	let winStateWin = winState[choice];
	if (choice === aiChoice) {
        option.classList.add("draw");
		winningStreak = 0;
    } else if (aiChoice === winState[choice]) {
		//adding class "winner" to the div option in order to apply the winner css decoration on the div.
        option.classList.add("winner");
        score++;
		winningStreak++;
        score_elem.innerHTML = score;
    } else {
        option.classList.add("loser");
        aiScore++;
        aiScore_elem.innerHTML = aiScore
		winningStreak = 0;
    }
	//displaying the choice of ai actually.
    displayChoices(choice, aiChoice);
}



function displayChoices(player, ai) {
	//creating a div element.
    let choice_elem = document.createElement("div");
	//adding a class named aiChoice, with value of ai.
    choice_elem.classList.add("aiChoice",ai.substring(1, ai.length - 1)); // i added the 1 and the -1
											//because the ai has the value with the '"' so iremoved them.
    battle_elem.appendChild(choice_elem);
	$(".aiChoice").hide();
	$(".aiChoice").slideDown(2000, function() {
		if (oldScore !== score){
			if(level == 1) {
				//alert("Nice, you beat your rival, Moving to next Level!");
				//level++;
				//initLevels();
				level++;
				$(".game").children().slideUp(1000, function() {
					initLevels();
					reset();
					$(".game").children().slideDown(1000, function(){
						//$("#reset").hide();
					});
					winningStreak = 0;
					//reseted = 0;
				});
				
			}
		}
		$("#doneButton").css("pointerEvents","auto");				
		//removing the hide class from the button (to show the button).
    	reset_elem.classList.remove("hide");
		if(winningStreak >= 3) {
			level++;
			$(".game").children().slideUp(1000, function() {
				initLevels();
				reset();
				$(".game").children().slideDown(1000, function(){
					$("#reset").hide();
				});
				winningStreak = 0;
				//reseted = 0;
			});
		}
	});
}

function rand(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disableOptions() {
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        if (!option.classList.contains("selected")) {
            option.classList.add("disabled");
        }
    }
}

reset_elem.addEventListener("click", function() {
	//disabling the click on the done button.
	$("#doneButton").css({"pointerEvents":"none"});
	reset();
	//enabling the click on the done button after 1 sec.
	$(".delay").toggle(1000, function() {$("#doneButton").css("pointerEvents","auto");});
});

function reset() {
	$(".game").animate({maxWidth:'500px'},1000);
		$(".selected").animate({width:'125px',
						  height:'125px'
						  },1000);
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
    	option.classList.remove("selected");
        option.classList.remove("disabled");
        option.classList.remove("winner");
        option.classList.remove("loser");
        option.classList.remove("draw");
	}
	$(".aiChoice").slideUp(1000,function(){battle_elem.innerHTML = "<h3>AI CHOICE</h3>"});
	reset_elem.classList.add("hide");
	reseted = 1;
	
}

var level = 1;
function initLevels() {
	let solution = document.getElementById("solution");
	solution.value = "void main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n}";
	if (level == 1) {
		let operations = document.getElementById("operations");
		operations.value = "\n\nEXPLANATION\nThis game is a Rock, paper , Scissors game, but instead of clicking on the icon, here you must write code to run your choice!\n\nHOW TO RUN CODE\ndeclare a string typed variables and put the value of the choices (e.g. \"rock\", \"paper\" or \"scissors\" and then you call the function play, putting your choice as argument in it!\n\nGOAL\njust beat your opponent once on this level :)";
		let solution = document.getElementById("solution");
		solution.value = "void main() {\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n}";
	} else if (level == 2) {
		let operations = document.getElementById("operations");
		operations.value = "\nEXPLANATION\nYour opponent seems to have already decided his move!, he is hiding his hand behind his back. It turns out that there is a mirror behind your opponent and it is showing up HIS MOVE!\n\nGOAL\n use the mirror by calling the function peek() to know what is the choice of your opponent and beat him by using : if, else if , else statements!. \n\nNEXT LEVEL\n Beat your rival 5 times in a row by using the peek function with if-statements in order to clear this level!";
	} else {
		window.location = "../RockPaperScissorsLizardSpock/index.html";
		let operations = document.getElementById("operations");
		operations.value = "\nEXPLANATION\nYour opponent seems to have already decided his move!, he is hiding his hand behind his back. It turns out that there is a mirror behind your opponent and it is showing up HIS MOVE!\n\nGOAL\n use the mirror by calling the function peek() to know what is the choice of your opponent and beat him by using : if, else if , else statements!. \n\nNEXT LEVEL\n Beat your rival 5 times in a row by using the peek function with if-statements in order to clear this level!";
	//let operations = document.getElementById("operations");
	//	operations.value = "\n\n\ntry to beat your rival, best of 3, instead of clicking on the buttons, you must write code to pick your choice...you have a variable and play function. use them wisely.";	
	}
	$("textarea").slideDown(2000, function(){ $("#doneButton").fadeIn();});
}
initLevels();


var skipFirstLines = 1;
var skipLastLines = 1;
var solutionString = "";
var curLine = 0;

var varsDic = {};
let nameOfVars = [];
let varsDicIndex = 0;

var workingTable = [];
let listOfTypes = {"string":"declare", "int":"declare", "String":"declare",
					"play":"func", "peek":"func", "if":"func", "else":"func", "else if":"func", "switch":"func",
					"break":"word", "continue":"word",
					"case":"case", "default":"case"};
let oneWordFuncs = {"play":"func"};
let boolChecking = ["==",">=","<=","!=",">","<"];				
let emptyVal = "!@#";
let isThereIf = false;
let curlyBraceOpened = false;
let funcCurlyBracesLine = 0;
var winningStreak = 0;
function Switch() {
	solutionString = document.getElementById("solution").value.split('\n');
	curLine = skipFirstLines;
	varsDic = {};
	nameOfVars = [];
	varsDicIndex = 0;
	workingTable = [];
	aiChoice = choices[rand(2, 0)];
	curlyBraceOpened = false;
	readSolAndApply();
	if (!reseted) {
		$("#doneButton").css("pointerEvents","none");
		reset();
		$(".delay").toggle(1000, function() { 
			$("#doneButton").css("pointerEvents","auto");
			playTheCode();
			reseted = 0;
		});
	} else {
		playTheCode();
		reseted = 0;
	}
}

function readSolAndApply() {
	if (solutionString.length - skipLastLines > curLine) {
		var stringArg = "";
		do {
			var i, k;
			//cleaning all the spaces before the arg.
			for(i = 0; solutionString[curLine].charAt(i) === ' '; ++i) {}
			solutionString[curLine] = solutionString[curLine].replace(solutionString[curLine].substring(0, i), "");
			//checking if the line is empty or a NOTE line. if yes, moving to next line.
			if(solutionString[curLine] == "" || solutionString[curLine].substring(0, 2) == "//"){
				curLine++;
				readSolAndApply();
				return 0;
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
					readSolAndApply();
					return 0;
				}
				/*
				while (i < solutionString[curLine].length){
					if (solutionString[curLine].charAt(i) !== ' ' && solutionString[curLine].charAt(i) !== '\n'){
						alert("please don't put anything after the '}' at line " + (curLine + 1) + ".");
						return -1;
					}
					i++;
				}
				curLine++;
				workingTable[workingTable.length] = "}";
				readSolAndApply();
				return 0;
				*/
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
				if (i >= solutionString[curLine].length) {
					alert("missing semi-colon ';' at line " + (curLine + 1) +".");
					return -1;
				}
			}
			//this k is for saving the index of the last-letter of the first word in the line...
			k = i;
			//added the type to the string,
			if(solutionString[curLine].substring(0, i) in listOfTypes){
				stringArg += listOfTypes[solutionString[curLine].substring(0, i)] + ",";
			} else {
				//it means we are in setVal!, cause the only thing that isn't in listOfTypes is the variables themselves.
				let j = i;
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
				} else {
					alert("no such arg at line: " + (curLine + 1) + ".");
					return -1;
				}
				//we are at the '=' so we do i++ to pass it and then we skip the spaces<<<<<<<<<<<<<<<<<<<<<<important.
				i++;
				//skipping spaces.
				for(; solutionString[curLine].charAt(i) === ' '; ++i) {}
				j = i;
				//rushing till end of name of the variable that was after the '='.
				while (solutionString[curLine].charAt(j) !== ' ' 
						&& solutionString[curLine].charAt(j) !== ';' 
						&& solutionString[curLine].charAt(j) !== '"'
						&& solutionString[curLine].charAt(j) !== '('){ ++j; }
				
				//we reached the end, is it whitespace or is it ';'
				//we got the name of the first var.
				//checking if he put a val of other variable!
				if (solutionString[curLine].substring(i, j) in varsDic){
					//setting the VALUE of the variable in the dictionary.
					//stringArg += varsDic[solutionString[curLine].substring(i, j)];
					stringArg += solutionString[curLine].substring(i, j);
					varsDic[variableName] = varsDic[solutionString[curLine].substring(i, j)];
				}else if(solutionString[curLine].substring(i, j) in listOfTypes){
					
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
					readSolAndApply();
					return 0;
					//to avoid danger of the value 'j' i put the above lines instead of making the code go down then doooown to it.
					
				//it means that it is a abstract string like "rock", "whatevahaaa" or a valueFunc;
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
							return;
						}
					}
					stringArg += solutionString[curLine].substring(i - 1, j + 1);
					//setting right value in dictionary also...
					varsDic[variableName] = solutionString[curLine].substring(i, j);
					j++;
				}
				//j++;
				//skipping spaces after nameOfVariable.
				for (;solutionString[curLine].charAt(j) === ' '; ++j) {
					if (solutionString[curLine].length <= j) {
						alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
						return;
					}
				}
				i = j;
				//checking if we reached a semi-colon.
				if (solutionString[curLine].charAt(j) !== ';') {
					alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
					return;			
				}
				j++;
				for (;j < solutionString[curLine].length; ++j) {
					if (solutionString[curLine].charAt(j) !== ' '){
						alert("please don't put anything after semi-colon ';' at line ", + (curLine + 1) + ".");
						return;			
					}
				}
			}
			if (listOfTypes[solutionString[curLine].substring(0, k)] == "declare") {
				while(1) {
					//skipping spaces.
					for(; solutionString[curLine].charAt(i) === ' '; ++i) {}
					let j = i;
					//rushing till end of name of the variable.
					while (solutionString[curLine].charAt(j) !== ' ' 
						&& solutionString[curLine].charAt(j) !== ','
						&& solutionString[curLine].charAt(j) !== ';'){
							++j;
							if (j >= solutionString[curLine].length){
								alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
								return;
							}
					}
					//we reached the end, is it whitespace or is it ';'
					//we got the name of the first var.
					stringArg += solutionString[curLine].substring(i, j) + ",";
					nameOfVars[varsDicIndex] = solutionString[curLine].substring(i, j);
					if (nameOfVars[varsDicIndex] in varsDic) {
						alert ("variable '" + nameOfVars[varsDicIndex] +"' at line " + (curLine + 1) +" was declared before");
						return -1;
					}
					//skipping spaces after nameOfVariable.
					for (;solutionString[curLine].charAt(j) === ' '; ++j) {
						if (solutionString[curLine].length <= j) {
							alert(" a semicolon ';' is expected at end of line ", + (curLine + 1) + ".");
							return;
						}
					}
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
										return;
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
									return;
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
				let j = i;
				i = skipSpaces(i);
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
						&& solutionString[curLine].charAt(j) !== '='){ ++j; }
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
				j = skipSpaces(j);
				i = j;
				if (solutionString[curLine].charAt(j) !== ')') {
					alert("missing ')' at line " + (curLine + 1) + ".");
					return -1;
				}
				j++;
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
				let j = i;
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
			}
		}while(0);
		curLine++;
		varsDicIndex++;
		workingTable[workingTable.length] = stringArg;
		readSolAndApply();
		return 0;
	} else {
		if(curlyBraceOpened) {
			alert("missing a closing curly braces '}' for the function opened at line " + funcCurlyBracesLine + ".");
			return -1;
		}
	}
}



function playTheCode() {
	//varsDicIndex = 0;
	varsDic = {};
	/*for the if- functions.
	 - enteredFunc =2 => no if-statement(normal code). 
	 - enteredFunc =1 => entered the if, correct statement until "endFunc". 
	 - enteredFunc =0 => false-statement.*/
	var enteredFunc = 2;
	for (let i = 0; i < workingTable.length; ++i){
		workingTable[i] = workingTable[i].replace('peek', aiChoice);
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
			if(arguments[0] == "declare"){
				for (let j = 1; j < arguments.length - 1; j += 2) {
					varsDic[arguments[j]] = arguments[j + 1];
				}
			} else if (arguments[0] == "setVal"){
				if(arguments[2] == "peek") {
					//this line won't be reached becuase of the replace func at beginning of the for above.
					varsDic[arguments[1]] = aiChoice;
				}else {
					if ( arguments[2] in varsDic) {
						varsDic[arguments[1]] = varsDic[arguments[2]];	
					} else {
						varsDic[arguments[1]] = arguments[2];
					}
				}
			} else if (arguments[0] == "func"){
				if (arguments[1] == "play") {
					let j = 0;
					let theChoice;
					if (arguments[2] == "peek") {
						arguments[2] = aiChoice;
					} else if (arguments[2] in varsDic){
						arguments[2] = varsDic[arguments[2]];	
					}
					for (j = 0; j < options.length; j++) {
						theChoice = options[j].dataset.choice;
						playerChoice = arguments[2];
						if (playerChoice == theChoice){
							break;
						}
					}
					if ( j == options.length){
						alert("the choice is Not available!");
						return -1;
					}
					options[j].classList.add("selected");
					$("#doneButton").css("pointerEvents","none");
					disableOptions();
					battle(options[j]);
				} else if (arguments[1] == "if") {
					if (arguments[3] != "==") {
						alert('the only avaiable boolean operator on this level is "=="');
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
					
				}else if (arguments[1] == "switch"){
					if (!(arguments[2] in varsDic)){
						alert("please put an existant variable as argument for the switch-function.");
						return -1;
					}
					let switchVariableVal = varsDic[arguments[2]];
					//gotta skip all the else-if n else statements.
					let j = i;
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
										return -1;
									}
									i = j;
								} while (arguments[1] != "default");
								//breaking the do-while and going to the next-iteration in the big-for loop.
								break;
							}
						} else {
							alert("missing a closing curly brackets '}'.");
							return -1;
						}
					} while(1);
				}
			} else if (arguments[0] == "word") {
				if (arguments[1] == "break") {
					do{
						i++;
						arguments = workingTable[i].split(',');
						if (i >= workingTable.length) {
							alert("missing a closing curly brackets '}'.");
							return -1;
						}
					} while (arguments[0] != "endFunc");				
				}
			}
		}
	}
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