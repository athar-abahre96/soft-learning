const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
context.scale(20,20);
function arenaSweep(){
    let rowCount = 1;
    let numRowsSweep = 0;
    var oldScore = player.score;
    outer: for(let y = arena.length - 1; y > 0; --y){
        for(let x = 0; x < arena[y].length; ++x){
            if(arena[y][x] === 0){
                continue outer;
            }
        }
        //index of splice is y and length of splice is 1
        //now we access that row directly and fill it with rows!
        //we put [0] is because we got a splice of length 1.
        const row = arena.splice(y,1)[0].fill(0);
        //pushes to the beginning of an array.
        arena.unshift(row);
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2;
        numRowsSweep++;
    }
    if(oldScore !== player.score){
        if (numRowsSweep === 1){
            alert("you could have done better, you know...");
        } else if ((level !== 4 && numRowsSweep === 2) || level === 4 && numRowsSweep === 3){
            alert("AMAZING!, You are doing SO-GOOD!");
            level++;
			if(level === 5) {
				window.location = "./index2.html";
			}
        } else if (level === 4 && numRowsSweep === 2){
            //level 4 and did 2 rows.
            alert("you did good, but you can do Better!");			
        } else if (level === 5 && numRowsSweep === 2) {
			alert("NICE!!!!, you are grasping the idea of loops!");
			level++;
		}
        playerReset();
        arena.forEach(row => row.fill(0));
        buildArena();
        update();
        updateScore();
    }
}
	
const matrix = [
	[0,0,0],
	[1,1,1],
	[0,1,0]
];
function collide(arena, player){
    const [m, o] = [player.matrix, player.pos];
    //y is the row, x is the column.
    for (let y = 0; y < m.length; y++){
        for(let x = 0; x < m[y].length; ++x){
            //we check if the matrix value isn't zero, n then we check if the arena
            // has a row and the we check if the arena has a column and BOTH aren't 0
            //then we return true cause there is a collision.
            if(m[y][x] !== 0 && (arena[y + o.y] &&
				arena[y + o.y][x + o.x]) !== 0){
                //it seems that if the arena is outofbounds mayb we get value
                //that is not zero(since we made the arena zeros only).
                return true;
            }
        }
    }
    return false;
}
function createPiece(type){
    if (type === 'T'){
        return [
				[0,0,0],
				[1,1,1],
				[0,1,0]
        ];
    }else if(type === 'O'){
        return [
			[2,2],
			[2,2]
        ];
    }else if(type === 'L'){
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ];
    }else if(type === 'J'){
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ];
    }else if(type === 'I'){
        return [
			[0,5,0,0],
			[0,5,0,0],
			[0,5,0,0],
			[0,5,0,0]
        ];
    }else if(type === 'S'){
        return [
			[0,6,6],
			[6,6,0],
			[0,0,0]
        ];
    }
    return [
		[7,7,0],
		[0,7,7],
		[0,0,0]
    ];
}

function createMatrix(width,height){
    const matrix = [];
    while(height--){
        //we push an array that is of width.length and fill it with Zeros.
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

function draw(){
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width, canvas.height);
    drawMatrix(arena, {x:0,y:0});
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix ,offset){
    var col = colors[colors.length * Math.random() |0];
    matrix.forEach((row, y) =>{
        row.forEach((value, x) =>{
            if(value !== 0){
                context.fillStyle = colors[value];
                context.fillRect(x+offset.x
								,y + offset.y
								,1,1);
                //1 means covers 2 pixels in the canvas!!!.
            }
			
        }); 
    });
}
var player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0
};

const arena = createMatrix(12,20);

function merge(arena, player){
    player.matrix.forEach((row,y) =>{
        row.forEach((value,x) =>{
            if(value !== 0){
                arena[y + player.pos.y][x+ player.pos.x] = value;
            }
        });
    });
}


function playerDrop(){
    player.pos.y++;
    if(collide(arena, player)){
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
        return 1;
    }
    dropCounter = 0;
    return 0;
}

