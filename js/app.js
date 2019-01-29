'use strict';
var gameDiv = document.getElementById('rps');
var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var banner = document.getElementById('banner');
var choiceArray = [rock, paper, scissors];

function randomChoice (){
	var random =  choiceArray[Math.floor(Math.random() * choiceArray.length)].alt;
	console.log(random);
	return random;
  
}

function handleRps (){
	var userChoice = event.target.alt;
	console.log(userChoice);
	var computerChoice = randomChoice();
}

function win () {
	banner.textContent= 'You Win!';
}
function lose () {
	banner.textContent= 'You Lose!';
}
function gameOver () {
	banner.textContent= 'GAME OVER!';
}


gameDiv.addEventListener('click', handleRps);
