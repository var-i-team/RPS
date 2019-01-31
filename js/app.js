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
var compRoundWins = 0;


function handleRps(event){
  
  // var audio = new Audio('audio/drum.wav');
  // audio.play();
  var choiceArray = ['Rock', 'Paper', 'Scissors'];
  var userChoice = event.target.alt;
  var compChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];
  console.log('Player\'s choice', userChoice);
  console.log('Computer\'s choice', compChoice);

  function showResults(){
    banner.hidden = true;
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
    banner.style.display = 'none';
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
    showResults();
    banner.textContent = 'You Win!';
    var audio = new Audio('audio/win2.wav');
    setTimeout(function(){ 
      audio.play(); }
    , 3000);
    
  }
  function lose () {
    turnCount++;
    compRoundWins++;
    showResults();
    banner.textContent = 'You Lose!';
    var audio = new Audio('audio/lose.wav');
    setTimeout(function(){ 
      audio.play(); }
    , 3000);
  }
	
  function tie(){
    showResults();
    banner.textContent = 'Tied, try again!';
    var audio = new Audio('audio/balala.wav');
    setTimeout(function(){ 
      audio.play(); }
    , 3000);
  }

  function gameOver () {
    var savedTotalPlayed = JSON.parse(localStorage.getItem('totalPlayed'));
    savedTotalPlayed++;
    banner.textContent = 'GAME OVER!';
    winLose.hidden = true;
    winLose.innerHTML = '';
    

    if(playerRoundWins > 1){
      totalPlayed++;
		  playerWins++;
      timesWon.textContent = `Times Won: ${playerWins}`;
      timesLost.textContent = `Times Lost: ${playerLosses}`;
      totalGames.textContent = `Total Games: ${savedTotalPlayed}`;
      winLose.textContent = (`You won ${playerRoundWins} to ${compRoundWins}!`);
      var audio = new Audio('audio/gameover.wav');
      setTimeout(function(){
        audio.play();}
      , 4000);
    }

    if(playerRoundWins < 2){
      totalPlayed++;
	    playerLosses++;
      timesWon.textContent = `Times Won: ${playerWins}`;
      timesLost.textContent = `Times Lost: ${playerLosses}`;
      totalGames.textContent = `Total Games: ${savedTotalPlayed}`;
      winLose.textContent = (`You lost ${playerRoundWins} to ${compRoundWins}...`);
      var audio = new Audio('audio/mario_failed.wav');
      setTimeout(function(){ 
        audio.play(); 
      }
      , 4000);
    }
    
    showResults();
    
    turnCount = 0;
    playerRoundWins = 0;
    compRoundWins = 0; 
    
    // LocalStorage
    if(savedTotalPlayed!== null){
      totalPlayed = savedTotalPlayed;
      console.log('totalPlayed:', totalPlayed);
      localStorage.setItem('totalPlayed', JSON.stringify(totalPlayed));
    } else {
      totalGames.textContent = `Total Games: ${totalPlayed}`;
      localStorage.setItem('totalPlayed', JSON.stringify(totalPlayed));
    }
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
	gameDiv.style.display = 'block';
	banner.style.display = 'block';
  winLose.hidden = false;
 
}


function delayscreen(){
  i = 0;
  var audio = new Audio('audio/drum.wav');
  audio.play();
  requestAnimationFrame(animate);
}


gameDiv.addEventListener('click', handleRps);


