
//----------------------GAME BOARD-----------------------

var playerTurn = true;
var reset = true;
var scores = {player1:0, player2:0};
var square = []; // Create an empty array to store squares
function load() {

  if (reset == true) {
    //For-Loop to create and reset all the squares when the game starts
    for (var i = 0; i < 9; i++) {
      square[i] = new Square(i); //Gives the function "Square" the number of the square
    }
    reset = false;
  }
}

// Define a constructor function for square objects
function Square(sqrNum) {
  this.marked = false;
  this.who = null;
  this.icon = document.getElementById("sqr" + sqrNum);
  this.icon.innerHTML = "";
  this.icon.disabled = false;
  this.icon.style.cursor = "Pointer";
}

function hitSquare(index) {
  if (square[index].marked == false) {
    square[index].marked = true;
    square[index].icon.style.cursor = "not-allowed";
    if (playerTurn == true) { // Player Turn
      square[index].who = true;
      square[index].icon.innerHTML = "〇";
    }
    else {
      square[index].who = false;
      square[index].icon.innerHTML = "✖";
    }
    checkWin(square[index].who); // Call checkWin with the current player
    if (playerTurn == true) {
      playerTurn = false;
      computerTurn()
    } else {playerTurn = true;}
  }
}

function computerTurn() {
  for (var i = 0; i < 9; i++) {
    square[i].icon.disabled = true;
  }
  var rand = Math.floor(Math.random() * 9); // Generate a random number between 0 and 8
  if (square[rand].marked == false) {
    setTimeout(function(){ 
      for (var i = 0; i < 9; i++) {
        square[i].icon.disabled = false;
      }
      hitSquare(rand);
    }, 1000);
  } else {computerTurn()}
}


function checkWin(c) {
  if (square[0].who == c && square[1].who == c && square[2].who == c) {playerWin(c);}
  if (square[0].who == c && square[3].who == c && square[6].who == c) {playerWin(c);}
  if (square[0].who == c && square[4].who == c && square[8].who == c) {playerWin(c);}
  if (square[1].who == c && square[4].who == c && square[7].who == c) {playerWin(c);}
  if (square[2].who == c && square[4].who == c && square[6].who == c) {playerWin(c);}
  if (square[2].who == c && square[5].who == c && square[8].who == c) {playerWin(c);}
  if (square[3].who == c && square[4].who == c && square[5].who == c) {playerWin(c);}
  if (square[6].who == c && square[7].who == c && square[8].who == c) {playerWin(c);}
  else if (square[0].marked == true && square[1].marked == true && square[2].marked == true && square[3].marked == true && square[4].marked == true && square[5].marked == true && square[6].marked == true && square[7].marked == true && square[8].marked == true) {
    endGame();
  }
}

function playerWin(winningPlayer) {
  if (winningPlayer == true) {
    scores.player1 ++; //Increases Score per win
  } else if (winningPlayer == false) {
    scores.player2 ++;
  }
  endGame()
}

function endGame() {
  document.getElementById("score").innerHTML = "<h1 style='color: blue;'>😃 " + scores.player1 + "</h1><h1 style='color: red;'>👽 " + scores.player2 + "</h1>"
  for (var i = 0; i < 9; i++) {
    square[i].icon.disabled = true;
  }
  setTimeout(function(){ 
    reset = true;
    load() 
  }, 500);
}