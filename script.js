let userChoice
function storeValue(buttonElement)
{
    userChoice = buttonElement;

let computerChoice = getRndInteger(0,2)
let choice= ["rock","scissor","paper"]
let computerChoiceStr = choice[computerChoice]

let result = VSComputer(userChoice, computerChoiceStr)
document.getElementById("res").innerHTML =  "You chose: " + userChoice +
        "<br>Computer chose: " + computerChoiceStr +
        "<br><b>" + result + "</b>";
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function VSComputer(userChoice, computerChoiceStr)
{
if(userChoice === computerChoiceStr)
{
    return "It is a Tie!"
}
else if( (userChoice == "rock" && computerChoiceStr == "scissor") || (userChoice == "paper" && computerChoiceStr == "rock") || (userChoice == "scissor" && computerChoiceStr == "paper")){
    return "You Win!"
}
else
    return "Computer Wins!"
}
