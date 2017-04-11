socket.on('accel', function (value) {
    value[3] = value[3].toFixed(2);
    a.refresh(value[3])
});
socket.on('temp', function (value) {
    t.refresh(value.toFixed(2));
});
socket.on('pressure', function (value) {
    p.refresh(value.toFixed(2));
});
