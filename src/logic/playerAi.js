import vec2, { direction as dir } from "../vec2";
import ship from "./ship";

// get a random position that passes the validator function
const getValidPos = (board) => {
  let pos;
  do {
    pos = vec2(
      Math.floor(Math.random() * board.size),
      Math.floor(Math.random() * board.size)
    );
  } while (!board.isValidMovePos(pos));

  return pos;
};

const getAdjacentPositions = (pos) => dir.indexed.map((dir) => pos.add(dir));

// This AI "cheats":
// In a true game, it can be ambiguous if a hit belongs to a sunk or unsunk ship
// The tradeoff is this AI is otherwise still very dumb.
// Note: one minor (?) failing here is if two ships are placed next to each other,
// it might produce one hit on each ship, and will not necessarily follow that line
const getSmartPos = (board) => {
  // See if there's a ship that has been hit but not sunk
  const targetShip = board.ships.find(
    (ship) => ship.hits.length > 0 && !ship.isSunk()
  );

  // Just get a random position if that fails
  if (!targetShip) {
    return getValidPos(board);
  }

  // if there's only one hit, check all cardinal directions for a valid hit pos
  // and pick randomly from them
  if (targetShip.hits.length === 1) {
    const validAdjacentPositions = getAdjacentPositions(
      targetShip.hits[0]
    ).filter(board.isValidMovePos);

    // Length should never be 0, but just in case...
    if (validAdjacentPositions.length > 0) {
      return validAdjacentPositions[
        Math.floor(Math.random() * validAdjacentPositions.length)
      ];
    }
  } else if (targetShip.hits.length > 1) {
    // if there are multiple hits, choose randomly on either extent of the hit
    const possiblePositions = [
      targetShip.hits[0].add(targetShip.rotation.multiply(vec2(-1, -1))),
      targetShip.hits[targetShip.hits.length - 1].add(targetShip.rotation),
    ].filter(board.isValidMovePos);

    if (possiblePositions.length > 0) {
      return possiblePositions[
        Math.floor(Math.random() * possiblePositions.length)
      ];
    }
  }

  //! The above logic might fail if hits aren't adjacent?
  // If that happens, test if previous two positions are valid, & if not,
  // then look for valid spaces in between them & choose randomly

  return getValidPos(board);
};

// Naive ship placement algorithm
// Randomly generates origin & rotation vectors until it finds a valid position
// TODO: shouldn't reattempt failed positions
const getValidShip = (board, shipLength) => {
  if (board.size < shipLength) {
    throw new Error(
      `Cannot get valid ship of length ${shipLength} from board of length ${board.size}`
    );
  }

  let possibleShip;
  let i = 0;
  const MAX_ITERATIONS = 999;
  do {
    possibleShip = ship(
      shipLength,
      getValidPos(board),
      dir.indexed[Math.floor(Math.random() * dir.indexed.length)]
    );
    i++;
  } while (!board.isValidShip(possibleShip) && i < MAX_ITERATIONS);

  if (i >= MAX_ITERATIONS) {
    console.log(
      "Could not find valid position to place ship! There are likely not enough free positions on the board"
    );
    return;
  }

  return possibleShip;
};

// TODO: should be able to backtrack, so it can't lock itself into a state
// where it can't place all the ships that should be theoretically placeable
const getShips = (startingBoard) => {
  let board = startingBoard;
  const shipLengths = [5, 4, 3, 3, 2];
  const ships = [];
  for (let i = 0; i < shipLengths.length; i++) {
    const newShip = getValidShip(board, shipLengths[i]);
    ships.push(newShip);
    board = board.addShip(newShip);
  }

  return ships;
};

export { getValidPos, getSmartPos, getValidShip, getShips };
