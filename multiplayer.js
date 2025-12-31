const socket = io();
let rematchVotes = 0;


socket.on("full", () => {
    document.getElementById("status").innerText =
        "Game is full. Please try again later.";
});

let hasPlayed = false;

function sendChoice(choice) {
    socket.emit("choice", choice);
}

socket.on("result", (data) => {
    document.getElementById("res").innerHTML = `
        You chose: <b>${data.you.toUpperCase()}</b><br>
        Opponent chose: <b>${data.opponent.toUpperCase()}</b><br><br>
        <b>${data.result}</b>
    `;
    document.getElementById("rematchBtn").style.display = "inline-block";
});

function requestRematch() {
    socket.emit("rematch");
}

socket.on("rematchStart", () => {
    document.getElementById("res").innerHTML = "";
    document.getElementById("status").innerText = "New round! Make your move.";
    document.getElementById("rematchBtn").style.display = "none";
});


const statusText = document.getElementById("status");

socket.on("players", (count) => {
    if (count < 2) {
        statusText.innerText = "Waiting for opponent...";
    } else {
        statusText.innerText = "Opponent connected! Make your move.";
    }
});
