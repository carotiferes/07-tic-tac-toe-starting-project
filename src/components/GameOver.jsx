export default function GameOver({winner, onRematch}) {
  return (
		<div id="game-over">
			<h2>Game Over!</h2>
			{winner ? <p>{winner} won!</p> : <p>It&apos;s a draw!</p>}
			<p>
				<button onClick={onRematch}>Rematch</button>
			</p>
		</div>
	);
}