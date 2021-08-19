
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function repeat001() {
    location.reload();
}

function check() {

    let clapAudio = document.getElementById("clip1");
    let awwAudio = document.getElementById("clip2");

    var finish = false;
    var numQuestions = 3;
    var question1 = document.quiz.question1.value;
    var question2 = document.quiz.question2.value;
    var question3 = document.quiz.question3.value;
    //var question5 = document.quiz.question5.value;
    var correct = 0;
    if (question1 === "int i") {
        correct++;
        document.quiz.question1.style.display = 'none';
        document.getElementById("quiz").innerHTML += '<img src="../v.png" id="x1" />';
    }
    else {
        //document.quiz.question1.style.display = 'none';
        document.getElementById("quiz").innerHTML += '<img src="../x3.png" id="x1" />';
    }

    if (question2 === "for") {
        correct++;
        document.quiz.question2.style.display = 'none';
        document.getElementById("quiz").innerHTML += '<img src="../v.png" id="x2" />';
    }
    else {
        //document.quiz.question2.style.display = 'none';
        document.getElementById("quiz").innerHTML += '<img src="../x3.png" id="x2" />';
    }

    if (question3 === "In for loop After loop") {
        correct++;
        document.quiz.question3.style.display = 'none';
        document.getElementById("quiz").innerHTML += '<img src="../v.png" id="x3" />';
    }
    else {
        //document.quiz.question3.style.display = 'none';
        document.getElementById("quiz").innerHTML += '<img src="../x3.png" id="x3" />';
    }
   // if (question5 === "All") {
    //    correct++;
   // }

    var pictures = ["img/win.gif", "img/meh.jpeg", "img/lose.gif"];
    var messages = ["Great job!", "That's just okay", "You really need to do better"];
    var score;

    if (correct === 0) {
        score = 2;
    }

    if (correct > 0 && correct < 4) {
        score = 1;
    }

    if (correct === 4) {
        score = 0;
    }
    finish = true;
    document.getElementById("output").innerHTML += "</br>" + "You got " + correct + " / " + numQuestions + " correct.";
    if (correct < numQuestions) {
        awwAudio.play();
        document.getElementById("output").innerHTML += '<button class="button" type="submit" id="button" onclick="repeat001()">Try again!</button>';
    }
    else {
        clapAudio.play();
        document.getElementById("output").innerHTML += '<button class="button" type="submit" id="button" onclick="nextLevel()">Next Level</button>';
    }
    document.getElementById("button2").style.visibility = "hidden";

}

function nextLevel() {
    window.location = "../level8/level8.html";
}