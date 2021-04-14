import React from "react";
import vec2 from "../vec2";

export default function Gameboard({ handleMove, gameboard }) {
  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < gameboard.size; i++) {
      for (let j = 0; j < gameboard.size; j++) {
        const pos = vec2(j, i);
        const isPreviousMiss = gameboard.misses.some((v) => v.equals(pos));
        rows.push(
          <button
            key={j + i * gameboard.size}
            onClick={() => handleMove(pos)}
            disabled={isPreviousMiss}
          >
            row ({j}, {i})
          </button>
        );
      }
    }
    return rows;
  };
  return <div>{renderBoard()}</div>;
}
