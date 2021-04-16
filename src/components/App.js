import { useState } from "react";
import gameboard from "../logic/gameboard";
import AttackableBoard from "./AttackableBoard";

// Not sure I'm okay with this approach
function App() {
  const [testBoard, updateTestBoard] = useState(gameboard(5));
  const [turn, setTurn] = useState(0);

  const incrementTurn = () => {
    setTurn((prev) => prev + 1);
  };

  return (
    <div className="App">
      <div>Turn: {turn}</div>
      <h2>NPC board</h2>
      <AttackableBoard
        gameboard={testBoard}
        setGameboard={updateTestBoard}
        onAttack={incrementTurn}
      />
    </div>
  );
}

export default App;
