const socket = io("http://10.165.46.118:4000");

function sendChoice(choice) {
    socket.emit("choice", choice);
}

socket.on("result", (data) => {
    document.getElementById("res").innerHTML = `
        You chose: <b>${data.p1Choice.toUpperCase()}</b><br>
        Opponent chose: <b>${data.p2Choice.toUpperCase()}</b><br><br>
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
