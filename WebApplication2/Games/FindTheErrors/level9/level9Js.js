var a = 0;
a++;
var b = 3;
b--;

function correct001() {
    let audio = document.getElementById("clip1");
    audio.play();
    disappear001.innerHTML = "<div id=mark001></div><h2 id='text1'>should be strlen(str1) + 1</h2>";
    score001.innerHTML = a++;
    if (a > 1) {
        message002.innerHTML = "<button class=blue001 onclick=nextLevel()>Next Level</button>";
        board001.innerHTML = "<img src=../Capture.PNG height=488 width=397 />";
        board001.innerHTML += "<div id=mark001></div><h2 id='text1'>should be strlen(str1) + 1</h2>";
    }
}

function incorrect001() {
    let audio = document.getElementById("clip2");
    audio.play();
    attempts001.innerHTML = b--;
    if (b < 0) {
        message002.innerHTML = "<button class=blue001 onclick=repeat001()>Try Again</button>";
        attempts001.innerHTML = "0";
        board001.innerHTML = "<img src=../Capture.PNG height=488 width=397 />";
    }
}

function repeat001() {
    location.reload();
}

function nextLevel() {
    window.location = "../level9/level9.html";
}