function getInput(){
	if (level >= 1 && level <= 4) {
		var linesBeforeLoop = document.getElementById("textarea1").value.split('\n');
	} else {
		//must add the one inside the loop.
	    linesBeforeLoop = document.getElementById("textareaBeforeLoop").value.split('\n');
		var linesAfterLoop = document.getElementById("textareaAfterLoop").value.split('\n');
		var linesBeforeRet = document.getElementById("textareaBeforeRet").value.split('\n');
	}
    var i = 0;
    var date = new Date();
    var seconds = date.getMilliseconds();
    var lastTimeLoop = 0;
    getInp(seconds, i, linesBeforeLoop, 0);
	seconds = date.getMilliseconds();
	let whichLine = 0;
	if(level === 6) {
		whichLine = 1;
	}
	checkSuccess = runLoopInp(seconds, linesAfterLoop, whichLine);
	seconds = date.getMilliseconds();
	getInp(seconds, 0, linesBeforeRet, 0);
}

function runLoopInp(seconds = 0,lines, lineNum = 0, times = 0, readAlr = 0){
	let newTime = new Date().getMilliseconds();
	if (Math.abs(newTime - seconds) > 300) {
		seconds = newTime;
		if (lineNum >= lines.length){
			if (times === -1) {
				return 0;
			}
			alert("you entered Infinite Loop!, think how to break it!");
			return -1;
		}
		if (lines[lineNum].substring(0, 2) === "//"){
			lineNum++;
            requestAnimationFrame(function () { runLoopInp(seconds, lines, lineNum);});
			return 0;
		}
		var begin = 0, end = 0;
		let noSpaceInName = true;
		if (times === 0) {
			readAlr = 0;
		}
		if (readAlr && times > 0) {
			playerRotate(-1);
			draw();
			times--;
            requestAnimationFrame(function () { runLoopInp(seconds, lines, lineNum, times, readAlr);});
			return 0;
		} else if (readAlr && times < -1) {
			playerRotate(-1);
			draw();
			times++;
			if (times === -1) {
				return 0;
			}
            requestAnimationFrame(function () { runLoopInp(seconds, lines, lineNum, times, readAlr);});
			return 0;
		}
		for (var i = 0; i < lines[lineNum].length; ++i){
			if (lines[lineNum].charAt(i) === ' '){
				continue;
			}
			//if (lines[lineNum].charAt(i) !==' '){
			begin = i;
			end = i;
			var charAtm = lines[lineNum].charAt(end);
			while(charAtm !== ' ' && charAtm !== ';' && charAtm !== '('){
				end++;
				if(end >= lines[lineNum].length){
					break;
				}
				charAtm = lines[lineNum].charAt(end);
				
			}
			var command = lines[lineNum].substring(begin, end);
			//}
			if (command !== "if" && command !== "break" && command !== "continue" && command !== "}"){
				if (level === 6) {
					let i = 0;
					if (command === "i++" || command === "++i" || command === "i+=1") {
						readAlr = 1;
						times = -4;
                        requestAnimationFrame(function () { runLoopInp(seconds, lines, lineNum, times, readAlr); });
						return;
						//must work on it, on the first lines, or maybe make exception it is level 6...
					}
				}
				alert("there is no such function/ at line " + (lineNum + 1) + ".");
				return -1;
			}		
			if (command === "break"){
				return 0;
			} else if (command === "continue") {
				playerRotate(-1);
				draw();
				lineNum++;
                requestAnimationFrame(function () { runLoopInp(seconds, lines, lineNum);});
				return 0;
			} else {
				i = end;
				while((charAtm = lines[lineNum].charAt(end)) === ' ') {
					end++;
				}
				i = end;
				if (charAtm === '('){
					begin = i + 1;
					while(lines[lineNum].charAt(begin) === ' ') {
						begin++;
					}
					if (lines[lineNum].charAt(begin) !== 'i') {
						alert("please use only the loop-variable named 'i'");
						return -1;
					}
					//passed!, we got variable i.
					begin++;
					while(lines[lineNum].charAt(begin) === ' ') {
						begin++;
					}
					end = begin;
					while(lines[lineNum].charAt(end) === '>' || lines[lineNum].charAt(end) === '<' ||
	    			  lines[lineNum].charAt(end) === '=') {
						end++;
					}
					if(lines[lineNum].substring(begin, end) !== "==") {
						alert("you put wrong operator in the if-function, use other");
						return;
					}
					//passed!, we got operator ==.
					begin = end;
					while(lines[lineNum].charAt(begin) === ' ') {
						begin++;
					}
					end = begin;
					let oneSpaceOnly = true;
					while(!isNaN(lines[lineNum].charAt(end))) {
						end++;
					}
					times = parseInt(lines[lineNum].substring(begin, end));
					while(lines[lineNum].charAt(end) === ' '){
						end++;
					}
					if(lines[lineNum].charAt(end) !== ')' ){
						alert("please only enter number after the logical operator in if-loop");
						return -1;
					}
					//passed!. all between if ( .... ) is right, just to check if there is '{' left! :).
					times = parseInt(lines[lineNum].substring(begin, end));
					end++;
					while(lines[lineNum].charAt(end) === ' '){
						end++;
					}
					if (lines[lineNum].charAt(end) !== '{'){
						alert("please put '{' after the conditions of if-function.");
						return -1;
					}
				}
				/*
				if (lines[lineNum].charAt(i) === ')' && end != 0){
					end = i;
				}
				if (begin != 0 && lines[lineNum].charAt(begin) !== ' ') {
					begin++;
				}
				if (end != 0 && lines[lineNum].charAt(end) !== ' ') {
					end++;
				}
				*/
				break;
			}
		}
		readAlr = 1;
		lineNum++;
	}
	requestAnimationFrame(function () {runLoopInp(seconds, lines, lineNum, times, readAlr)});
	return;
}

