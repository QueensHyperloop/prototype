var i = 0;
socket.on('button', function (state) {
    if (buttonChart != null) {
        var d = new Date();
        console.log(i);
        buttonData.labels[i] = d.toLocaleTimeString();
        buttonData.datasets[0].data[i] = {
            x: (d.getTime() - time) / 1000,
            y: state
        };
        if (i > refresh) {
            buttonData.labels.length = 0;
            buttonData.datasets[0].data.length = 0;
            i = -1;
            console.log("refresh");
        }
        buttonChart.update();
        i++;
    }
    s.refresh(state);
});

var j = 1;
socket.on('clients', function (num) {
    if (clientChart != null) {
        var d = new Date();
        console.log("client connected");
        clientData.labels[j] = d.toLocaleTimeString();
        clientData.datasets[0].data[j] = {
            x: (d.getTime() - time) / 1000,
            y: num
        };
        clientChart.update();
        j++;
    }
    c.refresh(num);
});

var gyro = {
    pitch: 5,
    yaw: 5,
    roll: 5
};

var accel = {
    X: 30,
    Y: 10,
    Z: 10
}
var cube = document.getElementById("cube");
if (cube != null) {
    cube.style.transform = 'rotateX(' + gyro.pitch + 'deg) rotateY(' + gyro.yaw + 'deg) rotateZ(' + gyro.roll + 'deg)';
}
var target1 = document.getElementById("target2D");
var target2 = document.getElementById("target3D");
if (target1 != null && target2 != null) {
    target1.style.transform = 'translateX(' + accel.X + 'px) translateY(' + accel.Y + 'px)';
    target2.style.transform = 'translateY(' + '-' + accel.Z + 'px)';
}