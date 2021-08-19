
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
    var i = Math.floor(Math.random() * (raw.length-1)) + 1;
    document.getElementById("sentence").innerText = raw[i];
});
readTextFile("/../Did you Know/CLang.txt");
