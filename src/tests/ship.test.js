import ship from "../logic/ship";
import vec2, { direction } from "../vec2";

test("Should have length", () => {
  expect(ship(3).length).toBe(3);
});

test("Should know whether or not it's been sunk", () => {
  let testShip = ship(3);
  expect(testShip.isSunk()).toBe(false);
  testShip = testShip.hit(0);
  expect(testShip.isSunk()).toBe(false);
  testShip = testShip.hit(1);
  expect(testShip.isSunk()).toBe(false);
  testShip = testShip.hit(2);
  expect(testShip.isSunk()).toBe(true);
});

test("getHits() should return expected value", () => {
  let testShip = ship(3);
  expect(testShip.getHits()).toEqual([false, false, false]);
  testShip = testShip.hit(0);
  expect(testShip.getHits()).toEqual([true, false, false]);
  testShip = testShip.hit(2);
  expect(testShip.getHits()).toEqual([true, false, true]);
});

test("should return correct board-space coordinates", () => {
  const testShip = ship(3, vec2(3, 5), direction.down);
  const coords = testShip.getBoardSpaceCoords();
  expect(coords[0].equals(vec2(3, 5))).toBe(true);
  expect(coords[1].equals(vec2(3, 6))).toBe(true);
  expect(coords[2].equals(vec2(3, 7))).toBe(true);
});

test("should throw error when attempting to hit invalid segment", () => {
  expect(() => ship(3).hit(5)).toThrowError();
});
