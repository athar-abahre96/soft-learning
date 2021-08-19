
// declare modal
let modal = document.getElementById("popup1");
let modal_middle = document.getElementById("middle");

// add method in string prototype
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

q1 = "Variable expressions are mathematical statements that contain:A.Only numbers B.Only letters C.Numbers and letters D.One letter and no numbers";
q2 = "Identify the commutative property: A. A + b = a + b B.A + b = b + a C.B + a = a + B D.A + b = 0";
q3 = "What value will return to the operating system upon the successful completion of a program ? A. - 1 B. 1 C. 0 D.Programs do not return a value";
q4 = "The keyword ‘break’ cannot be simply used within _________  a) do -while b) if-else c) for d) while ";
q5 = "Which keyword is used to come out of a loop only for that iteration? a) break b) continue c) return d) none of the mentioned ";
q6 = "Which loop is most suitable to first perform the operation and then test the condition ? a) for loop b) while loop c) do -while loop d) none of the mentioned ";
q7 = "Which of the following operator has the highest precedence in the following? a) () b) sizeofc) * d) + ";
q8 = "Which is correct with respect to the size of the data types?a) char > int > float b) int > char > float c) char < int < double d) double > char > int";
q9 = "Which of the following declaration is not supported by C? a) String str; b) char * str; c) float str = 3e2; d) Both String str; & float str = 3e2;";
q10 = "Pick the operator that associate from the right? A. ? : B. + = C. = D.All";

a1 = "C";
a2 = "B";
a3 = "C";
a4 = "c";
a5 = "b";
a6 = "c";
a7 = "a";
a8 = "c";
a9 = "a";
a10 = "D";

