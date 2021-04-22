import { useState, useEffect } from "react";
import EnemyBoard from "./AttackableBoard";
import Gameboard from "./Gameboard";
import { getValidPos } from "../logic/playerAi";
import BoardHitsMisses from "./BoardHitsMisses";
import RenderShips from "./RenderShips";

// Not sure I'm okay with this approach
function MainGame({ useBoardPlayer, useBoardNpc, onGameOver }) {
  const [playerBoard, setPlayerBoard] = useBoardPlayer;
  const [npcBoard, setNpcBoard] = useBoardNpc;
  const [turn, setTurn] = useState(0);

  // I can't check isEveryShipSunk until testBoard is updated
  // and I'm not sure yet how to properly handle that in my incrementTurn cb
  useEffect(() => {
    if (npcBoard.isEveryShipSunk()) {
      onGameOver("Player");
    } else if (playerBoard.isEveryShipSunk()) {
      onGameOver("NPC");
    }
  }, [playerBoard, npcBoard, onGameOver]);

  const npcTurn = () => {
    setPlayerBoard((prev) => prev.receiveHit(getValidPos(prev)));
  };

  const incrementTurn = () => {
    npcTurn();
    setTurn((prev) => prev + 1);
  };

  return (
    <div>
      <div>Turn: {turn}</div>
      <h2>NPC board</h2>
      <EnemyBoard
        gameboard={npcBoard}
        setGameboard={setNpcBoard}
        onAttack={incrementTurn}
      />
      <h2>Player board</h2>
      <Gameboard gameboard={playerBoard}>
        <BoardHitsMisses hits={playerBoard.hits} misses={playerBoard.misses} />
        <RenderShips ships={playerBoard.ships} />
      </Gameboard>
    </div>
  );
}

export default MainGame;
