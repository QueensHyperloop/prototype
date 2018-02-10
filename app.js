const five = require('johnny-five');
const Raspi = require("raspi-io");
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cmd = require('node-cmd');


function all_ledon() {
    cmd.run('sudo i2cset -y 1 0x70 0x00 0xff');
};

function all_ledoff() {
    cmd.run('sudo i2cset -y 1 0x70 0x00 0x00');
};

function ledon() {
    cmd.run('sudo i2cset -y 1 0x70 0x00 0x5a');
};

function led_maxgain() {
    cmd.run('sudo i2cset -y 1 0x70 0x09 0x0f');
};

function ledbright() {
    cmd.run('sudo i2cset -y 1 0x70 0x02 0x32');
    cmd.run('sudo i2cset -y 1 0x70 0x04 0x32');
    cmd.run('sudo i2cset -y 1 0x70 0x05 0x32');
    cmd.run('sudo i2cset -y 1 0x70 0x07 0x32');
};

var board = new five.Board({
    io: new Raspi()
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
    /*var imu = new five.IMU({
        controller: "MPU6050",
        freq: 100,
        address: 0x68
    });
    var multi = new five.Multi({
        controller: "BMP180",
        freq: 700,
        adress: '0x70GPIO1'
    });
    /*from data to change??
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
    });*/

    io.on('connection', function (socket) {
        //console.log('a user connected');
        clients++;
        io.emit('clients', clients);
        socket.on('disconnect', function () {
            //console.log('user disconnected');
            clients--;
            io.emit('clients', clients);
        });
        socket.on('light', function (value) {
            if (value) {
                all_ledon();
            } else {
                all_ledoff();
            }
        });
        socket.on('picture', function (value) {
            d = Math.floor(Date.now() / 100)
            cmd.run('raspistill -o /home/pi/camera/' + d);
        });
    });
});
server.listen(3000);
