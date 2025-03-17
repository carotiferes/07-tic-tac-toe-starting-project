import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
	if (prevTurns.length > 0 && prevTurns[0].player === "X") {
		currentPlayer = "O";
	}
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
	//const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer(currentActive => currentActive === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => { // prevTurns has THE LATEST information stored
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    })
  }
	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName="Player 1"
						symbol="X"
						isActive={activePlayer === "X"}
					/>
					{/* using same component twice creates ISOLATED INSTANCES */}
					<Player
						initialName="Player 2"
						symbol="O"
						isActive={activePlayer === "O"}
					/>
				</ol>
				<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
				{/* "lifting state up" = do an action in this component with the trigger in the child component */}
			</div>

      <Log turns={gameTurns}/>
		</main>
	);
}

export default App;
