import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  function handleSelectSquare() {
    setActivePlayer(currentActive => currentActive === 'X' ? 'O' : 'X')
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
				<GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
				{/* "lifting state up" = do an action in this component with the trigger in the child component */}
			</div>
		</main>
	);
}

export default App;
