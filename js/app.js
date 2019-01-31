'use strict';

var gameDiv = document.getElementById('rps');
var banner = document.getElementById('banner');
var rounds = document.getElementById('rounds');
var playAgain = document.getElementById('play-again');
var bestOf = document.getElementById('best-of');
var timesWon = document.getElementById('win');
var timesLost = document.getElementById('lose');
var totalGames = document.getElementById('total-games');

var delayCanvas = document.getElementById('delay-canvas');
var canvas = document.getElementById('canvas');
var ctx = delayCanvas.getContext('2d');

var totalPlayed = 0;
var playerWins = 0;
var playerLosses = 0;
var maxRounds = 3;
var playerOneRoundWins = 0;
var playerTwoRoundWins = 0;

function showChoices(){
  banner.innerHTML = 'Plan your throw!';
  gameDiv.innerHTML = '';
  gameDiv.style.display = 'flex';
  banner.style.display = 'flex';
  bestOf.style.display = 'block';
  bestOf.textContent = `Best of ${maxRounds}`;
  playAgain.style.display = 'none';
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

function handleRps(event) {
  var choiceArray = ['Rock', 'Paper', 'Scissors'];
  var userChoice = event.target.alt;
  var compChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];

  var cw = delayCanvas.width;
  var ch = delayCanvas.height;

  var i = 0;
  var texts = ['Rock', 'Paper', 'Scissors', 'Shoot!', ''];
  var nextTime = 0;
  var duration = 700;

  function showResults(){
    banner.style.display = 'none';
    playAgain.style.display = 'none';
    gameDiv.style.display = 'none';
    delayscreen();
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

  function win () {
    playerOneRoundWins++;
    banner.textContent = 'You Win!';
  }
  function lose () {
    playerTwoRoundWins++;
    banner.textContent = 'You Lose!';
  }
  function tie(){
    banner.textContent = 'Tied, try again!';
  }

  function gameOver () {
    banner.innerHTML = '';
    banner.style.display = 'flex';
    bestOf.style.display = 'none';
    playAgain.style.display = 'block';
    playAgain.textContent = `To make it best of ${(maxRounds + 2)} choose your next move, or click here to start a new game!`;
    if((playerOneRoundWins * 2) > maxRounds){
      banner.textContent = (`You won ${playerOneRoundWins} to ${playerTwoRoundWins}!`);
    }
    if((playerTwoRoundWins * 2) > maxRounds){
      banner.textContent = (`You lost ${playerOneRoundWins} to ${playerTwoRoundWins}...`);
    }
  }

  function drawText(text){
    var px = delayCanvas.width*0.273;
    ctx.font = px + 'px Baskerville Old Face';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    ctx.fillText(text,delayCanvas.width-15,delayCanvas.height * 0.86);
  }

  function animate(time){
    banner.style.display = 'flex';
    banner.textContent = 'Ready...';
    canvas.style.display = 'flex';
    delayCanvas.style.display = 'block';
    if(time<nextTime){
      requestAnimationFrame(animate);
      return;
    }
    nextTime= time + duration;
    ctx.clearRect(0,0,cw,ch);

    drawText(texts[i]);
    i++;
    if(i<texts.length){
      requestAnimationFrame(animate);
      return;
    }
    canvas.style.display = 'none';
    banner.style.display = 'flex';
    gameDiv.style.display = 'flex';

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

    if((playerOneRoundWins * 2) > maxRounds || (playerTwoRoundWins * 2) > maxRounds){
      gameOver();
    }
  }

  function delayscreen(){
    i = 0;
    requestAnimationFrame(animate);
  }

  if(event.target.id === 'rps' || userChoice === 'Player 1\'s Choice' || userChoice === 'Player 2\'s Choice'){
    if((playerOneRoundWins * 2) > maxRounds || (playerTwoRoundWins * 2) > maxRounds){
      maxRounds += 2;
    }
    showChoices();
    return;
  }

  if(userChoice === 'Rock' || userChoice === 'Paper' || userChoice === 'Scissors') {
    showResults();
  }
  // if(userChoice === 'Rock'){
  //   if(compChoice === 'Rock'){
  //     tie();
  //   }
  //   if(compChoice === 'Paper'){
  //     lose();
  //   }
  //   if(compChoice === 'Scissors') {
  //     win();
  //   }
  // }
  // if(userChoice === 'Paper'){
  //   if(compChoice === 'Rock'){
  //     win();
  //   }
  //   if(compChoice === 'Paper'){
  //     tie();
  //   }
  //   if(compChoice === 'Scissors') {
  //     lose();
  //   }
  // }
  // if(userChoice === 'Scissors'){
  //   if(compChoice === 'Rock'){
  //     lose();
  //   }
  //   if(compChoice === 'Paper'){
  //     win();
  //   }
  //   if(compChoice === 'Scissors'){
  //     tie();
  //   }
  // }
}

function handlePlayAgain(event) {
  console.log(event.target.id);
  if(event.target.id === 'play-again') {
    totalPlayed++;
    if((playerOneRoundWins * 2) > maxRounds){
      playerWins++;
    }
    if((playerTwoRoundWins * 2) > maxRounds){
      playerLosses++;
    }
    timesWon.textContent = `Times Won: ${playerWins}`;
    timesLost.textContent = `Times Lost: ${playerLosses}`;
    totalGames.textContent = `Total Games: ${totalPlayed}`;
    maxRounds = 3;
    playerOneRoundWins = 0;
    playerTwoRoundWins = 0;
    showChoices();
    return;
  }
}

gameDiv.addEventListener('click', handleRps);
rounds.addEventListener('click', handlePlayAgain);
