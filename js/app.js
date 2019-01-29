'use strict';
var gameDiv = document.getElementById('rps');
var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var banner = document.getElementById('banner');
var choiceArray = [rock, paper, scissors];
var playerWins = 0;
var turnCount = 0;



function handleRps(event){
  var userChoice = event.target;
  var compChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];
  console.log(compChoice);
  function showResults(){
    gameDiv.innerHTML = userChoice, compChoice;
    gameDiv.appendChild(userChoice);
    gameDiv.appendChild(compChoice);
  }  
  function win () {
    banner.textContent= 'You Win!';
    showResults();

  }
  function lose () {
    banner.textContent= 'You Lose!';
    showResults();
  }
  function gameOver () {
    banner.textContent= 'GAME OVER!';
    showResults();
  }
  function tie(){
    banner.textContent = 'Tied, try again!';
    showResults();
  }
  if(event.target.id === 'rps'){
    return;
  }
  if(event.target.alt === 'rock'){
    if(compChoice === 'rock'){
      return tie();

    }
    
    if(compChoice === 'paper'){
      turnCount++;
      if(turnCount >= 3){
        return gameOver();
      }
      return lose();
    }
    if(compChoice === 'scissors') {
      playerWins++;
      turnCount++;
      if(turnCount >= 3){
        return gameOver();
      }
      return win();

    }
  }
  if(event.target.alt === 'paper'){
    if(compChoice === 'rock'){
      playerWins++;
      turnCount++;
      if(turnCount >= 3){
        return gameOver();
      }
      return win();
    }
  }
  
  if(compChoice === 'paper'){
    return tie();
  }


  if(compChoice === 'scissors') {
    turnCount++;
    if(turnCount >= 3){
      return lose();
    }
  }

  if(event.target.alt === 'scissors'){
    if(compChoice === 'rock'){
      turnCount++;
      if(turnCount >= 3){
        return lose();
      }
    }
    if(compChoice === 'paper'){
      playerWins++;
      turnCount++;
      if(turnCount >= 3){
        return gameOver();
      }
      return win();
    }

    if(compChoice === 'scissors'){
      return tie();
    }
  }
}

gameDiv.addEventListener('click', handleRps);
