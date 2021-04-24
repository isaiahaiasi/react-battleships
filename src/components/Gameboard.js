import React from "react";
import StyledBoard from "../styled-components/styled-gameboard";
import StyledGridCell from "../styled-components/styled-grid-cell";
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
          <StyledGridCell
            key={j + i * gameboard.size}
            onClick={() => onCellClick(pos)}
            onMouseEnter={() => onCellMouseEnter(pos)}
            className="grid-bg"
            position={pos}
          >
            {"ABCDEFGHIJKLMNOP".split("")[i]}
            {j + 1}
          </StyledGridCell>
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
