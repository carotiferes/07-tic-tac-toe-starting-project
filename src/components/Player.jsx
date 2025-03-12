import { useState } from "react";

export default function Player({ initialName, symbol }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

  function handleChange(event) {
    setPlayerName(event.target.value)
  }

	return (
		<li>
			<span className="player">
				{isEditing ? (
					<input type="text" required value={playerName} onChange={handleChange}/> /* = TWO WAY BINDING */
				) : (
					<span className="player-name">{playerName}</span>
				)}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button
				onClick={
					() =>
						setIsEditing(
							/* IN REACT instead of !isEditing do: */ editing => !editing
						) /* because "!isEditing is based on the initial value of the state" */
				}
			>
				{isEditing ? "Save" : "Edit"}
			</button>
		</li>
	);
}
