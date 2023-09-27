import { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

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

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  //TODO: move out createBoard function.
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

  //TODO: hasWon can move to utils.
  /** flatten the board, check if any are Lit. If none are, you've won*/
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let flattened = board.flat(); //chain .some (and return);
    return !flattened.some(val => val);
  }

  /** flips cells + neighbors lit property (unlit become lit, and vice versa)
   *  sets board state to new board with flipped cells.  */

  //TODO: pass coord as argument, put coord in callback for cell
  function flipCellsAround(coord) {

    setBoard(oldBoard => {
      //TODO: move the functions out!
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


  //This should be a function
  let cells = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      let cell = <Cell key={`${row}-${col}`} coord={`${row}-${col}`}
        isLit={board[row][col]} flipCellsAround={flipCellsAround} />;
      cells.push(cell);
    }
  }

  return (
    <div className="Board">
      {hasWon()
        ? <p>You have won!</p>
        : <>{cells}</>
      }
    </div>
  );
}

export default Board;
