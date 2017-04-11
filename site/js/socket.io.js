var i = 0;
var j = 1;
var prevD = new Date();
socket.on('clients', function (num) {
    if (clientChart != null) {
        var d = new Date();
        clientData.labels[j] = d.toLocaleTimeString();
        clientData.datasets[0].data[j] = {
            x: (d.getTime() - time) / 1000,
            y: num
        };
        clientChart.update();
        j++;
    }
    if (c != null) {
        c.refresh(num);
    }
});

socket.on('accel', function (value) {
    value[3] = value[3].toFixed(2);
    accel = {
        X: value[0].toFixed(1) * 100,
        Y: value[1].toFixed(1) * 100,
        Z: value[2].toFixed(1) * 40 - 30
    }
    var target1 = document.getElementById("target2D");
    var target2 = document.getElementById("target3D");
    if (target1 != null && target2 != null) {
        target1.style.transform = 'translateX(' + accel.X + 'px) translateY(' + accel.Y + 'px)';
        target2.style.transform = 'translateY(' + '-' + accel.Z + 'px)';
    }
    var d = new Date();
    if (accelChart != null && (d - prevD) > refresh) {
        accelData.labels[i] = d.toLocaleTimeString();
        accelData.datasets[0].data[i] = {
            x: (d.getTime() - time) / 1000,
            y: value[3]
        };
        accelChart.update();
        i++;
        prevD = d;
    }
    if (a != null) {
        a.refresh(value[3])
    }
});
socket.on('angle', function (value) {
    gyro = {
        pitch: value[1].toFixed(4),
        yaw: value[2].toFixed(4),
        roll: value[0].toFixed(4)
    }
    var cube = document.getElementById("cube");
    if (cube != null) {
        cube.style.transform = 'rotateX(' + gyro.pitch + 'deg) rotateY(' + gyro.yaw + 'deg) rotateZ(' + gyro.roll + 'deg)';
    }
});
socket.on('temp', function (value) {
    if (t != null) {
        t.refresh(value.toFixed(2));
    }
});
socket.on('pressure', function (value) {
    if (p != null) {
        p.refresh(value.toFixed(2));
    }
});
