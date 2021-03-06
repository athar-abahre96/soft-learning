const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
context.scale(20,20);
function arenaSweep(){
	let rowCount = 1;
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
		for(let x = 0; x < m[y].length;++x){
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
			[0,3,0],
			[0,3,0],
			[0,3,3]
			];
	}else if(type === 'J'){
		return [
			[0,4,0],
			[0,4,0],
			[4,4,0]
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
	}
	dropCounter = 0;
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
        playerDrop();
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

    function playerReset(){
        const pieces = 'ILJOTSZ';
        player.matrix = createPiece(pieces[Math.random() * pieces.length | 0]);
        player.pos.y = 0;
        player.pos.x = (arena[0].length / 2 | 0) -
                        (player.matrix[0].length / 2 | 0);
        if(collide(arena,player)){
            player.score = 0;
            arena.forEach(row => row.fill(0));
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
    //var p = document.getElementById("tryMe");
    //p.innerHTML = matrix[0].length;
    playerReset();
    update();
    updateScore();

    function updateScore(){
        var score = document.getElementById("score");	
        score.innerText = player.score;
    }
