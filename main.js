var gPlayers = [
  { player: "X", name: prompt("enter the name of the first player") },
  { player: "O", name: prompt("enter the name of the second player") },
];

const BOARD = [];
const BOARD_SIZE = 3;
var rounds = 0;
var IndexOfStartingPlayer = whoIsStarting(gPlayers);

function createBoard() {
  for (let row = 0; row < BOARD_SIZE; row++) {
    BOARD[row] = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      BOARD[row][col] = "[ ]";
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

function onChangeMark() {
  let elBoard = document.getElementById("board");
  for (var i = 0, row; (row = elBoard.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    for (var j = 0, col; (col = row.cells[j]); j++) {
      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
      var elCol = row.cells[j];
      elCol.onclick = function () {
        returnSign(this);
        isWin();
      };
    }
  }
}

function isPlaying(gPlayers) {
  let index = IndexOfStartingPlayer;
  if (gPlayers[index].isPlaying == true) {
    gPlayers[index].isPlaying = false;
    if (index == 1) {
      index--;
    } else {
      index++;
    }
    gPlayers[index].isPlaying = true;
    rounds += 1;
    IndexOfStartingPlayer = index;
    return gPlayers[index];
  } else {
    gPlayers[index].isPlaying = true;
    player = gPlayers[index];
    IndexOfStartingPlayer = index;
    if (index == 1) {
      index--;
    } else {
      index++;
    }
    gPlayers[index].isPlaying = false;
    rounds += 1;
    return player;
  }
}

function returnSign(element) {
  if (rounds < 1) {
    element.innerText = gPlayers[IndexOfStartingPlayer].player;
    rounds += 1;
  } else {
    isPlaying(gPlayers);
    element.innerText = gPlayers[IndexOfStartingPlayer].player;
  }
}

function whoIsStarting(gPlayers) {
  let index = [0, 1];
  let randomNum = Math.floor(Math.random() * 2);
  alert(gPlayers[randomNum].name + " is starting");

  return randomNum;
}

createBoard();
printBoard();
onChangeMark();

function getDiagonal(board) {
  var list = [];
  for (num = 0; num < BOARD_SIZE; num++) {
    list.push(board[num][num]);
  }
  return list;
}

function getSecondaryDiagonal(board) {
  var list2 = [];
  row = 0;
  for (num = BOARD_SIZE - 1; num >= 0; num--) {
    list2.push(board[row][num]);
    row++;
  }
  return list2;
}

function getFirstCol(board) {
  col = [];
  for (row = 0; row < BOARD_SIZE; row++) {
    col.push(board[row][BOARD_SIZE - 3]);
  }
  return col;
}

function getSecondCol(board) {
  col = [];
  for (row = 0; row < BOARD_SIZE; row++) {
    col.push(board[row][BOARD_SIZE - 2]);
  }
  return col;
}

function getThirdCol(board) {
  col = [];
  for (row = 0; row < BOARD_SIZE; row++) {
    col.push(board[row][BOARD_SIZE - 1]);
  }
  return col;
}

function checkRow(row) {
  let XfilterValue = row.filter((item) => item == "X");
  let OfilterValue = row.filter((item) => item == "O");

  if (XfilterValue.length == BOARD_SIZE) {
    alert(gPlayers[0].name + " has won!");
  } else if (OfilterValue.length == BOARD_SIZE) {
    alert(gPlayers[1].name + " has won");
  } else {
    return false;
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

function isWin() {
  board = getInnerBoard();
  if (checkRow(getDiagonal(board))) {
  } else if (checkRow(getSecondaryDiagonal(board))) {
  } else if (checkRow(getFirstCol(board))) {
  } else if (checkRow(getSecondCol(board))) {
  } else if (checkRow(getThirdCol(board))) {
  } else {
    for (const row of board) {
      if (checkRow(row) === true) {
        console.log("player is win!");
      }
    }
  }
}
