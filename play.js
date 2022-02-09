function printWinner() {
  let winner = document.getElementById("winner");
  console.log(winner);
  if (!winner) {
    winner = document.createElement("div");
    winner.id = "winner";
    document.getElementById("modal").appendChild(winner);
  }
  winner.innerText = gPlayers[indexOfCurrentPlayer].name + " has won!";
}

function onChangeMark() {
  if (this.innerText === "") {
    setSign(this);
    console.log(isWin());
    if (isWin()) {
      document.getElementById("board").setAttribute("class", "disable");
      document.getElementById("whileIsWin").classList.remove("hidden");

      printWinner();
    } else {
      nextTurn();
    }
  }
  return;
}

function clearBoard() {
  let elBoard = document.getElementById("board");
  let overlay = document.getElementById("whileIsWin");
  for (const row of elBoard.rows) {
    for (const cell of row.cells) {
      cell.innerText = "";
      cell.removeAttribute("class");
    }
  }
  overlay.className = "hidden";
  document.getElementById("board").removeAttribute("class");
  document.getElementById("winner").innerText = "";
  hideOverlay();
}

function hideOverlay() {
  let overlay = document.getElementById("whileIsWin");
  overlay.className = "hidden";
}

function createGameBoard() {
  createBoard();
  printBoard();
  addingOnclick();
}