var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
var answers = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];
var correct = 0;
var SnakeLadderModule = (function () {
    var snakes = {
        16: 6,
        46: 25,
        49: 11,
        62: 19,
        64: 60,
        74: 53,
        89: 68,
        92: 88,
        95: 75,
        99: 80
    };
    var ladders = {
        2: 38,
        7: 14,
        8: 31,
        15: 26,
        21: 42,
        28: 84,
        36: 44,
        51: 67,
        71: 91,
        78: 98,
        87: 94
    };

    var players = [{
        name: 'Player1',
        position: 0,
        bg: '#f55bf5'
    }, {
        name: 'Player2',
        position: 0,
        bg: '#75ff79'
    },];
    var idOfplayerTurn = 0;

    /// Create snake-ladder board
    function initUI() {
        for (var i = 0; i < 10; i++) {
            var decrow = $('<div class="row"></div>');
            for (var j = 0; j < 10; j++) {
                var disVal = 0;
                if (i % 2 === 0) {
                    disVal = 10 * i + j + 1;
                } else {
                    disVal = 10 * i + 10 - j;
                }
                disVal = 100 - disVal + 1;
                decrow.append('<div id="cell_' + disVal + '"></div>'); //' + disVal + '
            }
            $('#snakenladderBoard').append(decrow[0].outerHTML);
        }
    }

    /// Build Players 
    function BuildPlayers() {
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            var playerHtml = "<span id='player" + i + "' class='player' style='background-color:" + player.bg + "'></span>";
            var playerLegendHtml = "<div id='playerLegend" + i + "' class='legends' style='background-color:" + player.bg + "'>" + player.name + "<span>0</span></div>";
            $("#players").append(playerHtml + playerLegendHtml);
        }
    } 

    $("#check").on("click",function () {       
        modal_middle.classList.remove("show");
        return;
    });
    function check(num) {
        var answer = document.getElementById("answer");
        if (answer.value === answers[num]) {
            correct = 1;
        }
        else {
            correct = 0;
        }
        
    }
    

    function RandomizeDice() {
        return Math.floor(Math.random() * 6) + 1;
    }
    
    function changeLink() {
        
        var rand = Math.floor(Math.random() * 3);

        var URl = '@Url.Action("SnkLds","First")';
        $.ajax({
            url: URl,
            data: { id: rand },
            success: function (data) {
                //call is successfully completed and we got result in data
            }
        });

    };
    return {
        Init: function () {
            initUI();
            BuildPlayers();
            $("#playerLegend" +idOfplayerTurn).addClass('active');
        },
        RollDice: function () {
            var game = document.getElementById("game");
            var ques = document.getElementById("question");
            var randm = RandomizeDice();
            var die1 = document.getElementById("dice");
            die1.innerHTML = randm;

            idOfplayerTurn = idOfplayerTurn % players.length;
            $(".legends").removeClass('active');
            $("#playerLegend" + (idOfplayerTurn + 1) % players.length).addClass('active');

            var currentPosition = players[idOfplayerTurn].position;
            currentPosition += randm;
            if (currentPosition >= 100) {
                currentPosition = 100;
                modal.classList.add("show");
                $("#player" + idOfplayerTurn).appendTo("#cell_" + currentPosition);
                $("#playerLegend" + idOfplayerTurn).find('span').text('Winner'); //currentPosition
                $("button").attr('disabled', 'disabled');
                document.getElementById("playerLegend").innerHTML = players[idOfplayerTurn].name + " is the winner!!";
                closeModal();
            }
            else {
                if (currentPosition === 2) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[0];
                    check(0);
                    if (correct === 1) {
                        currentPosition = 38;
                        correct = 0;
                    }
                } else if (currentPosition === 7) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[1];
                    check(1);
                    if (correct === 1) {
                        currentPosition = 14;
                        correct = 0;
                    }
                } else if (currentPosition === 8) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[2];
                    check(2);
                    if (correct === 1) {
                        currentPosition = 31;
                        correct = 0;
                    }
                } else if (currentPosition === 15) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[3];
                    check(3);
                    if (correct === 1) {
                        currentPosition = 26;
                        correct = 0;
                    }
                } else if (currentPosition === 21) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[4];
                    check(4);
                    if (correct === 1) {
                        currentPosition = 42;
                        correct = 0;
                    }
                } else if (currentPosition === 28) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[5];
                    check(5);
                    if (correct === 1) {
                        currentPosition = 84;
                        correct = 0;
                    }
                } else if (currentPosition === 36) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[6];
                    check(6);
                    if (correct === 1) {
                        currentPosition = 44;
                        correct = 0;
                    }
                } else if (currentPosition === 51) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[7];
                    check(7);
                    if (correct === 1) {
                        currentPosition = 67;
                        correct = 0;
                    }
                } else if (currentPosition === 78) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[8];
                    check(8);
                    if (correct === 1) {
                        currentPosition = 98;
                        correct = 0;
                    }
                } else if (currentPosition === 71) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[9];
                    check(9);
                    if (correct === 1) {
                        currentPosition = 91;
                        correct = 0;
                    }
                } else if (currentPosition === 87) {
                    modal_middle.classList.add("show");
                    ques.innerText = questions[10];
                    check(10);
                    if (correct === 1) {
                        currentPosition = 98;
                        correct = 0;
                    }


                } else if (currentPosition === 99) {
                    currentPosition = 80;
                } else if (currentPosition === 95) {
                    currentPosition = 75;
                } else if (currentPosition === 92) {
                    currentPosition = 88;
                } else if (currentPosition === 89) {
                    currentPosition = 68;
                } else if (currentPosition === 74) {
                    currentPosition = 53;
                } else if (currentPosition === 62) {
                    currentPosition = 19;
                } else if (currentPosition === 64) {
                    currentPosition = 60;
                } else if (currentPosition === 46) {
                    currentPosition = 25;
                } else if (currentPosition === 49) {
                    currentPosition = 11;
                } else if (currentPosition === 16) {
                    currentPosition = 6;
                }
                
                $("#player" + idOfplayerTurn).appendTo("#cell_" + currentPosition);
                $("#gameMessage").text(players[idOfplayerTurn].name + " played " + randm);
                $("#playerLegend" + idOfplayerTurn).find('span').text(currentPosition); //currentPosition  

            }
            players[idOfplayerTurn].position = currentPosition;
            idOfplayerTurn++;
        }
    };
})();

function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
    });
}

SnakeLadderModule.Init();

$("button").on("click", function () {
    SnakeLadderModule.RollDice();
});
