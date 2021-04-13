import board from "../logic/gameboard";
import ship from "../logic/ship";
import dir, { vec2 } from "../direction";

// this one is always ~10x slower than the others, and I have no idea why
test("should throw error when adding ship outside array bounds", () => {
  const testShip = ship(3);
  let testBoard = board(5);
  expect(() => {
    testBoard.addShip(testShip, vec2(4, 0), dir.right);
  }).toThrowError();
});

test("should be able to receive hit", () => {
  const testBoard = board(3);
  const testBoardHit = testBoard.receiveHit(vec2(0, 0));
  expect(testBoardHit).not.toBe(testBoard);
  expect(testBoardHit.misses.length).toBe(1);
});

test("should throw error when attempting to hit outside array bounds", () => {
  const testBoard = board(3);
  expect(() => {
    testBoard.receiveHit(vec2(4, 0));
  }).toThrowError();
});

test("isEveryShipSunk() should not give false positives", () => {
  const testBoard = board(3).addShip(ship(3), vec2(0, 0), dir.right);

  expect(testBoard.isEveryShipSunk()).toBe(false);
});

test("isEveryShipSunk() should return true when all ships are sunk", () => {
  const testBoard = board(3)
    .addShip(ship(3), vec2(0, 0), dir.right)
    .receiveHit(vec2(0, 0))
    .receiveHit(vec2(1, 0))
    .receiveHit(vec2(2, 0));

  expect(testBoard.isEveryShipSunk()).toBe(true);
});

// TODO: might remove all of these tests
// b/c I don't think I actually need getCoords
describe("added ships are visible at their coordinates", () => {
  test("when facing down", () => {
    const testShip = ship(3);
    let testBoard = board(4);
    testBoard = testBoard.addShip(testShip, vec2(0, 0), dir.down);

    const expectedPositions = [vec2(0, 0), vec2(0, 1), vec2(0, 2)];
    const unexpectedPositions = [vec2(1, 0), vec2(0, 3)];

    expectedPositions.forEach((pos) => {
      expect(testBoard.getCoords(pos).ship).toEqual(testShip);
    });

    unexpectedPositions.forEach((pos) => {
      expect(testBoard.getCoords(pos)).toBeUndefined();
    });
  });

  test("when facing right", () => {
    const testShip = ship(4);
    let testBoard = board(5);
    testBoard = testBoard.addShip(testShip, vec2(1, 1), dir.right);

    const expectedPositions = [vec2(1, 1), vec2(2, 1), vec2(3, 1), vec2(4, 1)];
    const unexpectedPositions = [vec2(0, 1), vec2(1, 0)];

    expectedPositions.forEach((pos) => {
      expect(testBoard.getCoords(pos).ship).toEqual(testShip);
    });

    unexpectedPositions.forEach((pos) => {
      expect(testBoard.getCoords(pos)).toBeUndefined();
    });
  });

  test("when facing up", () => {
    const testShip = ship(3);
    let testBoard = board(5);
    testBoard = testBoard.addShip(testShip, vec2(4, 3), dir.up);

    const expectedPositions = [vec2(4, 3), vec2(4, 2), vec2(4, 1)];
    const unexpectedPositions = [vec2(0, 3), vec2(4, 0)];

    expectedPositions.forEach((pos) => {
      expect(testBoard.getCoords(pos).ship).toEqual(testShip);
    });

    unexpectedPositions.forEach((pos) => {
      expect(testBoard.getCoords(pos)).toBeUndefined();
    });
  });

  test("when facing left", () => {
    const testShip = ship(3);
    let testBoard = board(5);
    testBoard = testBoard.addShip(testShip, vec2(4, 3), dir.left);

    const expectedPositions = [vec2(4, 3), vec2(3, 3), vec2(2, 3)];
    const unexpectedPositions = [vec2(0, 3), vec2(4, 0)];

    expectedPositions.forEach((pos) => {
      expect(testBoard.getCoords(pos).ship).toEqual(testShip);
    });

    unexpectedPositions.forEach((pos) => {
      expect(testBoard.getCoords(pos)).toBeUndefined();
    });
  });
});
