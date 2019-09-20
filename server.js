const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const KbbGame = require('./kbb-game');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (sock) => {

    if (waitingPlayer) {
        new KbbGame(waitingPlayer, sock);
        waitingPlayer = null;
    } else {
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'Waiting for opponent to connect...');
    }

    sock.on('message', (text) => {
        io.emit('message', text);
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(process.env.PORT || 5000, function () {
    console.log("Server started");
});