'use strict';

var rps = document.getElementById('rps');
var playerWins = 0;
var turnCount = 0;


function handleClick(event){
  if(event.target.id === 'rps'){
    return;
  }
  if(event.target.alt === 'rock'){
    var compChoice = Math.ceil(Math.random(3));
    // var playerChoice = 1;

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
      var compChoice = Math.ceil(Math.random(3));
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

