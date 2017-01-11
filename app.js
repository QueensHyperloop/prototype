const five = require('johnny-five');
const Particle = require('particle-io');
const rdb = require('rethinkdb');
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
rdb.connect({
    host: 'localhost',
    port: 28015
}, function (err, conn) {
    if (err) throw err;
    connection = conn;
})
var btnDB = rdb.db('pod').table('button')

board.on("ready", function () {
    console.log("Device Ready..");
    button = new five.Button({
        board: board,
        pin: "D1",
        holdtime: 500
    });
    button.on("down", function () {
        state = true;
        console.log("down");
        io.emit('button', 1);
        btnDB.insert({
            time: time.getTime(),
            value: 1
        }).run(connection, function (err, result) {
            if (err) throw err;
        })
    })
    button.on("up", function () {
        console.log("up");
        io.emit('button', 0);
        btnDB.insert({
            time: time.getTime(),
            value: 0
        }).run(connection, function (err, result) {
            if (err) throw err;
        })
    });
    var clients = 0;
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