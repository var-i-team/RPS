'use strict';

var rps = document.getElementById('rps');
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
