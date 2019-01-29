'use strict';
var gameDiv = document.getElementById('rps');
// var rock = document.getElementById('rock');
// var paper = document.getElementById('paper');
// var scissors = document.getElementById('scissors');
var banner = document.getElementById('banner');
var playerWins = 0;
var turnCount = 0;

function handleRps(event){

  if(event.target.id === 'rps'){
    return;
  }

  var choiceArray = ['rock', 'paper', 'scissors'];
  var userChoice = event.target.alt;
  var compChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];
  console.log('player\'s choice', userChoice);
  console.log('computer\'s choice', compChoice);

  function showResults(){
    gameDiv.innerHTML = '';
    var img = document.createElement('img');
    img.src = `img/${userChoice}-results.jpg`;
    img.alt = `${userChoice}-results`;
    img.title = `${userChoice}-results`;
    gameDiv.appendChild(img);
    img = document.createElement('img');
    img.src = `img/${compChoice}-results.jpg`;
    img.alt = `${compChoice}-results`;
    img.title = `${compChoice}-results`;
    gameDiv.appendChild(img);
    return;
  }
  function showChoices(){
    gameDiv.innerHTML = '';
    banner.innerHTML = 'This is where win/lose/game over goes';
    var img = document.createElement('img');
    img.src = 'img/rock.jpg';
    img.alt = 'rock';
    img.title = 'rock';
    gameDiv.appendChild(img);
    img = document.createElement('img');
    img.src = 'img/paper.jpg';
    img.alt = 'paper';
    img.title = 'paper';
    gameDiv.appendChild(img);
    img = document.createElement('img');
    img.src = 'img/scissors.jpg';
    img.alt = 'scissors';
    img.title = 'scissors';
    gameDiv.appendChild(img);
    return;
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

  if(userChoice === 'rock-results' || userChoice === 'paper-results' || userChoice === 'scissors-results'){
    showChoices();
  }

  if(userChoice === 'rock'){
    if(compChoice === 'rock'){
      tie();
    }
    if(compChoice === 'paper'){
      turnCount++;
      if(turnCount >= 3){
        gameOver();
      }
      lose();
    }
    if(compChoice === 'scissors') {
      playerWins++;
      turnCount++;
      if(turnCount >= 3){
        gameOver();
      }
      win();
    }
  }
  if(userChoice === 'paper'){
    if(compChoice === 'rock'){
      playerWins++;
      turnCount++;
      if(turnCount >= 3){
        gameOver();
      }
      win();
    }
    if(compChoice === 'paper'){
      tie();
    }
    if(compChoice === 'scissors') {
      turnCount++;
      if(turnCount >= 3){
        gameOver();
      }
      lose();
    }
  }

  if(userChoice === 'scissors'){
    if(compChoice === 'rock'){
      turnCount++;
      if(turnCount >= 3){
        lose();
        gameOver();
      }
      lose();
    }
    if(compChoice === 'paper'){
      playerWins++;
      turnCount++;
      if(turnCount >= 3){
        win();
        gameOver();
      }
      win();
    }
    if(compChoice === 'scissors'){
      tie();
    }
  }
}

gameDiv.addEventListener('click', handleRps);
