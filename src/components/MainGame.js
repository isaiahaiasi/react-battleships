import { useState, useEffect } from "react";
import AttackableBoard from "./AttackableBoard";

// Not sure I'm okay with this approach
function MainGame({ startingBoard, onGameOver }) {
  const [testBoard, updateTestBoard] = useState(startingBoard);
  const [turn, setTurn] = useState(0);

  // I can't check isEveryShipSunk until testBoard is updated
  // and I'm not sure yet how to properly handle that in my incrementTurn cb
  useEffect(() => {
    if (testBoard.isEveryShipSunk()) {
      onGameOver("Player");
    }
  }, [testBoard, onGameOver]);

  const incrementTurn = () => {
    setTurn((prev) => prev + 1);
  };

  return (
    <div
      className="App"
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>REACT-BATTLESHIP</h1>
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

export default MainGame;
