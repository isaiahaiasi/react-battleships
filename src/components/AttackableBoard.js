import React from "react";
import Gameboard from "./Gameboard";

export default function AttackableBoard({ gameboard, setGameboard, onAttack }) {
  const handleAttack = (pos) => {
    if (!gameboard.isValidMove(pos)) {
      return;
    }

    setGameboard((prevBoard) => prevBoard.receiveHit(pos));
    onAttack();
  };

  return (
    <div>
      <Gameboard gameboard={gameboard} onCellClick={handleAttack} />
    </div>
  );
}
