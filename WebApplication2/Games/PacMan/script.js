
var map = [

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
	[1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
	[1, 2, 2, 2, 1, 1, 5, 1, 1, 2, 2, 2, 1],
	[1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
	[1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
	[1, 4, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]	
]
 
var pacman = {
    x: 6,
    y: 4
}

var ghost1 = {
    x: 1,
    y: 7,
    lastMove: 'u',
    onCoin: 'y',
    pacmanDies: 'n'
}

var score = 0;

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

document.onkeydown = function (e) {

    // move left
    if (e.keyCode === 37) {
        if (map[pacman.y][pacman.x - 1] !== 1) {
            if (map[pacman.y][pacman.x - 1] === 2) {
                score++;
                $("#score").text("SCORE : " + `${score}`);
            }
            map[pacman.y][pacman.x] = 3;
            pacman.x -= 1;
            map[pacman.y][pacman.x] = 5;
        }

    }

    // move right
    else if (e.keyCode === 39) {
        if (map[pacman.y][pacman.x + 1] !== 1) {
            if (map[pacman.y][pacman.x + 1] === 2) {
                score++;
                $("#score").text("SCORE : " + `${score}`);
            }
            map[pacman.y][pacman.x] = 3;
            pacman.x += 1;
            map[pacman.y][pacman.x] = 5;
        }

    }

    // move up
    else if (e.keyCode === 38) {
        if (map[pacman.y - 1][pacman.x] !== 1) {
            if (map[pacman.y - 1][pacman.x] === 2) {
                score++;
                $("#score").text("SCORE : " + `${score}`);
            }
            map[pacman.y][pacman.x] = 3;
            pacman.y -= 1;
            map[pacman.y][pacman.x] = 5;
        }

    }

    // move down
    else if (e.keyCode === 40) {
        if (map[pacman.y + 1][pacman.x] !== 1) {
            if (map[pacman.y + 1][pacman.x] === 2) {
                score++;
                $("#score").text("SCORE : " + `${score}`);
            }
            map[pacman.y][pacman.x] = 3;
            pacman.y += 1;
            map[pacman.y][pacman.x] = 5;
        }
    }
	// pacman dies
    if (map[pacman.y][pacman.x] === map[ghost1.y][ghost1.x]) {
        document.location.reload(true);
    }
    //ghost tries to go up
    if (map[ghost1.y - 1][ghost1.x] !== 1 && ghost1.lastMove !== 'd') {
        if (ghost1.onCoin === 'y') {
            map[ghost1.y][ghost1.x] = 2;
        }
        else {
            map[ghost1.y][ghost1.x] = 3;
        }
        if (map[ghost1.y-1][ghost1.x] === 2) {
            ghost1.onCoin = 'y';
        }
        else {
            ghost1.onCoin = 'n';
        }
        ghost1.y -= 1;
        map[ghost1.y][ghost1.x] = 4;
        ghost1.lastMove = 'u';
    }
    
    // ghost tries to go right
    else if (map[ghost1.y][ghost1.x + 1] !== 1 && ghost1.lastMove !== 'l') {
        if (ghost1.onCoin === 'y') {
            map[ghost1.y][ghost1.x] = 2;
        }
        else {
            map[ghost1.y][ghost1.x] = 3;
        }
        if (map[ghost1.y][ghost1.x+1] === 2) {
            ghost1.onCoin = 'y';
        }
        else {
            ghost1.onCoin = 'n';
        }
        ghost1.x += 1;
        map[ghost1.y][ghost1.x] = 4;
        ghost1.lastMove = 'r';

    }
    
    // ghost tries to go down
    else if (map[ghost1.y + 1][ghost1.x] !== 1 && ghost1.lastMove !== 'u') {
        if (ghost1.onCoin === 'y') {
            map[ghost1.y][ghost1.x] = 2;
        }
        else {
            map[ghost1.y][ghost1.x] = 3;
        }
        if (map[ghost1.y + 1][ghost1.x] === 2) {
            ghost1.onCoin = 'y';
        }
        else {
            ghost1.onCoin = 'n';
        }
        ghost1.y += 1;
        map[ghost1.y][ghost1.x] = 4;
        ghost1.lastMove = 'd';

    }

    // ghost tries to go left
    else if (map[ghost1.y][ghost1.x - 1] !== 1 && ghost1.lastMove !== 'r') {
        if (ghost1.onCoin === 'y') {
            map[ghost1.y][ghost1.x] = 2;
        }
        else {
            map[ghost1.y][ghost1.x] = 3;
        }
        if (map[ghost1.y][ghost1.x-1] === 2) {
            ghost1.onCoin = 'y';
        }
        else {
            ghost1.onCoin = 'n';
        }
        ghost1.x -= 1;
        map[ghost1.y][ghost1.x] = 4;
        ghost1.lastMove = 'l';

    }

    // pacman dies
    if (map[pacman.y][pacman.x] === map[ghost1.y][ghost1.x]) {
        document.location.reload(true);
    }

    // pacman wins
    if (score === 54) {
        document.location.reload(true);
    }
    drawWorld();
}