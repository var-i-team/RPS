'use strict';

var form = document.getElementById('form');
var game = document.getElementById('game');
var gameDiv = document.getElementById('rps');
var banner = document.getElementById('banner');
var rounds = document.getElementById('rounds');
var playAgain = document.getElementById('play-again');
var bestOf = document.getElementById('best-of');
var totalWins = document.getElementById('total-wins');
var totalLoses = document.getElementById('total-loses');
var totalGames = document.getElementById('total-games');
var roundWins = document.getElementById('current-wins');
var roundLoses = document.getElementById('current-loses');
var delayCanvas = document.getElementById('delay-canvas');
var canvas = document.getElementById('canvas');
var ctx = delayCanvas.getContext('2d');

var playerName;
var totalPlayed = 0;
var playerWins = 0;
var playerLosses = 0;
var rpsChoices = [];
var savedTotalPlayed = 0;
var maxRounds = 3;
var playerOneRoundWins = 0;
var playerTwoRoundWins = 0;

function RPS(name, beats, losesTo) {
  this.name = name;
  this.filepath = `img/${name}.jpg`;
  this.beats = beats;
  this.losesTo = losesTo;
  rpsChoices.push(this);
}

new RPS('Rock', 'Scissors', 'Paper');
new RPS('Paper', 'Rock', 'Scissors');
new RPS('Scissors', 'Paper', 'Rock');


function showChoices(){
  banner.innerHTML = `${playerName}, plan your throw !`;
  gameDiv.innerHTML = '';
  gameDiv.style.display = 'flex';
  banner.style.display = 'flex';
  bestOf.style.display = 'block';
  bestOf.textContent = `Best of ${maxRounds}`;
  playAgain.style.display = 'none';
  for(var i = 0; i < rpsChoices.length; i++){
    var img = document.createElement('img');
    img.src = rpsChoices[i].filepath;
    img.alt = rpsChoices[i].name;
    img.title = rpsChoices[i].name;
    gameDiv.appendChild(img);
  }
}

function letMeWin(given){
  if(given === 'Rock'){
    return 'Scissors';
  }else if(given === 'Paper'){
    return 'Rock';
  }else{
    return 'Paper';
  }

}

