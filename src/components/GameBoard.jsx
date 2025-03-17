
export default function GameBoard({onSelectSquare, board }) {

  return (
		<ol id="game-board">
			{ board.map((row, rowIndex) => 
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => <li key={colIndex}>
              <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                {playerSymbol}
              </button>
            </li>)}
          </ol>
        </li>
      ) } 
		</ol>
	);
}

/* activePlayerSymbol
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
 */