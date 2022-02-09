var gPlayers = [
  { sign: "X", name: prompt("enter the name of the first player") },
  { sign: "O", name: prompt("enter the name of the second player") },
  //   { sign: "X", name: "shaked" },
  //   { sign: "O", name: "naor" },
];

const BOARD = [];
const BOARD_SIZE = 3;
var indexOfCurrentPlayer = whoIsStarting(gPlayers);

function addingOnclick() {
  let elBoard = document.getElementById("board");
  for (var i = 0, row; (row = elBoard.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    for (var j = 0, col; (col = row.cells[j]); j++) {
      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
      var elCell = row.cells[j];

      elCell.addEventListener("click", onChangeMark);
    }
  }
}

function createBoard() {
  for (let row = 0; row < BOARD_SIZE; row++) {
    BOARD[row] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      BOARD[row][col] = "";
    }
  }
  createResetButton();
}

function printBoard() {
  let elBoard = document.getElementById("board");
  for (let row = 0; row < BOARD_SIZE; row++) {
    var elTr = document.createElement("tr");
    for (let col = 0; col < BOARD_SIZE; col++) {
      let elCell = document.createElement("td");
      elTr.appendChild(elCell);
      elCell.innerText = BOARD[row][col];
    }
    elBoard.appendChild(elTr);
  }
}

function createResetButton() {
  let mainDiv = document.getElementById("modal");
  let resetButton = document.createElement("div");
  resetButton.id = "resetButton";
  resetButton.innerText = "Reset Board";
  mainDiv.appendChild(resetButton);
  resetButton.addEventListener("click", clearBoard);
}

function nextTurn() {
  let index = indexOfCurrentPlayer;
  if (index == 1) {
    index = 0;
  } else {
    index = 1;
  }
  indexOfCurrentPlayer = index;
}

function setSign(cell) {
  let sign = gPlayers[indexOfCurrentPlayer].sign;
  cell.innerText = sign;
  cell.setAttribute("class", sign);
}

function whoIsStarting(gPlayers) {
  let index = [0, 1];
  let randomNum = Math.floor(Math.random() * 2);
  gPlayers[randomNum].isPlaying = true;
  alert(gPlayers[randomNum].name + " is starting");

  index.splice(randomNum, 1);
  gPlayers[index[0]].isPlaying = false;
  return randomNum;
}
