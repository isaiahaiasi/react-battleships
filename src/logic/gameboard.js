// I want to make the full constructor private
export default function gameboardCaller(length) {
  return gameboard(length);
}

function gameboard(size, ships = [], misses = []) {
  const posOutOfBounds = (pos) =>
    pos.x < 0 || pos.x > size - 1 || pos.y < 0 || pos.y > size - 1;

  const posContainsShip = (pos) =>
    ships.some((ship) => ship.getBoardSpaceCoords().some((v) => v.equals(pos)));

  const isValidShipPos = (pos) => !posOutOfBounds(pos) && !posContainsShip(pos);

  // only valid if not a previous hit or miss
  const isValidMove = (pos) => {
    return (
      !posOutOfBounds(pos) &&
      misses.every((miss) => !miss.equals(pos)) &&
      !ships.some((ship) => {
        const boardSpaceCoords = ship.getBoardSpaceCoords();

        return ship
          .getHits()
          .some(
            (segment, i) => boardSpaceCoords[i].equals(pos) && segment === true
          );
      })
    );
  };

  const addShip = (ship) => {
    if (ship.getBoardSpaceCoords().some((pos) => !isValidShipPos(pos))) {
      throw new Error(`Tried to add ship at illegal board position`);
    }

    return gameboard(size, [...ships, ship], misses);
  };

  const receiveHit = (hitPos) => {
    if (posOutOfBounds(hitPos)) {
      throw new Error(
        `Tried to receive hit at illegal position (${hitPos.x}, ${hitPos.y})`
      );
    }

    // try to find a ship at that position
    const hitShip = ships.find((ship) =>
      ship.getBoardSpaceCoords().some((position) => position.equals(hitPos))
    );

    if (hitShip) {
      // Find which segment of the ship was hit by matching board-space coords
      // TODO: this should probably be handled by ship...
      const hitSegment = hitShip
        .getBoardSpaceCoords()
        .findIndex((pos) => pos.equals(hitPos));

      // remove hitship from ships and replace with newship
      const newShip = hitShip.hit(hitSegment);
      const newShips = [...ships].splice(0, ships.indexOf(hitShip), 1);
      newShips.push(newShip);

      return gameboard(size, newShips, misses);
    } else {
      const newMisses = [...misses, hitPos];
      return gameboard(size, ships, newMisses);
    }
  };

  const isEveryShipSunk = () => ships.every((ship) => ship.isSunk());

  return {
    size,
    addShip,
    receiveHit,
    misses,
    isEveryShipSunk,
    isValidShipPos,
    isValidMove,
  };
}
