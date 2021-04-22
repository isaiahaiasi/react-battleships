import { useState, useEffect } from "react";
import EnemyBoard from "./AttackableBoard";
import Gameboard from "./Gameboard";
import { getValidPos } from "../logic/playerAi";
import BoardHitsMisses from "./BoardHitsMisses";
import RenderShips from "./RenderShips";

// Not sure I'm okay with this approach
function MainGame({ useBoardPlayer, useBoardNpc, onGameOver }) {
  const [testBoard, updateTestBoard] = useBoardPlayer;
  const [testBoard2, updateTestBoard2] = useBoardNpc;
  const [turn, setTurn] = useState(0);

  // I can't check isEveryShipSunk until testBoard is updated
  // and I'm not sure yet how to properly handle that in my incrementTurn cb
  useEffect(() => {
    if (testBoard.isEveryShipSunk()) {
      onGameOver("Player");
    } else if (testBoard2.isEveryShipSunk()) {
      onGameOver("NPC");
    }
  }, [testBoard, testBoard2, onGameOver]);

  const npcTurn = () => {
    updateTestBoard2((prev) => prev.receiveHit(getValidPos(prev)));
  };

  const incrementTurn = () => {
    npcTurn();
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
      <EnemyBoard
        gameboard={testBoard}
        setGameboard={updateTestBoard}
        onAttack={incrementTurn}
      />
      <h2>Player board</h2>
      <Gameboard gameboard={testBoard2}>
        <BoardHitsMisses hits={testBoard2.hits} misses={testBoard2.misses} />
        <RenderShips ships={testBoard2.ships} />
      </Gameboard>
    </div>
  );
}

export default MainGame;
