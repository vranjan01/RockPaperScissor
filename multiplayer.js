const socket = io();

function sendChoice(choice) {
    socket.emit("choice", choice);
}

socket.on("result", (data) => {
    document.getElementById("res").innerHTML =
        "Opponent chose: " + data.p2Choice.toUpperCase() +
        "<br><b>" + data.result + "</b>";
});

const statusText = document.getElementById("status");

socket.on("players", (count) => {
    if (count < 2) {
        statusText.innerText = "Waiting for opponent...";
    } else {
        statusText.innerText = "Opponent connected! Make your move.";
    }
});
