import React from "react";

// render a ship as a child of the Gameboard component
// looks at ship length to determine graphic (?)
// looks at ship pos & rotation to determine how to render
// uses css grid grid-column & grid-row to set position on screen
export default function RenderShip({
  ship,
  customStyle = { background: "grey", border: "1px solid black" },
}) {
  // for now, there are no graphics
  // default bg is grey
  const getGridPosition = () => {
    const xStart =
      ship.rotation.x >= 0
        ? ship.origin.x + 1
        : ship.origin.x - ship.length + 2;
    const yStart =
      ship.rotation.y >= 0
        ? ship.origin.y + 1
        : ship.origin.y - ship.length + 2;

    const xSpan = ship.rotation.x !== 0 ? ship.length : 1;
    const ySpan = ship.rotation.y !== 0 ? ship.length : 1;

    return {
      gridColumn: `${xStart} / span ${xSpan}`,
      gridRow: `${yStart} / span ${ySpan}`,
    };
  };

  return (
    <>
      <div style={{ ...customStyle, ...getGridPosition() }}></div>
      <div
        style={{ gridColumn: ship.origin.x + 1, gridRow: ship.origin.y + 1 }}
      >
        X
      </div>
    </>
  );
}
