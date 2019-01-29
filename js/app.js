'use strict';
<<<<<<< HEAD

var rps = document.getElementById('rps');
var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var playerWins = 0;
var turnCount = 0;



function handleClick(event){
    var compChoice = Math.ceil(Math.random(3));
  if(event.target.id === 'rps'){
    return;
  }
  if(event.target.alt === 'rock'){


    if(compChoice === 1){


    }
    if(compChoice === 2){
      turnCount++;
      if(turnCount >= 3){

        return;
      }

    }
    if(compChoice === 3) {
      playerWins++;
      turnCount++;
      if(turnCount >= 3){

        return;
      }

    }
  }
  if(event.target.alt === 'paper'){
    if(compChoice === 1){
      playerWins++;
      turnCount++;
        
      if(turnCount >= 3){
  
        return;
      }
    }
    if(compChoice === 2){

    }

  }
  if(compChoice === 3) {
    turnCount++;
    if(turnCount >= 3){
  
      return;
    }
  }
  
  if(event.target.alt === 'scissors'){
    if(compChoice === 1){
      turnCount++;
      if(turnCount >= 3){
            
        return;
      }
    }
    if(compChoice === 2){
      playerWins++;
      turnCount++;
        
      if(turnCount >= 3){
  
        return;
      }
    }
    if(compChoice === 3){
        
    }
  }
}
=======
var gameDiv = document.getElementById('rps');
var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var banner = document.getElementById('banner');
var choiceArray = [rock, paper, scissors];

function randomChoice (){
	var random =  choiceArray[Math.floor(Math.random() * choiceArray.length)].alt;
	console.log(random);
	return random;
  
}

function handleRps (){
	var userChoice = event.target.alt;
	console.log(userChoice);
	var computerChoice = randomChoice();
}

function win () {
	banner.textContent= 'You Win!';
}
function lose () {
	banner.textContent= 'You Lose!';
}
function gameOver () {
	banner.textContent= 'GAME OVER!';
}


gameDiv.addEventListener('click', handleRps);
>>>>>>> 0b80fa1c78b405f8ae24b075d8d16a74632c6afa
