'use strict';
var gameDiv = document.getElementById('rps');

function randomChoice (){
  var random =  Math.floor(Math.random() * (3 - 0) + 0);
  console.log(random);
}

function handleRps (){
	
}


gameDiv.addEventListener('click', handleRps);
