'use strict';
var gameDiv = document.getElementById('rps');
var banner = document.getElementById('banner');
var winLose = document.getElementById('win-lose');
var timesWon = document.getElementById('win');
var timesLost = document.getElementById('lose');
var totalGames = document.getElementById('total-games');
var totalPlayed = 0;
var playerWins = 0;
var playerLosses = 0;
var turnCount = 0;
var playerRoundWins = 0;
var compRoundWins = 0;

function handleRps(event){

  var choiceArray = ['Rock', 'Paper', 'Scissors'];
  var userChoice = event.target.alt;
  var compChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];
  console.log('Player\'s choice', userChoice);
  console.log('Computer\'s choice', compChoice);

  function showResults(){
    gameDiv.innerHTML = '';
    var img = document.createElement('img');
    img.src = `img/${userChoice}.jpg`;
    img.alt = 'Player 1\'s Choice';
    img.title = 'Player 1\'s Choice';
    gameDiv.appendChild(img);
    img = document.createElement('img');
    img.src = `img/${compChoice}.jpg`;
    img.alt = 'Player 2\'s Choice';
    img.title = 'Player 2\'s Choice';
    gameDiv.appendChild(img);
  }

  function showChoices(){
    gameDiv.innerHTML = '';
    winLose.hidden = true;
    banner.innerHTML = 'This is where win/lose/game over goes';
    var img = document.createElement('img');
    img.src = 'img/Rock.jpg';
    img.alt = 'Rock';
    img.title = 'Rock';
    gameDiv.appendChild(img);
    img = document.createElement('img');
    img.src = 'img/Paper.jpg';
    img.alt = 'Paper';
    img.title = 'Paper';
    gameDiv.appendChild(img);
    img = document.createElement('img');
    img.src = 'img/Scissors.jpg';
    img.alt = 'Scissors';
    img.title = 'Scissors';
    gameDiv.appendChild(img);
  }

  if(userChoice === 'Player 1\'s Choice' || userChoice === 'Player 2\'s Choice'){
    showChoices();
    return;
  }

  if(event.target.id === 'rps'){
    return;
  }

  function win () {
    turnCount++;
    playerRoundWins++;
    banner.textContent = 'You Win!';
    showResults();
  }
  function lose () {
    turnCount++;
    compRoundWins++;
    banner.textContent = 'You Lose!';
    showResults();
  }
  function tie(){
    banner.textContent = 'Tied, try again!';
    showResults();
  }

  function gameOver () {
    banner.textContent = 'GAME OVER!';
    winLose.hidden = false;
    winLose.innerHTML = '';
    if(playerRoundWins > 1){
      totalPlayed++;
      playerWins++;
      timesWon.textContent = `Times Won: ${playerWins}`;
      timesLost.textContent = `Times Lost: ${playerLosses}`;
      totalGames.textContent = `Total Games: ${totalPlayed}`;
      winLose.textContent = (`You won ${playerRoundWins} to ${compRoundWins}!`);
    }
    if(playerRoundWins < 2){
      totalPlayed++;
      playerLosses++;
      timesWon.textContent = `Times Won: ${playerWins}`;
      timesLost.textContent = `Times Lost: ${playerLosses}`;
      totalGames.textContent = `Total Games: ${totalPlayed}`;
      winLose.textContent = (`You lost ${playerRoundWins} to ${compRoundWins}...`);
    }
    showResults();
    turnCount = 0;
    playerRoundWins = 0;
    compRoundWins = 0;
  }

  if(userChoice === 'Rock'){
    if(compChoice === 'Rock'){
      tie();
    }
    if(compChoice === 'Paper'){
      lose();
    }
    if(compChoice === 'Scissors') {
      win();
    }
  }
  if(userChoice === 'Paper'){
    if(compChoice === 'Rock'){
      win();
    }
    if(compChoice === 'Paper'){
      tie();
    }
    if(compChoice === 'Scissors') {
      lose();
    }
  }

  if(userChoice === 'Scissors'){
    if(compChoice === 'Rock'){
      lose();
    }
    if(compChoice === 'Paper'){
      win();
    }
    if(compChoice === 'Scissors'){
      tie();
    }
  }

  console.log('turn count:', turnCount);
  if(playerRoundWins > 1 || compRoundWins > 1){
    gameOver();
  }

}

gameDiv.addEventListener('click', handleRps);
