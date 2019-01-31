'use strict';
var delayCanvas = document.getElementById('delayCanvas');
var ctx = delayCanvas.getContext('2d');

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
var opponentRoundWins = 0;

function handleRps(event){

  var choiceArray = ['Rock', 'Paper', 'Scissors'];
  var userChoice = event.target.alt;
  var compChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];

  function showResults(){
    banner.style.display = 'none';
    winLose.style.display = 'none';
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

  function showChoices(){
    banner.innerHTML = 'Plan your throw!';
    gameDiv.innerHTML = '';
    gameDiv.style.display = 'flex';
    banner.style.display = 'flex';
    winLose.style.display = 'none';
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

  if(event.target.id === 'rps' || userChoice === 'Player 1\'s Choice' || userChoice === 'Player 2\'s Choice'){
    showChoices();
    return;
  }

  function win () {
    turnCount++;
    playerRoundWins++;
    showResults();
    banner.textContent = 'You Win!';
  }
  function lose () {
    turnCount++;
    opponentRoundWins++;
    showResults();
    banner.textContent = 'You Lose!';
  }
  function tie(){
    showResults();
    banner.textContent = 'Tied, try again!';
  }

  function gameOver () {
    winLose.innerHTML = '';
    if(playerRoundWins > 1){
      totalPlayed++;
      playerWins++;
      timesWon.textContent = `Times Won: ${playerWins}`;
      timesLost.textContent = `Times Lost: ${playerLosses}`;
      totalGames.textContent = `Total Games: ${totalPlayed}`;
      winLose.textContent = (`You won ${playerRoundWins} to ${opponentRoundWins}!`);
    }
    if(playerRoundWins < 2){
      totalPlayed++;
      playerLosses++;
      timesWon.textContent = `Times Won: ${playerWins}`;
      timesLost.textContent = `Times Lost: ${playerLosses}`;
      totalGames.textContent = `Total Games: ${totalPlayed}`;
      winLose.textContent = (`You lost ${playerRoundWins} to ${opponentRoundWins}...`);
    }
    // showResults();
    banner.textContent = 'Click to play again!';
    winLose.style.display = 'flex';
    turnCount = 0;
    playerRoundWins = 0;
    opponentRoundWins = 0;
  }

  // Canvas element

  var cw = delayCanvas.width;
  var ch = delayCanvas.height;

  var i = 0;
  var texts = ['Rock', 'Paper', 'Scissors', 'Shoot!', ''];
  var nextTime = 0;
  var duration = 700;

  // var tmp_latestTime = 0;

  function drawText(text){
    var px = delayCanvas.width*0.273;
    ctx.font = px + 'px Baskerville Old Face';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    ctx.fillText(text,delayCanvas.width-15,delayCanvas.height * 0.86);
  }

  function animate(time){
    // tmp_latestTime = time;
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
    delayCanvas.style.display = 'none';
    banner.style.display = 'flex';
    gameDiv.style.display = 'flex';
    if(playerRoundWins > 1 || opponentRoundWins > 1){
      gameOver();
    }
  }

  function delayscreen(){
    i = 0;
    requestAnimationFrame(animate);
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

  // if(playerRoundWins > 1 || opponentRoundWins > 1){
  //   gameOver();
  // }


}

// // Canvas element

// var cw = delayCanvas.width;
// var ch = delayCanvas.height;

// var i = 0;
// var texts = ['Rock', 'Paper', 'Scissors', 'Shoot!', ''];
// var nextTime = 0;
// var duration = 700;

// var tmp_latestTime = 0;


// function drawText(text){
//   var px = delayCanvas.width*0.273;
//   ctx.font = px + 'px Baskerville Old Face';
//   ctx.textAlign = 'right';
//   ctx.fillStyle = '#000000';
//   ctx.fillText(text,delayCanvas.width-15,delayCanvas.height * 0.86);
// }


// function animate(time){
//   tmp_latestTime = time;
//   delayCanvas.style.display = 'block';
//   if(time<nextTime){
//     requestAnimationFrame(animate);
//     return;
//   }
//   nextTime= time + duration;
//   ctx.clearRect(0,0,cw,ch);

//   drawText(texts[i]);
//   i++;
//   if(i<texts.length){
//     requestAnimationFrame(animate);
//     return;
//   }
//   delayCanvas.style.display = 'none';
//   banner.style.display = 'flex';
//   gameDiv.style.display = 'flex';
//   if(playerRoundWins > 1 || opponentRoundWins > 1){
//     gameOver();
//   }
// }


// function delayscreen(){
//   i = 0;
//   requestAnimationFrame(animate);
// }

gameDiv.addEventListener('click', handleRps);


