'use strict';
var delayCanvas = document.getElementById('delayCanvas');
var ctx = delayCanvas.getContext('2d');
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

// Canvas element

var cw=delayCanvas.width;
var ch=delayCanvas.height;

var i=0;
var texts=['Rock', 'Paper', 'Scissors', 'Shoot'];
var nextTime=0;
var duration=700;

requestAnimationFrame(animate);

function animate(time){
  if(time<nextTime){ requestAnimationFrame(animate); return;}
  nextTime+=duration;
  ctx.clearRect(0,0,cw,ch);
  drawText(texts[i]);
  i++;
  if(i<texts.length){ requestAnimationFrame(animate); }
}

function drawText(text){
  var px=delayCanvas.width*0.273;
  ctx.font = px + 'px Baskerville Old Face';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#000000';
  ctx.fillText(text,delayCanvas.width-15,delayCanvas.height * 0.86);
}


gameDiv.addEventListener('click', handleRps);
