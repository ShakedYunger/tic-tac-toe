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
    document.getElementById("winner").innerText = "its a draw!";
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
  if (checkDiagonal(board) === true) {
    return true;
  } else if (checkSecondaryDiagonal(board) === true) {
    return true;
  } else if (checkCol(board) === true) {
    return true;
  } else if (getRow(board) === true) {
    return true;
  } else {
    isDraw(board);
  }
  return false;
}
