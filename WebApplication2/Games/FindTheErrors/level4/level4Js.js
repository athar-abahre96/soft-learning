var a = 0;
a++;
var b = 3;
b--;

function correct001() {

    let audio = document.getElementById("clip1");
    audio.play();
    board001.innerHTML += "<div id=mark001></div><h3 id='text1'>SIZE is not defined</h3>";
    score001.innerHTML = a++;
    if (a > 2) {
        message002.innerHTML = "<button class=blue001 onclick=nextLevel()>Next Level</button>";
        board001.innerHTML = "<img src=../Capture4.PNG height=680 width=479 />";
        board001.innerHTML += "<div id=mark001></div><h3 id='text1'>SIZE is not defined</h3>";
        board001.innerHTML += "<div id=mark002></div><h3 id='text2'>compilation error because of the first error</h3>";
    }
}

function correct002() {

    let audio = document.getElementById("clip1");
    audio.play();
    board001.innerHTML += "<div id=mark002></div><h3 id='text2'>compilation error because of the first error</h3>";
    score001.innerHTML = a++;
    if (a > 2) {
        message002.innerHTML = "<button class=blue001 onclick=nextLevel()>Next Level</button>";
        board001.innerHTML = "<img src=../Capture4.PNG height=680 width=479 />";
        board001.innerHTML += "<div id=mark002></div><h3 id='text2'>compilation error because of the first error</h3>";
        board001.innerHTML += "<div id=mark001></div><h3 id='text1'>SIZE is not defined</h3>";
    }
}

function incorrect001() {

    let audio = document.getElementById("clip2");
    audio.play();
    attempts001.innerHTML = b--;
    if (b < 0) {
        message002.innerHTML = "<button class=blue001 onclick=repeat001()>Try Again</button>";
        attempts001.innerHTML = "0";
        board001.innerHTML = "<img src=../Capture4.PNG height=680 width=479 />";
    }
}

function repeat001() {
    location.reload();
}

function nextLevel() {
    window.location = "../level5/level5.html";
}