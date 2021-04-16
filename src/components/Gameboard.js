import React from "react";
import StyledBoard from "../styled-components/styled-gameboard";
import vec2 from "../vec2";

export default function Gameboard({ onCellClick, gameboard }) {
  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < gameboard.size; i++) {
      for (let j = 0; j < gameboard.size; j++) {
        const pos = vec2(j, i);
        const isMiss = gameboard.isMissPos(pos);
        const isHit = gameboard.isHitPos(pos);

        let backgroundColor = "white";

        if (isMiss) {
          backgroundColor = "red";
        } else if (isHit) {
          backgroundColor = "green";
        }

        rows.push(
          <div
            key={j + i * gameboard.size}
            // TODO: pretty sure there's a better way
            onClick={onCellClick ? () => onCellClick(pos) : () => {}}
            style={{ backgroundColor }}
          >
            {"ABCDEFJHIJKLMNOP".split("")[j]}
            {i + 1}
          </div>
        );
      }
    }
    return rows;
  };
  return <StyledBoard size={gameboard.size}>{renderBoard()}</StyledBoard>;
}
