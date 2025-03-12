import { useState } from "react";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard(prevGameBoard => {
      // update in an immutable way
      const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; // copy of original object
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onSelectSquare(); // emit to the function from the prop
  }

  return (
		<ol id="game-board">
			{ gameBoard.map((row, rowIndex) => 
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => <li key={colIndex}>
              <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
            </li>)}
          </ol>
        </li>
      ) }
		</ol>
	);
}