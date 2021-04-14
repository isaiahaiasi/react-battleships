import vec2, { direction } from "../vec2";

test("should return an object with an x and a y", () => {
  const v = vec2(3, 5);
  expect(v.x).toBe(3);
  expect(v.y).toBe(5);
});

test("should correctly evaluate the equality of 2 vec2s", () => {
  const v1 = vec2(0, 0);
  const v2 = vec2(0, 0);
  const v3 = vec2(3, 0);
  expect(v1.equals(v2)).toBe(true);
  expect(v1.equals(v3)).toBe(false);
});

test("should be able to add 2 vectors", () => {
  const v1 = vec2(3, 5);
  const v2 = vec2(4, 10);
  const v3 = v1.add(v2);
  expect(v3.equals(vec2(7, 15))).toBe(true);
});

test("should be able to multiply 2 vectors", () => {
  const v1 = vec2(3, 5);
  const v2 = vec2(0, 10);
  const v3 = v1.multiply(v2);
  expect(v3.equals(vec2(0, 50))).toBe(true);
});

test("should be able to add a vector by a scalar", () => {
  const v1 = vec2(3, 5);
  const s = 5;
  const v3 = v1.add(s);
  expect(v3.equals(vec2(8, 10))).toBe(true);
});

test("should be able to multiply a vector by a scalar", () => {
  const v1 = vec2(3, 5);
  const s = 3;
  const v3 = v1.multiply(s);
  expect(v3.equals(vec2(9, 15))).toBe(true);
});

test("should be able to fetch all cardinal directions", () => {
  expect(direction.up.equals(vec2(0, -1))).toBe(true);
  expect(direction.right.equals(vec2(1, 0))).toBe(true);
  expect(direction.down.equals(vec2(0, 1))).toBe(true);
  expect(direction.left.equals(vec2(-1, 0))).toBe(true);
});
