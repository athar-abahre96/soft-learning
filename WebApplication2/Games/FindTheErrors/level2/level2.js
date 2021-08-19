var a = 0;
a++
var b = 3;
b--;

function correct001() {

    let audio = document.getElementById("clip1")
    audio.play();
    disappear001.innerHTML = "<div id=mark001></div><h3 id='text1'>Logical Error, results in 16 instead of 36</h3>";
    score001.innerHTML = a++;
    if (a > 0) {
        message002.innerHTML = "<button class=blue001 onclick=nextLevel()>Next Level</button>";
        board001.innerHTML = "<img src=../Capture2.PNG height=455 width=477 />";
        board001.innerHTML += "<div id=mark001></div><h3 id='text1'>Logical Error, results in 16 instead of 36</h3>";
    }
}

function incorrect001() {

    let audio = document.getElementById("clip2")
    audio.play();
    attempts001.innerHTML = b--;
    if (b < 0) {
        message002.innerHTML = "<button class=blue001 onclick=repeat001()>Try Again</button>";
        attempts001.innerHTML = "0";
        board001.innerHTML = "<img src=../Capture2.PNG height=455 width=477 />";
    }
}

function repeat001() {
    location.reload();
}

function nextLevel() {
    window.location = "../level3/level3.html";
}