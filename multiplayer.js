const socket = io();

function sendChoice(choice) {
    socket.emit("choice", choice);
}

socket.on("result", (data) => {
    document.getElementById("res").innerHTML =
        "Opponent chose: " + data.p2Choice.toUpperCase() +
        "<br><b>" + data.result + "</b>";
});
