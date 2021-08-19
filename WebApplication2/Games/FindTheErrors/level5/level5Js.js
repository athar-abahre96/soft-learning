var a = 0;
a++;
var b = 3;
b--;

function correct001() {

    let audio = document.getElementById("clip1");
    audio.play();
    board001.innerHTML += "<div id=mark002></div><h3 id='text2'>logical error, this will never be executed</h3>";
    score001.innerHTML = a++;
    if (a > 2) {
        message002.innerHTML = "<button class=blue001 onclick=nextLevel()>Next Level</button>";
        board001.innerHTML = "<img src=../Capture5.PNG height=402 width=255 />";
        board001.innerHTML += "<div id=mark001></div><h3 id='text1'>logical error, this will never be executed</h3>";
        board001.innerHTML += "<div id=mark002></div><h3 id='text2'>logical error, this will never be executed</h3>";
    }
}

function correct002() {

    let audio = document.getElementById("clip1");
    audio.play();
    board001.innerHTML += "<div id=mark001></div><h3 id='text1'>logical error, this will never be executed</h3>";
    score001.innerHTML = a++;
    if (a > 2) {
        message002.innerHTML = "<button class=blue001 onclick=nextLevel()>Next Level</button>";
        board001.innerHTML = "<img src=../Capture5.PNG height=402 width=255 />";
        board001.innerHTML += "<div id=mark001></div><h3 id='text1'>logical error, this will never be executed</h3>";
        board001.innerHTML += "<div id=mark002></div><h3 id='text2'>logical error, this will never be executed</h3>";
    }
}

function incorrect001() {

    let audio = document.getElementById("clip2");
    audio.play();
    attempts001.innerHTML = b--;
    if (b < 0) {
        message002.innerHTML = "<button class=blue001 onclick=repeat001()>Try Again</button>";
        attempts001.innerHTML = "0";
        board001.innerHTML = "<img src=../Capture5.PNG height=402 width=255 />";
    }
}

function repeat001() {
    location.reload();
}

function nextLevel() {
    window.location = "../level6/level6.html";
}