const socket = io();

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
});


const statusText = document.getElementById("status");

socket.on("players", (count) => {
    if (count < 2) {
        statusText.innerText = "Waiting for opponent...";
    } else {
        statusText.innerText = "Opponent connected! Make your move.";
    }
});
