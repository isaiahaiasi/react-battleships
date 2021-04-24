import ship from "../logic/ship";
import vec2, { direction } from "../vec2";

test("Should have length", () => {
  expect(ship(3).length).toBe(3);
});

test("should have origin", () => {
  const origin = vec2(3, 4);
  const merryweather = ship(4, origin, direction.up);
  expect(merryweather.origin).not.toBeUndefined();
  expect(merryweather.origin.equals(origin)).toBe(true);
});

test("should have rotation", () => {
  const rotation = direction.right;
  const merryweather = ship(4, vec2(3, 4), rotation);
  expect(merryweather.rotation).not.toBeUndefined();
  expect(merryweather.rotation.equals(rotation)).toBe(true);
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

test("hits should return boardspace coords of hit positions", () => {
  let testShip = ship(3, vec2(3, 4), direction.up);
  expect(testShip.hits).toEqual([]);
  testShip = testShip.hit(0);
  expect(JSON.stringify(testShip.hits)).toEqual(JSON.stringify([vec2(3, 4)]));
  testShip = testShip.hit(2);
  expect(JSON.stringify(testShip.hits)).toEqual(
    JSON.stringify([vec2(3, 4), vec2(3, 2)])
  );
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
