//let userChoice = String
let computerChoice = getRndInteger(1,3)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
let choice= ["rock","scissors","paper"]
let computerChoiceStr = choice[computerChoice]
function VSComputer()
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
