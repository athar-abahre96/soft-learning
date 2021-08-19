pictures = ["/../Did you Know/if else.png", "/../Did you Know/switch.png", "/../Did you Know/for-loop-header.jpg", "/../Did you Know/while.png", "/../Did you Know/main.png", "/../Did you Know/function.png"];
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
    var i = Math.floor(Math.random() * (raw.length - 1)) + 1;
    document.getElementById("sentence").innerText = raw[i];
    document.getElementById("image").src = pictures[i];

});
readTextFile("/../Did you Know/basics.txt");
