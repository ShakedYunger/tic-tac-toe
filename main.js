var gPlayers = [
  // { player: "X", name: prompt("enter the name of the first player") },
  // { player: "O", name: prompt("enter the name of the second player") },
  { sign: "X", name: "shaked" },
  { sign: "O", name: "naor" },
];

const BOARD = [];
const BOARD_SIZE = 3;
var indexOfCurrentPlayer = whoIsStarting(gPlayers);

function createBoard() {
  for (let row = 0; row < BOARD_SIZE; row++) {
    BOARD[row] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      BOARD[row][col] = "";
    }
  }
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

function printWinner() {
  console.log("winner!");
  let mainDiv = document.getElementById("whileIsWin");
  mainDiv.id = "winMassage";
  let winner = document.createElement("div");
  winner.id = "winner";
  winner.innerText = gPlayers[indexOfCurrentPlayer].name + " has won";
  document.getElementById("winMassage").appendChild(winner);
}

function onChangeMark() {
  if (this.innerText === "") {
    setSign(this);
    console.log(isWin());
    if (isWin()) {
      document.getElementById("board").setAttribute("class", "disable");
      document.getElementById("resetButton").removeAttribute("class");
      printWinner();
    } else {
      nextTurn();
    }
  }
  return;
}

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

function checkCol(board) {
  for (row = 0; row < BOARD_SIZE; row++) {
    returnsColumn = [];
    for (col = 0; col < BOARD_SIZE; col++) {
      returnsColumn.push(board[col][row]);
    }
    if (checkRow(returnsColumn) === true) {
      return true;
    }
  }
}

function checkDiagonal(board) {
  var list = [];
  for (num = 0; num < BOARD_SIZE; num++) {
    list.push(board[num][num]);
  }
  return checkRow(list);
}

function checkSecondaryDiagonal(board) {
  var list2 = [];
  row = 0;
  for (num = BOARD_SIZE - 1; num >= 0; num--) {
    list2.push(board[row][num]);
    row++;
  }
  return checkRow(list2);
}

function checkRow(row) {
  let XfilterValue = row.filter((item) => item == "X");
  let OfilterValue = row.filter((item) => item == "O");

  if (XfilterValue.length == BOARD_SIZE) {
    // alert(gPlayers[0].name + " has won!");
    return true;
  } else if (OfilterValue.length == BOARD_SIZE) {
    // alert(gPlayers[1].name + " has won");
    return true;
  } else {
    return false;
  }
}

function isDraw(table) {
  let cells = [];
  for (const row of table) {
    for (const cell of row) {
      if (cell == "X") {
        cells.push(cell);
      } else if (cell === "O") {
        cells.push(cell);
      }
    }
  }
  if (cells.length == 9) {
    alert("its a draw!");
  }
}

function getInnerBoard() {
  let elBoard = document.getElementById("board");
  let innerBoard = [];
  for (var i = 0, row; (row = elBoard.rows[i]); i++) {
    innerBoard[i] = [];
    for (var j = 0, col; (col = row.cells[j]); j++) {
      innerBoard[i].push(col.textContent);
    }
  }
  return innerBoard;
}

function getRow(board) {
  for (const row of board) {
    if (checkRow(row) === true) {
      return true;
    }
  }
}

function isWin() {
  board = getInnerBoard();
  let resetButton = document.getElementsByClassName("hidden");
  if (checkDiagonal(board) === true) {
    // resetButton.removeAttribute("class");
    return true;
  } else if (checkSecondaryDiagonal(board) === true) {
    // resetButton.removeAttribute("class");
    return true;
  } else if (checkCol(board) === true) {
    // resetButton.removeAttribute("class");
    return true;
  } else if (getRow(board) === true) {
    // resetButton.removeAttribute("class");
    return true;
  } else {
    // resetButton.removeAttribute("class")
    isDraw(board);
  }
  return false;
}

function clearBoard() {
  let elBoard = document.getElementById("board");
  let resetButton = document.createElement("div");
  for (const row of elBoard.rows) {
    for (const cell of row.cells) {
      cell.innerText = "";
      cell.removeAttribute("class");
      document.getElementById("board").removeAttribute("class");
      document.getElementById("winner").innerText = "";
      resetButton.className = "hidden";
    }
  }
}

function hideButton() {
  let mainDiv = document.getElementById("whileIsWin");
  let resetButton = document.createElement("div");
  resetButton.id = "resetButton";
  resetButton.className = "hidden";
  // resetButton.style.display = "none";
  mainDiv.appendChild(resetButton);
  resetButton.innerText = "Reset Board";
}

function resetBoard() {
  hideButton();
  let resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", clearBoard);
  clearBoard();
}

function createGameBoard() {
  createBoard();
  printBoard();
  addingOnclick();
  resetBoard();
}
