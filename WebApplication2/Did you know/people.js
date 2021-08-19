pictures = ["/../Did you Know/alanTuring.jpg", "/../Did you Know/jvn.jpg", "/../Did you Know/steveJobs.jpg", "/../Did you Know/billGates.jpg", "/../Did you Know/BobKahn.jpg", "/../Did you Know/Linus.jpg"];
MoreRef = ["https://en.wikipedia.org/wiki/Alan_Turing", "https://en.wikipedia.org/wiki/John_von_Neumann", "https://en.wikipedia.org/wiki/Steve_Jobs", "https://en.wikipedia.org/wiki/Bill_Gates", "https://en.wikipedia.org/wiki/Bob_Kahn","https://en.wikipedia.org/wiki/Linus_Torvalds"];
var filetext = "";

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                filetext = rawFile.responseText;
                //alert(allText);
            }
        }
    };
    rawFile.send(null);
}


$("#NextFact").click(function () {
    var raw = filetext.split("\n");
    var sents = [];
    var names = [];
    for (var j = 0; j < raw.length; j++){
        if (j % 2 === 0) {
            names.push(raw[j]);
        }
        else {
            sents.push(raw[j]);
        }
    }
    var i = Math.floor(Math.random() * 5) + 1;
    document.getElementById("name").innerText = names[i];
    document.getElementById("sentence").innerText = sents[i];
    document.getElementById("image").src = pictures[i];
    document.getElementById("more").href = MoreRef[i];

    
});
readTextFile("/../Did you Know/people.txt");
