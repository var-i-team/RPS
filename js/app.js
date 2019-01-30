'use strict';
var delayCanvas = document.getElementById('delayCanvas');
var ctx = delayCanvas.getContext('2d');
var gameDiv = document.getElementById('rps');
var banner = document.getElementById('banner');
var winLose = document.getElementById('win-lose');
var totalPlayed = 0;
var playerWins = 0;
var turnCount = 0;
var compRoundWinds;
var playerRoundWins = 0;

function handleRps(event){

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
  }

  function showChoices(){
    gameDiv.innerHTML = '';
    winLose.hidden = true;
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
  }

  if(userChoice === 'rock-results' || userChoice === 'paper-results' || userChoice === 'scissors-results'){
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
    banner.textContent = 'You Lose!';
    showResults();
  }
  function gameOver () {
    banner.textContent = 'GAME OVER!';
    winLose.hidden = false;
    winLose.innerHTML = '';
    if(playerRoundWins > 1){
      playerWins++;
      compRoundWinds = (turnCount - playerRoundWins);
      winLose.textContent = (`You won ${playerRoundWins} to ${compRoundWinds}!`);
    }
    if(playerRoundWins < 2){
      playerWins++;
      compRoundWinds = (turnCount - playerRoundWins);
      winLose.textContent = (`You lost ${playerRoundWins} to ${compRoundWinds}...`);
    }
    showResults();
    turnCount = 0;
    playerRoundWins = 0;
    compRoundWinds = 0;
  }
  function tie(){
    banner.textContent = 'Tied, try again!';
    showResults();
  }

  if(userChoice === 'rock'){
    if(compChoice === 'rock'){
      tie();
    }
    if(compChoice === 'paper'){
      lose();
    }
    if(compChoice === 'scissors') {
      win();
    }
  }
  if(userChoice === 'paper'){
    if(compChoice === 'rock'){
      win();
    }
    if(compChoice === 'paper'){
      tie();
    }
    if(compChoice === 'scissors') {
      lose();
    }
  }

  if(userChoice === 'scissors'){
    if(compChoice === 'rock'){
      lose();
    }
    if(compChoice === 'paper'){
      win();
    }
    if(compChoice === 'scissors'){
      tie();
    }
  }

  console.log('turn count:', turnCount);
  if(turnCount > 2 || playerRoundWins > 1){
    gameOver();
  }

}

// Canvas element

var cw = delayCanvas.width;
var ch = delayCanvas.height;

var i = 0;
var texts = ['Rock', 'Paper', 'Scissors', 'Shoot!', ''];
var nextTime = 0;
var duration = 700;

var tmp_latestTime = 0;


function drawText(text){
  var px = delayCanvas.width*0.273;
  ctx.font = px + 'px Baskerville Old Face';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#000000';
  ctx.fillText(text,delayCanvas.width-15,delayCanvas.height * 0.86);
}


function animate(time){
  tmp_latestTime = time;
  // console.log(“time:” + time + “\t nextTime:” + nextTime);

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
  delayCanvas.style.display = 'none'
}


function delayscreen(){
  i = 0;
  requestAnimationFrame(animate);
}

gameDiv.addEventListener('click', handleRps);
