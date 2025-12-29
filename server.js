const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

let players = {};

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    socket.on("choice", (choice) => {
        players[socket.id] = choice;

        if (Object.keys(players).length === 2) {
            const [p1, p2] = Object.keys(players);

            const result = decideWinner(players[p1], players[p2]);

            io.emit("result", {
                p1Choice: players[p1],
                p2Choice: players[p2],
                result
            });

            players = {};
        }
    });

    socket.on("disconnect", () => {
        delete players[socket.id];
    });
});

function decideWinner(a, b) {
    if (a === b) return "Tie!";
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
