let modal = document.getElementById("popup1");
// close icon in modal
let closeicon = document.querySelector(".close");
function check() {
    var finish = false;
    var question1 = document.quiz.question1.value;
    var question3 = document.quiz.question3.value;
    var question4 = document.quiz.question4.value;
    var question5 = document.quiz.question5.value;
    var correct = 0;
    if (question1 === "5,10") {
        correct++;
    }
    if (question3 === "False") {
        correct++;
    }
    if (question4 === "True") {
        correct++;
    }
    if (question5 === "All") {
        correct++;
    }

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
    document.getElementById("after_submit").style.visibility = "visible";

    document.getElementById("message").innerHTML = messages[score];
    document.getElementById("number_correct").innerHTML = "You got " + correct + " correct.";
    document.getElementById("picture").src = pictures[score];

}


