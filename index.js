var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var host = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 8080;

var sounds = [
    "PartyHornSound",
    "CowMoo",
    "TrainHonkHornClear",
    "FogHorn",
    "AirHorn",
    "TrainHornLow",
    "BoatHorn",
    "GlassPing",
    "RobotBlip",
    "RobotBlip2",
    "Ting",
    "MarioJumping",
    "ElevatorDing",
    "AirPlaneDing",
]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function emitRandomSound() {
    randomSound = sounds[getRandomInt(0, sounds.length - 1)];
    console.log(randomSound);
    io.emit('sound', randomSound);
}

function emitRandomSoundLoop() {
    setTimeout(
        function() {
            emitRandomSound();
            emitRandomSoundLoop();
        },
        getRandomInt(0, 10000)
    );
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('connection client ' + socket.id)
});

http.listen(port, host, function(){
    console.log('listening on ' + host + ':' + port);
    for(i=0; i<5; i++) {
        emitRandomSoundLoop();
    }
});
