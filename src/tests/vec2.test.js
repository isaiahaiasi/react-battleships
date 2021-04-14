import vec2, { direction } from "../vec2";

test("should return an object with an x and a y", () => {
  const v = vec2(3, 5);
  expect(v.x).toBe(3);
  expect(v.y).toBe(5);
});

test("should be able to add 2 vectors", () => {
  const v1 = vec2(3, 5);
  const v2 = vec2(4, 10);
  const v3 = v1.add(v2);
  expect(v3.x).toBe(7);
  expect(v3.y).toBe(15);
});

test("should be able to multiply 2 vectors", () => {
  const v1 = vec2(3, 5);
  const v2 = vec2(4, 10);
  const v3 = v1.multiply(v2);
  expect(v3.x).toBe(12);
  expect(v3.y).toBe(50);
});

test("should be able to add a vector by a scalar", () => {
  const v1 = vec2(3, 5);
  const s = 5;
  const v3 = v1.add(s);
  expect(v3.x).toBe(8);
  expect(v3.y).toBe(10);
});

test("should be able to multiply a vector by a scalar", () => {
  const v1 = vec2(3, 5);
  const s = 3;
  const v3 = v1.multiply(s);
  expect(v3.x).toBe(9);
  expect(v3.y).toBe(15);
});

test("should be able to fetch all cardinal directions", () => {
  const right = direction.right;
  const down = direction.down;
  const left = direction.left;
  const up = direction.up;
  expect(up.x).toBe(0);
  expect(up.y).toBe(-1);
  expect(right.x).toBe(1);
  expect(right.y).toBe(0);
  expect(down.x).toBe(0);
  expect(down.y).toBe(1);
  expect(left.x).toBe(-1);
  expect(left.y).toBe(0);
});