function buildArena(){
    if (level === 1){
        arena[arena.length - 1] = [2,2,2,2,2,2,2,2,2,2,2,2];
        arena[arena.length - 1][8] = 0;
        arena[arena.length - 2] = [3,3,3,3,3,3,3,3,3,3,3,3];
        arena[arena.length - 2][8] = 0;
        arena[arena.length - 2][9] = 0;
        arena[arena.length - 2	][10] = 0;
    } else if( level === 2){
        arena[arena.length - 1] = [2,2,0,0,2,2,2,2,0,0,2,2];
        arena[arena.length - 2] = [2,2,0,0,2,2,2,2,0,0,2,2];
    } else if (level === 3){
        arena[arena.length - 1] = [0,1,1,1,1,1,1,1,1,1,1,0];
        arena[arena.length - 2] = [0,0,2,2,2,2,2,2,2,2,0,0];
    } else if (level === 4) {
        arena[arena.length - 1] = [0,3,3,3,3,3,3,3,0,0,0,0];
        arena[arena.length - 2] = [0,3,4,5,5,5,4,3,0,0,0,0];
        arena[arena.length - 3] = [0,0,5,5,6,7,6,5,0,0,0,0];
    } else if (level === 5) {
		arena[arena.length - 4] = [1,0,0,0,0,5,5,6,7,7,7,7];
		arena[arena.length - 3] = [1,1,0,0,5,5,6,6,6,0,0,0];
		arena[arena.length - 2] = [3,3,0,0,3,3,3,3,3,3,3,3];
        arena[arena.length - 1] = [4,4,0,4,4,4,4,4,4,4,4,4];
	} else if (level === 6){
		arena[arena.length - 5] = [0,0,0,0,0,0,0,0,6,0,0,0];
		arena[arena.length - 4] = [0,0,0,5,5,0,0,6,6,7,7,7];
		arena[arena.length - 3] = [0,0,0,0,5,5,1,1,6,7,4,4];
		arena[arena.length - 2] = [0,0,2,2,3,3,1,1,2,2,4,4];
        arena[arena.length - 1] = [0,2,2,3,3,7,7,7,7,2,2,7];
	} else {
		window.location = "./endingPage.html";
	}
}

