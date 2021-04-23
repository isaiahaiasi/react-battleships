import RenderShip from "./RenderShip";

export default function RenderShipPreview({ ship, isValidPos }) {
  return (
    <RenderShip
      ship={ship}
      customStyle={{
        opacity: "50%",
        backgroundColor: isValidPos ? "green" : "red",
      }}
    />
  );
}
