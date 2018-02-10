if (document.getElementById("tempG") != null) {
    var t = new JustGage({
        id: "tempG",
        value: 20,
        min: 0,
        max: 30,
        title: "Temperature"
    });
}
if (document.getElementById("clientG") != null) {
    var c = new JustGage({
        id: "clientG",
        value: 0,
        min: 0,
        max: 50,
        title: "Clients"
    });
}
if (document.getElementById("pressureG") != null) {
    var p = new JustGage({
        id: "pressureG",
        value: 100,
        min: 0,
        max: 110,
        title: "Pressure"
    });
}
if (document.getElementById("accelG") != null) {
    var a = new JustGage({
        id: "accelG",
        value: 1,
        min: -2,
        max: 2,
        title: "Acceleration"
    });
}
if (document.getElementById("speedG") != null) {
    var s = new JustGage({
        id: "speedG",
        value: 0,
        min: 0,
        max: 20,
        title: "Speed"
    });
}
