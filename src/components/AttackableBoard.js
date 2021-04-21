import React from "react";
import BoardHitsMisses from "./BoardHitsMisses";
import Gameboard from "./Gameboard";

export default function AttackableBoard({
  gameboard: gb,
  setGameboard: setGb,
  onAttack,
}) {
  const handleAttack = (pos) => {
    if (!gb.isValidMovePos(pos)) {
      return;
    }

    setGb((prevBoard) => prevBoard.receiveHit(pos));
    onAttack();
  };

  return (
    <div>
      <Gameboard gameboard={gb} onCellClick={handleAttack}>
        <BoardHitsMisses misses={gb.misses} hits={gb.hits} />
      </Gameboard>
    </div>
  );
}
