import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAround, isLit, coord }) {
  const classes = `Cell ${coord} ${isLit ? "Cell-lit" : ""}`;

  function flipCells(){
    flipCellsAround(coord);
  }
  //onclick = {() => flipAround(coord)}
  return <div data-coord={coord} className={classes} onClick={flipCells}>
  </div>;
}

export default Cell;
