var c1 = document.getElementById("c1");
var parent = document.getElementById("p1");
c1.width = parent.offsetWidth - 40;
c1.height = parent.offsetHeight - 40;

var data1 = {
    labels: ["chicago", "milwaukee", "green bay", "mackinac", "traverse city", "gary"],
    datasets: [
        {
            fillColor: "rgba(255,255,255,.1)",
            strokeColor: "rgba(255,255,255,1)",
            pointColor: "#123",
            pointStrokeColor: "rgba(255,255,255,1)",
            data: [594, 614, 592, 734, 598, 599]
        }
    ]
};

var options1 = {
    scaleFontColor: "rgba(255,255,255,1)",
    scaleLineColor: "rgba(255,255,255,1)",
    scaleGridLineColor: "transparent",
    bezierCurve: false,
    scaleOverride: true,
    scaleSteps: 5,
    scaleStepWidth: 50,
    scaleStartValue: 500
}

new Chart(c1.getContext("2d")).Line(data1, options1);