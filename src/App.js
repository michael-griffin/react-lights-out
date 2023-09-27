import React from "react";
import Board from "./Board";
import "./App.css";

const NCOLS = 6;
const NROWS = 6;
const CHANCE_LIGHTS_START_ON = .4;

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <Board ncols={NCOLS} nrows={NROWS} chanceLightStartsOn={CHANCE_LIGHTS_START_ON}/>
      </div>
  );
}

export default App;
