import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(nrows, ncols, chanceLightStartsOn) {
    let initialBoard = [];

    // TODO: create array-of-arrays of true/false values
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

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let flattened = board.flat();
    return !flattened.some(val => val);
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(function (arr) {
        return arr.slice();
      });

      const allCellsToTryFlipping = [[y, x], [y + 1, x], [y - 1, x], [y, x + 1], [y, x - 1]];

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: in the copy, flip this cell and the cells around it
      for (const cell of allCellsToTryFlipping) {
        flipCell(cell[0], cell[1], boardCopy);
      }

      // TODO: return the copy
      return boardCopy;
    });
  }


  //TODO: should this be a function?
  let cells = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < row.length; col++) {
      let cell = <Cell key={`${row}-${col}`} coord={`${row}-${col}`}
        isLit={board[row][col]} flipCellsAround={flipCellsAround} />;
      cells.push(cell);
    }
  }

  console.log("CELLS!", cells);

  return (
    <div className="Board">
      {hasWon()
        ? <p>You have won!</p>
        : { cells }
      }
    </div>
  );
}

export default Board;