function handleRps(event) {
  var playerOneChoice = event.target.alt;
  var playerTwoChoice = rpsChoices[Math.floor(Math.random() * rpsChoices.length)].name;
  var canvasWidth = delayCanvas.width;
  var canvasHeight = delayCanvas.height;
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
    img.src = `img/${playerOneChoice}.jpg`;
    img.alt = 'Player 1\'s Choice';
    img.title = 'Player 1\'s Choice';
    gameDiv.appendChild(img);
    img = document.createElement('img');
    img.src = 'img/VS.jpg';
    img.alt = 'VS';
    img.title = 'VS';
    gameDiv.appendChild(img);
    img = document.createElement('img');
    img.src = `img/${playerTwoChoice}.jpg`;
    img.alt = 'Player 2\'s Choice';
    img.title = 'Player 2\'s Choice';
    gameDiv.appendChild(img);
  }

  function win () {
    playerOneRoundWins++;
    banner.textContent = `${playerName} WINS !`;
    if((playerOneRoundWins * 2) < maxRounds || (playerTwoRoundWins * 2) < maxRounds) {
      var audio = new Audio('audio/win2.wav');
      audio.play();
    }
  }
  function lose () {
    playerTwoRoundWins++;
    banner.textContent = `${playerName} loses...`;
    if((playerOneRoundWins * 2) < maxRounds || (playerTwoRoundWins * 2) < maxRounds) {
      var audio = new Audio('audio/lose.wav');
      audio.play();
    }
  }
  function tie() {
    banner.textContent = 'Tie ! Go again !';
    if((playerOneRoundWins * 2) < maxRounds || (playerTwoRoundWins * 2) < maxRounds) {
      var audio = new Audio('audio/balala.wav');
      audio.play();
    }
  }

  function gameOver() {
    banner.innerHTML = '';
    banner.style.display = 'flex';
    bestOf.style.display = 'none';
    playAgain.style.display = 'block';
    playAgain.textContent = `To make it best of ${(maxRounds + 2)} choose your next move, or click here to start a new game !`;
    if((playerOneRoundWins * 2) > maxRounds){
      banner.textContent = (`${playerName} won ${playerOneRoundWins} to ${playerTwoRoundWins} !`);
      var audio = new Audio('audio/gameover.wav');
      audio.play();
    }
    if((playerTwoRoundWins * 2) > maxRounds){
      banner.textContent = (`${playerName} lost ${playerOneRoundWins} to ${playerTwoRoundWins}...`);
      audio = new Audio('audio/mario_failed.wav');
      audio.play();
    }
  }

  function drawText(text){
    var px = delayCanvas.width * 0.26;
    ctx.fillStyle = '#99AB99';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = px + 'px \'Yellowtail\', cursive, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    ctx.fillText(text, delayCanvas.width - 15, delayCanvas.height * 0.86);
  }

  function animate(time){
    banner.style.display = 'flex';
    banner.textContent = 'Ready...';
    canvas.style.display = 'flex';
    delayCanvas.style.display = 'block';
    if(time < nextTime){
      requestAnimationFrame(animate);
      return;
    }
    nextTime = time + duration;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawText(texts[i]);
    i++;
    if(i < texts.length){
      requestAnimationFrame(animate);
      return;
    }
    canvas.style.display = 'none';
    banner.style.display = 'flex';
    gameDiv.style.display = 'flex';

    if(playerOneChoice === playerTwoChoice) {
      tie();
      console.log('tie');
    }

    for(var j = 0; j < rpsChoices.length; j++) {
      if(playerOneChoice === rpsChoices[j].name && playerTwoChoice === rpsChoices[j].beats) {
        win();
      } else if(playerOneChoice === rpsChoices[j].name && playerTwoChoice === rpsChoices[j].losesTo) {
        lose();
      }
    }

    roundWins.textContent = `Current Round Wins: ${playerOneRoundWins}`;
    roundLoses.textContent = `Current Round Loses: ${playerTwoRoundWins}`;

    if((playerOneRoundWins * 2) > maxRounds || (playerTwoRoundWins * 2) > maxRounds){
      gameOver();
    }
  }

  function delayscreen(){
    var audio = new Audio('audio/drum.wav');
    audio.play();
    requestAnimationFrame(animate);
  }

  if(event.target.id === 'rps' || playerOneChoice === 'Player 1\'s Choice' ||playerOneChoice === 'VS' || playerOneChoice === 'Player 2\'s Choice'){
    if((playerOneRoundWins * 2) > maxRounds || (playerTwoRoundWins * 2) > maxRounds){
      maxRounds += 2;
    }
    showChoices();
    return;
  }

  if(playerOneChoice === 'Rock' || playerOneChoice === 'Paper' || playerOneChoice === 'Scissors') {
    showResults();
  }
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
    totalWins.textContent = `Total Wins: ${playerWins}`;
    totalLoses.textContent = `Total Loses: ${playerLosses}`;
    totalGames.textContent = `Total Games: ${totalPlayed}`;
    maxRounds = 3;
    playerOneRoundWins = 0;
    playerTwoRoundWins = 0;
    roundWins.textContent = `Current Round Wins: ${playerOneRoundWins}`;
    roundLoses.textContent = `Current Round Loses: ${playerTwoRoundWins}`;

    localStorage.setItem(playerName, JSON.stringify(playerWins + "_" + playerLosses));
    showChoices();
    return;
  }
}

function startGame(event) {
  console.log(event.target);
  event.preventDefault();

  if(event.target.name.value === null) {
    return;
  }

  playerName = event.target.name.value;
  banner.innerHTML = `${playerName}, plan your throw !`;
  form.style.display = 'none';
  game.style.display = 'block';

  var cachedPlayerData = localStorage.getItem(playerName);
  if(cachedPlayerData !== null){
    var tmpPlayerDataArray = cachedPlayerData.replace("\"","").split("_");
    playerWins = parseInt(tmpPlayerDataArray[0]);
    playerLosses = parseInt(tmpPlayerDataArray[1]);
    totalPlayed = playerWins + playerLosses;
    totalWins.textContent = `Total Wins: ${playerWins}`;
    totalLoses.textContent = `Total Loses: ${playerLosses}`;
    totalGames.textContent = `Total Games: ${totalPlayed}`;
  }

}

roundWins.textContent = `Current Round Wins: ${playerOneRoundWins}`;
roundLoses.textContent = `Current Round Loses: ${playerTwoRoundWins}`;

form.addEventListener('submit', startGame);
gameDiv.addEventListener('click', handleRps);
rounds.addEventListener('click', handlePlayAgain);
