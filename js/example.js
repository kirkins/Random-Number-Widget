/*
Virtual Highschool - Random Number Component
By: Philip Richard Kirkbride
October 19th, 2016
*/

// Define html elements that already exist
var gameTime = document.getElementById("gameTime");
var startButton = document.getElementById("startButton");
var instructions = document.getElementById("instructions");
var balloons = document.getElementsByClassName("balloon");

// Get information on window width and height
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;

// other variables
var balloonsClicked = 0;

// Function to start game
function startGame(){
  startButton.style.display="none";
  instructions.style.display="none";
  // game timer for progress bar game ends when full
  var gameTimer = window.setInterval(function(){
    gameTime.setAttribute("aria-valuenow", parseInt(gameTime.getAttribute("aria-valuenow"))+1);
    gameTime.style.width = gameTime.getAttribute("aria-valuenow") + "%";
    if(parseInt(gameTime.getAttribute("aria-valuenow")) > 100)
      clearInterval(gameTimer);
  }, 300);

  // start the balloon loops
  var balloonTimer = window.setInterval(function(){
    for (var i = 0; i < balloons.length; i++) {
      balloonLoop(balloons[i]);
    }
    // The following runs when the game ends and resets everything to starting position
    if(parseInt(gameTime.getAttribute("aria-valuenow")) > 100){
      clearInterval(balloonTimer);
      for (var i = 0; i < balloons.length; i++) {
        balloons[i].style.display = "none";
      }
      gameTime.setAttribute("aria-valuenow", 1);
      gameTime.style.width = "1%";
      startButton.style.display="inline";
      instructions.style.display="inline";
      alert("nice work you clicked " + balloonsClicked + " ballons.");
      balloonsClicked = 0;
    }
  }, 300);

  for (var i = 0; i < balloons.length; i++) {
    balloons[i].style.bottom=i*-190+"px";
    balloons[i].style.left=(Math.floor(width/20)*(Math.floor(Math.random()*(15-1+1)+1))+"px");
    balloons[i].style.display="inline";
    balloons[i].style["filter"]="hue-rotate("+36*(Math.floor(Math.random()*(10-1+1)+1))+"deg) saturate("+Math.floor(Math.random()*(3-1+1)+1)+")";
    balloons[i].addEventListener('click', balloonPop, false);
  }
}

// Make balloon float up the screen
function balloonLoop(balloon){
  // move balloons up with random variation in speed
  if(parseInt(balloon.style.bottom)>height){
   balloon.style.bottom="0px";
   // random color generator rotates color of balloon between 36 and 360 degrees
   balloons[i].style["filter"]="hue-rotate("+36*(Math.floor(Math.random()*(10-1+1)+1))+"deg) saturate("+Math.floor(Math.random()*(3-1+1)+1)+")";
  }
  balloon.style.bottom=parseInt(balloon.style.bottom, 10)+(5*Math.floor(Math.random()*(10-1+1)+1))+"px";
}

// When a balloon pops move it to the bottom with a new X coorinate and change the color
function balloonPop(){
  balloonsClicked++;
  this.style.bottom="0px";
  this.style.left=(Math.floor(width/20)*(Math.floor(Math.random()*(15-1+1)+1))+"px");
  this.style["filter"]="hue-rotate("+36*(Math.floor(Math.random()*(10-1+1)+1))+"deg) saturate("+Math.floor(Math.random()*(3-1+1)+1)+")";
}

// Add event listener to startGame button
startButton.addEventListener('click', startGame, false);
