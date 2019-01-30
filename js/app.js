'use strict';
var delayCanvas = document.getElementById('delayCanvas');
var ctx = delayCanvas.getContext('2d');
var gameDiv = document.getElementById('rps');
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
