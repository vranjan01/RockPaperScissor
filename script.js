let userChoice;
let playerScore = 0;
let computerScore = 0;
let moves = 0;

function storeValue(choice) {
    userChoice = choice;


    if (moves >= 10) return;

    moves++;
    document.getElementById("moves").innerText = "Moves Left: " + (10 - moves);

    let computerChoice = getRndInteger(0, 2);
    let choices = ["rock", "scissor", "paper"];
    let computerChoiceStr = choices[computerChoice];

    let result = VSComputer(userChoice, computerChoiceStr);

    if (result === "You Win!") {
        playerScore++;
    } else if (result === "Computer Wins!") {
        computerScore++;
    }

    document.getElementById("p-score").innerText = "Player Score: " + playerScore;
    document.getElementById("c-score").innerText = "Computer Score: " + computerScore;

    document.getElementById("res").innerHTML =
        "You chose: " + userChoice +
        "<br>Computer chose: " + computerChoiceStr 

    if (moves === 10) {
        gameOver();
    }

let result = VSComputer(userChoice, computerChoiceStr)
document.getElementById("res").innerHTML =  "You chose: " + userChoice.toUpperCase() +
        "<br>Computer chose: " + computerChoiceStr.toUpperCase() +
        "<br><b>" + result + "</b>";
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function VSComputer(userChoice, computerChoiceStr) {
    if (userChoice === computerChoiceStr) {
        return "It is a Tie!";
    }
    else if (
        (userChoice === "rock" && computerChoiceStr === "scissor") ||
        (userChoice === "paper" && computerChoiceStr === "rock") ||
        (userChoice === "scissor" && computerChoiceStr === "paper")
    ) {
        return "You Win!";
    }
    else {
        return "Computer Wins!";
    }
}

function gameOver() {
    
    let finalResult = "";

    if (playerScore > computerScore) finalResult = "You Won The Game!";
    else if (playerScore < computerScore) finalResult = "You Lost The Game!";
    else finalResult = "It's a Tie!";

    document.getElementById("res").innerHTML += "<br><br><b>" + finalResult + "</b>";
    
}

