import board from "../logic/gameboard";
import ship from "../logic/ship";
import vec2, { direction as dir } from "../vec2";

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
    .receiveHit(vec2(2, 0))
    .addShip(ship(2), vec2(0, 1), dir.down)
    .receiveHit(vec2(0, 1))
    .receiveHit(vec2(0, 2));

  expect(testBoard.isEveryShipSunk()).toBe(true);
});

//!--------
// TODO: "isValidShipPos" should be its own function, and it shouldn't throw
// It's good to check in addShip, but that's not the ONLY place I want it!
// (ie, user should be able to see if a pos is valid before attempting to place)
xtest("should throw error when placing a ship on top of another ship", () => {});

// this one is always ~10x slower than the others, and I have no idea why
test("should throw error when adding ship outside array bounds", () => {
  const testShip = ship(3);
  let testBoard = board(5);
  expect(() => {
    testBoard.addShip(testShip, vec2(4, 0), dir.right);
  }).toThrowError();
});
