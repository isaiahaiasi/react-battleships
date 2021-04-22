import React from "react";
import StyledBoard from "../styled-components/styled-gameboard";
import vec2 from "../vec2";

export default function Gameboard({
  onCellClick = () => {},
  onCellMouseEnter = () => {},
  gameboard,
  children,
}) {
  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < gameboard.size; i++) {
      for (let j = 0; j < gameboard.size; j++) {
        const pos = vec2(j, i);

        rows.push(
          <div
            key={j + i * gameboard.size}
            onClick={() => onCellClick(pos)}
            onMouseEnter={() => onCellMouseEnter(pos)}
            style={{ gridColumn: pos.x + 1, gridRow: pos.y + 1 }}
            className="grid-bg"
          >
            {"ABCDEFJHIJKLMNOP".split("")[j]}
            {i + 1}
          </div>
        );
      }
    }
    return rows;
  };

  return (
    <StyledBoard size={gameboard.size}>
      {renderBoard()}
      {children}
    </StyledBoard>
  );
}
