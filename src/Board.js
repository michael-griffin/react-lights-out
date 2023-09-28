import { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { createBoard, hasWon } from "./utils";

const NCOLS = 6;
const NROWS = 6;
const CHANCE_LIGHTS_START_ON = .4;

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

function Board({ nrows=NROWS, ncols=NCOLS, chanceLightStartsOn=CHANCE_LIGHTS_START_ON }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));


  /** flips cells + neighbors lit property (unlit become lit, and vice versa)
   *  sets board state to new board with flipped cells.  */
  function flipCellsAround(coord) {

    setBoard(oldBoard => {

      const [y, x] = coord.split("-").map(Number);

      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(function (arr) {
        return arr.slice();
      });

      const allCellsToTryFlipping = [
        [y, x],
        [y + 1, x],
        [y - 1, x],
        [y, x + 1],
        [y, x - 1]
      ];

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // in the copy, flip this cell and the cells around it
      for (const cell of allCellsToTryFlipping) {
        flipCell(cell[0], cell[1], boardCopy);
      }

      return boardCopy;
    });
  }

  function makeCells() {
    let cells = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        let cell = <Cell key={`${row}-${col}`} coord={`${row}-${col}`}
          isLit={board[row][col]} flipCellsAround={flipCellsAround} />;
        cells.push(cell);
      }
    }
    return cells;
  }

  const cells = makeCells();
  console.log("cells", cells);

  return (
    <div className="Board">
      {hasWon(board)
        ? <p>You have won!</p>
        : <>{cells}</>
      }
    </div>
  );
}

export default Board;
