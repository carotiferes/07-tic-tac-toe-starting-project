import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

function deriveActivePlayer(gameTurns) {
	let currentPlayer = "X";
	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
	}
	return currentPlayer;
}

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	//const [activePlayer, setActivePlayer] = useState("X");
	const activePlayer = deriveActivePlayer(gameTurns);

	let gameBoard = [...initialGameBoard.map(array => [...array])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

  let winner;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
      winner = firstSquareSymbol;
		}
	}

  const hasDraw = gameTurns.length === 9 && !winner;

	function handleSelectSquare(rowIndex, colIndex) {
		//setActivePlayer(currentActive => currentActive === 'X' ? 'O' : 'X')
		setGameTurns((prevTurns) => {
			// prevTurns has THE LATEST information stored
			let currentPlayer = deriveActivePlayer(prevTurns);
			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];
			return updatedTurns;
		});
	}

  function handleRestart() {
    setGameTurns([]);
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
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRestart} />}
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
				{/* "lifting state up" = do an action in this component with the trigger in the child component */}
			</div>

			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
