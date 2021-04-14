import vec2 from "../vec2";

// I want to make the full constructor private
export default function gameboardCaller(length) {
  return gameboard(length);
}

function gameboard(length, ships = [], misses = []) {
  const posOutOfBounds = (pos) =>
    pos.x < 0 || pos.x > length - 1 || pos.y < 0 || pos.y > length - 1;

  const addShip = (ship, origin, orientation) => {
    const positions = [];
    for (let i = 0; i < ship.length; i++) {
      const pos = vec2(
        origin.x + orientation.x * i,
        origin.y + orientation.y * i
      );

      if (posOutOfBounds(pos)) {
        throw new Error(
          `Tried to add ship at illegal board position(${pos.x}, ${pos.y})`
        );
      }
      positions[i] = pos;
    }

    return gameboard(length, [...ships, { ship, positions }], misses);
  };

  const receiveHit = (hitPos) => {
    if (posOutOfBounds(hitPos)) {
      throw new Error(
        `Tried to receive hit at illegal board position (${hitPos.x}, ${hitPos.y})`
      );
    }

    // try to find a ship at that position
    const hitShip = ships.find((ship) =>
      ship.positions.some((position) => position.equals(hitPos))
    );

    if (hitShip) {
      // Find which segment of the ship was hit by matching board-space coords
      const hitSegment = hitShip.positions.findIndex((position) =>
        position.equals(hitPos)
      );

      // remove hitship from ships and replace with newship
      const newShip = hitShip.ship.hit(hitSegment);
      const newShips = [...ships].splice(0, ships.indexOf(hitShip), 1);
      newShips.push({ ship: newShip, positions: hitShip.positions });

      return gameboard(length, newShips, misses);
    } else {
      const newMisses = [...misses, hitPos];
      return gameboard(length, ships, newMisses);
    }
  };

  const isEveryShipSunk = () => ships.every((ship) => ship.ship.isSunk());

  return { addShip, receiveHit, misses, isEveryShipSunk };
}
