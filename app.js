const five = require('johnny-five');
const Particle = require('particle-io');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var board = new five.Board({
    io: new Particle({
        token: "95157ca91ef1a5c2aeb9007ab7227004606b672c",
        deviceId: "1a0036001647353236343033"
    })
});

app.use(express.static(__dirname + '/site'));
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/site/index.html')
});

var time = new Date();
var connection = null;
var sampleCount = [1, 1];
var sampleRate = [3, 10];
var accel = [0, 0, 0, 0];
var gyro = [0, 0, 0];
var temp = 0;
var press = 0;
var clients = 0;

board.on("ready", function () {
    console.log("Device Ready..");
    var imu = new five.IMU({
        controller: "MPU6050",
        freq: 100
    });
    var multi = new five.Multi({
        controller: "BMP180",
        freq: 700
    });
    imu.on("data", function () {
        sampleCount[0]++;
        accel[0] += this.accelerometer.x;
        accel[1] += this.accelerometer.y;
        accel[2] += this.accelerometer.z;
        accel[3] += this.accelerometer.acceleration - 1;
        gyro[0] += this.accelerometer.pitch;
        gyro[1] += this.accelerometer.roll;
        gyro[2] += this.accelerometer.inclination;
        if (sampleCount[0] % sampleRate[0] == 0) {
            accel[0] = accel[0] / (sampleRate[0] - 1);
            accel[1] = accel[1] / (sampleRate[0] - 1);
            accel[2] = accel[2] / (sampleRate[0] - 1);
            accel[3] = accel[3] / (sampleRate[0] - 1);
            io.emit('accel', accel);
            gyro[0] = gyro[0] / (sampleRate[0] - 1);
            gyro[1] = gyro[1] / (sampleRate[0] - 1);
            gyro[2] = gyro[2] / (sampleRate[0] - 1);
            io.emit('angle', gyro);
            accel = [0, 0, 0, 0];
            gyro = [0, 0, 0];
            sampleCount[0] = 1;
        }
    });
    multi.on("data", function () {
        sampleCount[1]++;
        temp += this.thermometer.celsius;
        press += this.barometer.pressure;
        if (sampleCount[1] % sampleRate[1] == 0) {
            temp = temp / (sampleRate[1] - 1);
            io.emit('temp', temp);
            press = press / (sampleRate[1] - 1);
            io.emit('pressure', press);
            press = 0;
            temp = 0;
            sampleCount[1] = 1;
        }
    });
    io.on('connection', function (socket) {
        //console.log('a user connected');
        clients++;
        io.emit('clients', clients);
        socket.on('disconnect', function () {
            //console.log('user disconnected');
            clients--;
            io.emit('clients', clients);
        });
    });
});
server.listen(3000);
