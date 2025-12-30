const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

let players = [];
let choices = {};

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    if (players.length < 2) {
        players.push(socket.id);
    }

    io.emit("players", players.length);

    socket.on("choice", (choice) => {
        if (!players.includes(socket.id)) return;

        choices[socket.id] = choice;

        if (Object.keys(choices).length === 2) {
            const p1 = players[0];
            const p2 = players[1];

            const result = decideWinner(choices[p1], choices[p2]);

            io.emit("result", {
                p1Choice: choices[p1],
                p2Choice: choices[p2],
                result
            });

            // reset for next round
            choices = {};
        }
    });

    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);

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

server.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
});
