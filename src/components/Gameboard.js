import React from "react";
import vec2 from "../vec2";

export default function Gameboard({ onCellClick, gameboard }) {
  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < gameboard.size; i++) {
      for (let j = 0; j < gameboard.size; j++) {
        const pos = vec2(j, i);
        const isPreviousMiss = gameboard.misses.some((v) => v.equals(pos));

        rows.push(
          <div
            key={j + i * gameboard.size}
            // TODO: pretty sure there's a better way
            onClick={onCellClick ? () => onCellClick(pos) : () => {}}
            style={isPreviousMiss ? { backgroundColor: "red" } : {}}
          >
            row ({j}, {i})
          </div>
        );
      }
    }
    return rows;
  };
  return <div>{renderBoard()}</div>;
}
