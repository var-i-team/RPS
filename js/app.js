'use strict';
var gameDiv = document.getElementById('rps');
var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var banner = document.getElementById('banner');
var choiceArray = [rock, paper, scissors];

function randomChoice (){
  var random =  choiceArray[Math.floor(Math.random() * choiceArray.length)];
  console.log(random);
  return random;
}

function handleRps (){
  var userChoice = event.target;
  console.log(userChoice);
  var computerChoice = randomChoice();
  win();
}

function win () {
  banner.textContent = 'You Win!';
  showResults();
}
function lose () {
  banner.textContent = 'You Lose!';
  showResults();
}
function gameOver () {
  banner.textContent = 'GAME OVER!';
  showResults();
}


function showResults(){
  var userChoice = event.target;
  var computerChoice = randomChoice();
  gameDiv.innerHTML = userChoice, computerChoice;
  gameDiv.appendChild(userChoice);
  gameDiv.appendChild(computerChoice);
}

gameDiv.addEventListener('click', handleRps);
