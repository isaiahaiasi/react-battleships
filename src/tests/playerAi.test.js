import gameboard from "../logic/gameboard";
import ship from "../logic/ship";
import { getValidPos, getValidShip, getShips } from "../logic/playerAi";
import vec2, { direction } from "../vec2";

describe("getShips()", () => {
  test("should return full set of ships", () => {
    const blankBoard = gameboard(10);
    const ships = getShips(blankBoard);

    const overlap = ships.some((ship1, i) =>
      ships.some(
        (ship2, j) =>
          j !== i &&
          ship1.getBoardSpaceCoords().some((coord1) => {
            return ship2
              .getBoardSpaceCoords()
              .some((coord2) => coord2.equals(coord1));
          })
      )
    );

    expect(overlap).toBe(false);

    const testBoard = ships.reduce((acc, s) => acc.addShip(s), blankBoard);
    expect(testBoard).not.toBeUndefined();
  });
});

describe("getValidPos()", () => {
  test("should return valid move position from a board", () => {
    // I'm pretty sure I should use a mock for this, but... oh well
    const board = gameboard(10);
    const pos = getValidPos(board);
    expect(board.isValidMovePos(pos)).toBe(true);
  });
});

describe("getValidShip()", () => {
  test("should not return undefined", () => {
    const board = gameboard(10);
    const testShip = getValidShip(board, 4);
    expect(testShip).not.toBeUndefined();
  });

  test("should throw an error if ship is too long for board", () => {
    const board = gameboard(3);
    expect(() => getValidShip(board, 5)).toThrowError();
  });

  test("should throw error if it can't find a position for ship", () => {
    const board = gameboard(3)
      .addShip(ship(3, vec2(0, 0), direction.right))
      .addShip(ship(3, vec2(0, 1), direction.right))
      .addShip(ship(3, vec2(0, 2), direction.right));

    const testShip = getValidShip(board, 3);
    expect(testShip).toBeUndefined();
  });

  test("should return a ship that can be safely placed on a board", () => {
    let board = gameboard(5);
    for (let i = 0; i < 3; i++) {
      const testShip = getValidShip(board, 3);
      expect(testShip).not.toBeUndefined();
      const test = board;
      expect(() => test.addShip(testShip)).not.toThrowError();
      board = board.addShip(testShip);
    }
  });
});
