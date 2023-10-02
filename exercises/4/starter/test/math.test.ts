import { expect, test } from "vitest";
import { add, calculateAverage, mul } from "../src/lib/math";

test("add(1,2) -> 3", () => {
  expect(add(1, 2)).toBe(3);
});

test("mul(2,3) => 6", () => {
  expect(mul(2, 3)).toBe(6);
});

test("calculateAverage is ok", () => {
  expect(calculateAverage([])).toBe(NaN);
  expect(calculateAverage([1])).toBe(1);
  expect(calculateAverage([1, 2, 3])).toBe(2);
  expect(calculateAverage([-1, 4, 3])).toBe(2);
  expect(calculateAverage([-1, 4, -3])).toBe(0);
});