function getInp(seconds = 0, i, lines, numOfTimes){
    //gotta fix if thigns after the ';' and also when there is no number, we set the numOfTime to 1.
    if (i < lines.length){
        if(numOfTimes === 0){
            let begin = 0, endIndex = 0;
            let numOfSpaces = 0;
            let startCountSpaces = false;
            //the num of the ';' and to check if it exists or no.
            let endSemicolonExists = false;
            let lineOfError = i + 1;
            var numOfLeftParenthesis = 0;
            var numOfRightParenthesis = 0;
            for(let j = 0; j < lines[i].length; j++){
                if(lines[i].charAt(j) === '('){
                    if(numOfLeftParenthesis === 0){
                        begin = j + 1;
                    }
                    numOfLeftParenthesis++;
                    if(numOfLeftParenthesis > 1) {
                        alert("dont put more than one left Parenthesis");
                        i++;
                        requestAnimationFrame(function () { getInp(seconds, i, lines, 0);});
                        return;
                    }
                }
                if(lines[i].charAt(j) === ')'){
                    endIndex = j;
                    numOfRightParenthesis++;
                    if(numOfRightParenthesis > 1) {
                        alert("dont put more than one right Parenthesis");
                        i++;
                        requestAnimationFrame(function () { getInp(seconds, i, lines, 0); });
						return;
                    }
                }
                if(begin !== 0){
                    startCountSpaces = true;
                }
                if ( endIndex !== 0){
                    startCountSpaces = false;
                }
                if (startCountSpaces) {
                    if(lines[i].charAt(j + 1) === ' '){
                        numOfSpaces++;
                    }
                    if (isNaN(lines[i].charAt(j + 1)) && lines[i].charAt(j + 1) !== ')'){
                        alert("please enter numbers only as arguments on line " + lineOfError);
                        i++;
                        numOfTimes = 0;
                        requestAnimationFrame(function () { getInp(seconds, i, lines, 0); });	
						return;
                    }
                }
                if (begin !== 0 && endIndex !== 0){
                    if(lines[i].charAt(j) !== ')' &&
						lines[i].charAt(j) !== ' '){
                        if(lines[i].charAt(j) === ';'){
                            j++;
                            endSemicolonExists = true;
                            while( j < lines[i].length){
                                if (lines[i].charAt(j) !== ' '){
                                    alert("Dont put anything after ';' (line " + lineOfError + ")");
                                    i++;
                                    draw();
                                    requestAnimationFrame(function () { getInp(seconds, i, lines, 0);});	
									return;
                                }
                            }
                            break;
                        }
                        if (j >= lines[i].length && (!endSemicolonExists)) {
                            alert("please put semicolon ';' at end of line " + lineOfError);
                        } else {
                            alert("Dont put anything between the end of function and the ';' (line " + lineOfError + ")");
                        }
                        i++;
                        draw();
                        requestAnimationFrame(function () { getInp(seconds, i, lines, 0);});
						return;
                    }
                }
            }
			
            if(numOfSpaces === endIndex - begin) {
                numOfTimes = 1;
            } else {
                numOfTimes = parseInt(lines[i].substring(begin, endIndex));
            }
            lines[i] = lines[i].replace(lines[i].substring(begin - 1, lines[i].length), "");
        }
        lastTimeLoop = (new Date()).getMilliseconds();
        if(Math.abs(lastTimeLoop - seconds) > 500){
            //alert(lastTimeLoop +" "+ seconds);
            seconds = lastTimeLoop;
            if (lines[i] === "MoveLeft"){
                playerMove(-1);
            } else if( lines[i] === "MoveRight"){
                playerMove(1);
            } else if (lines[i] === "DropDown"){
                dropDownAnimation(seconds);
                return;
            } else if (lines[i] === "Rotate"){
                playerRotate(-1);	
            }
            if(numOfTimes !== 0){
                numOfTimes--;
                if(numOfTimes === 0 ){
                    i++;
                }
            } else {
                i++;
            }
        }
        draw();
        requestAnimationFrame(function () { getInp(seconds, i, lines, numOfTimes);});
    }
}

    function dropDownAnimation(seconds = 0){
        var newTime = (new Date()).getMilliseconds();
        if(Math.abs(newTime - seconds) > 200) {
            var collided = playerDrop();
            seconds = newTime;
        }
        draw();
        if (!collided){
            requestAnimationFrame(function () { dropDownAnimation(seconds);});
        }
        return;
    }


        //as we rem let == blockscoped!.
        let lastTime = 0;
        let dropCounter = 0;
        let dropInterval = 1000;
        function update(time = 0){
            const deltaTime = time - lastTime;
            lastTime = time;
            dropCounter += deltaTime;
            if (dropCounter > dropInterval){
                //playerDrop();
            }
            draw();
            //what this function does is it calls the same function again n again over a change
            requestAnimationFrame(update);
        }


            const colors = [
                null,
                'purple',
                'yellow',
                'orange',
                'blue',
                'aqua',
                'green',
                'red'
            ];


            function playerMove(dir){
                player.pos.x += dir;
                if(collide(arena,player)){
                    player.pos.x -= dir;
                }
            }
            var pieceCounter = 1;
            function playerReset(){
				if (level === 6){
					document.getElementById("textareaBeforeLoop").value = "int i = 0;\n";
					document.getElementById("textareaLoop").value = "while(true) {";
					document.getElementById("textareaAfterLoop").value = "if (i == 3) { break; }\n//add code to break loop.\n";
				} else if (level === 5){
					document.getElementById("textareaLoop").value = "for(int i = 0; i < 10; i++) {";
					document.getElementById("textareaAfterLoop").value = "//fix the code ... \nif (i == 10) {\n    continue; \n}";
				}
                const pieces = 'ILJOTSZ';
                player.matrix = createPiece(pieces[Math.random() * pieces.length | 0]);
                if (pieceCounter % 4 === 0) {
                    if (level === 1) {
                        player.matrix = createPiece('L');
                    } else if (level === 2) {
                        player.matrix = createPiece('O');
                    } else if (level === 3) {
                        player.matrix = createPiece('T');	
                    } else if(level === 4) {
                        let miniPieces = 'IOJ'; 
                        player.matrix = createPiece(miniPieces[Math.random() * miniPieces.length | 0]);
                    }
                }
				if (level === 5) {
					player.matrix = createPiece('T');
				}else if (level === 6) {
					player.matrix = createPiece('Z');
				}
                pieceCounter++;
                player.pos.y = 0;
                player.pos.x = (arena[0].length / 2 | 0) -
                                (player.matrix[0].length / 2 | 0);
                if(collide(arena,player)){
                    player.score = 0;
                    arena.forEach(row => row.fill(0));
                    buildArena();
                }
            }

            function playerRotate(dir){
                const pos = player.pos.x;
                let offset = 1;
                rotate(player.matrix, dir);
                while(collide(arena, player)) {
                    player.pos.x += offset;
                    offset = -(offset + (offset > 0 ? 1 : -1));
                    if (offset > player.matrix[0].length){
                        rotate(player.matrix, -dir);
                        player.pos.x = pos;
                        return;
                    }
                }
            }

            function rotate(matrix,dir){
                for(let y = 0; y < matrix.length; ++y){
                    for(let x = 0; x < y; ++x){
                        //switching the values.
                        [
                        matrix[x][y],
                        matrix[y][x]
                        ] = [
                            matrix[y][x],
                            matrix[x][y]
                        ];
                    }
                }
                if(dir > 0 ){
                    matrix.forEach((row => row.reverse()));
                } else {
                    matrix.reverse();
                }
            }
            /*
            document.addEventListener("keydown", event =>{
            //	console.log(event);
                //write on top, pomle.github.io/keycode: 37 left , 38 up, 39 > , 40 down.
                if(event.keyCode === 37){
                    playerMove(-1);
                //up	
                }else if (event.keyCode === 38){
                //	player.pos.y--;
                    playerRotate(-1);
                }else if (event.keyCode === 39){
                    playerMove(+1);
                }else if (event.keyCode === 40){
                    playerDrop();
                }else if (event.keyCode === 81){
                    playerRotate(-1);
                }else if (event.keyCode === 87){
                    playerRotate(1);
                }
            });
            */
            //var p = document.getElementById("tryMe");
            //p.innerHTML = matrix[0].length;
            level = 6;
            playerReset();
            buildArena();
            update();
            updateScore();

            function updateScore(){
                var score = document.getElementById("score");	
                score.innerText = player.score;
            }