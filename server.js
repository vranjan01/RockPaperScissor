const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const os = require("os");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

function getLocalIP() {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === "IPv4" && !net.internal) {
                return net.address;
            }
        }
    }
    return "localhost";
}

const PORT = 5000;

let players = [];
let choices = {};

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    //  Block extra players
    if (players.length >= 2) {
        socket.emit("full");
        return;
    }

    //  Allow only first 2 players
    players.push(socket.id);

    io.emit("players", players.length);

    socket.on("choice", (choice) => {
        if (!players.includes(socket.id)) return;
        if (choices[socket.id]) return;

        choices[socket.id] = choice;

        if (Object.keys(choices).length === 2) {
            const [p1, p2] = players;
            const result = decideWinner(choices[p1], choices[p2]);

            io.to(p1).emit("result", {
                you: choices[p1],
                opponent: choices[p2],
                result:
                    result === "Player 1 Wins!" ? "You Win!" :
                    result === "Player 2 Wins!" ? "You Lose!" :
                    "It's a Tie!"
            });

            io.to(p2).emit("result", {
                you: choices[p2],
                opponent: choices[p1],
                result:
                    result === "Player 2 Wins!" ? "You Win!" :
                    result === "Player 1 Wins!" ? "You Lose!" :
                    "It's a Tie!"
            });

            choices = {};
        }
    });

    socket.on("disconnect", () => {
        players = players.filter(id => id !== socket.id);
        delete choices[socket.id];
        io.emit("players", players.length);
    });
});


function decideWinner(a, b) {
    if (a === b) return "It's a Tie!";
    if (
        (a === "rock" && b === "scissor") ||
        (a === "paper" && b === "rock") ||
        (a === "scissor" && b === "paper")
    ) return "Player 1 Wins!";
    return "Player 2 Wins!";
}




server.listen(PORT, "0.0.0.0", () => {
    const IP = getLocalIP();
    console.log(`Server running at http://${IP}:${PORT}`);
});