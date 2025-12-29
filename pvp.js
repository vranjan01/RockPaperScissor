let player1Choice = "";
let player2Choice = "";
let player1Score = 0;
let player2Score = 0;
let moves = 0;
const maxMoves = 10;
let currentPlayer = 1;

function makeChoice(choice) {

    if (currentPlayer === 1) {
        player1Choice = choice;
        currentPlayer = 2;
        document.getElementById("turn").innerText = "Player 2's Turn";
        return;
    }

    player2Choice = choice;
    moves++;

    const roundResult = MultiPlayer(player1Choice, player2Choice);

    if (roundResult === "Player 1 Wins!") player1Score++;
    if (roundResult === "Player 2 Wins!") player2Score++;

    document.getElementById("p1-score").innerText = "Player 1: " + player1Score;
    document.getElementById("p2-score").innerText = "Player 2: " + player2Score;
    document.getElementById("moves").innerText = "Moves Left: " + (maxMoves - moves);

    document.getElementById("result").innerText =
        "Player 1 chose: " + player1Choice +
        "\nPlayer 2 chose: " + player2Choice +
        "\n" + roundResult;

    if (moves >= maxMoves) {
        gameOver();
        return;
    }

    currentPlayer = 1;
    document.getElementById("turn").innerText = "Player 1's Turn";
}

function MultiPlayer(player1, player2) {

    if (player1 === player2) return "It's a TIE!";

    if (
        (player1 === "rock" && player2 === "scissor") ||
        (player1 === "paper" && player2 === "rock") ||
        (player1 === "scissor" && player2 === "paper")
    ) return "Player 1 Wins!";

    return "Player 2 Wins!";
}

function gameOver() {
    let finalText = "";

    if (player1Score > player2Score) finalText = "Player 1 Won The Game!";
    else if (player2Score > player1Score) finalText = "Player 2 Won The Game!";
    else finalText = "It's a Tie!";

    document.querySelector(".final-result").innerText = finalText;

    document.getElementById("turn").innerText = "Game Over";
    document.querySelector(".reload").style.display = "inline-block";
}

function restartGame() {
    player1Choice = "";
    player2Choice = "";
    player1Score = 0;
    player2Score = 0;
    moves = 0;
    currentPlayer = 1;

    document.getElementById("turn").innerText = "Player 1's Turn";
    document.getElementById("p1-score").innerText = "Player 1: 0";
    document.getElementById("p2-score").innerText = "Player 2: 0";
    document.getElementById("moves").innerText = "Moves Left: 10";
    document.getElementById("result").innerText = "";
    document.querySelector(".final-result").innerText = "";
    document.querySelector(".reload").style.display = "none";
}
