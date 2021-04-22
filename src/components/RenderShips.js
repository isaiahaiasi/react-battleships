import RenderShip from "./RenderShip";

export default function RenderShips({ ships }) {
  return (
    <>
      {ships.map((ship) => (
        <RenderShip ship={ship} key={`(${ship.origin.x}, ${ship.origin.y})`} />
      ))}
    </>
  );
}
