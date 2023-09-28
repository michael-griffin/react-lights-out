 /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
function createBoard(nrows, ncols, chanceLightStartsOn) {
  let initialBoard = [];

  for (let row = 0; row < nrows; row++) {
    const row = [];
    for (let col = 0; col < ncols; col++) {
      const isLit = Math.random() < chanceLightStartsOn;
      row.push(isLit);
    }
    initialBoard.push(row);
  }

  return initialBoard;
}

/** flatten the board, check if any are Lit. If none are, you've won*/
function hasWon(board) {
  return !board.flat().some(val => val);
}

const flipCell = (y, x, boardCopy) => {
  // if this coord is actually on board, flip it
  if (x >= 0 && x < boardCopy.length && y >= 0 && y < boardCopy[0].length) {
    boardCopy[y][x] = !boardCopy[y][x];
  }
};

export {
  createBoard,
  hasWon,
  flipCell
}