
//----------------------GAME BOARD-----------------------

var playerTurn = 0;
var scores = {player1:0, player2:0};
var square = []; // Create an empty array to store squares
function load() {
  //For-Loop to create and reset all the squares when the game starts
  for (var i = 0; i < 9; i++) {
    square[i] = new Square(i); //Gives the function "Square" the number of the square
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
    if (playerTurn == 0) {
      square[index].who = 0;
      square[index].icon.innerHTML = "〇";
    }
    else {
      square[index].who = 1;
      square[index].icon.innerHTML = "✖";
    }
    checkWin(square[index].who); // Call checkWin with the current player
    playerTurn = 1 - playerTurn; // Switch playerTurn after checking for a win
  }
}


function checkWin(c) {
  if (square[0].who == c && square[1].who == c && square[2].who == c) {
    playerWin(c);
  }
  if (square[0].who == c && square[3].who == c && square[6].who == c) {
    playerWin(c);
  }
  if (square[0].who == c && square[4].who == c && square[8].who == c) {
    playerWin(c);
  }
  if (square[1].who == c && square[4].who == c && square[7].who == c) {
    playerWin(c);
  }
  if (square[2].who == c && square[4].who == c && square[6].who == c) {
    playerWin(c);
  }
  if (square[2].who == c && square[5].who == c && square[8].who == c) {
    playerWin(c);
  }
  if (square[3].who == c && square[4].who == c && square[5].who == c) {
    playerWin(c);
  }
  if (square[6].who == c && square[7].who == c && square[8].who == c) {
    playerWin(c);
  }
  else if (square[0].marked == true && square[1].marked == true && square[2].marked == true && square[3].marked == true && square[4].marked == true && square[5].marked == true && square[6].marked == true && square[7].marked == true && square[8].marked == true) {
    endGame();
  }
}

function playerWin(winningPlayer) {
  if (winningPlayer == 0) {
    scores.player1 ++; //Increases Score per win
  } else if (winningPlayer == 1) {
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
    load() 
  }, 1000);
}