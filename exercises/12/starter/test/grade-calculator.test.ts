import { expect, test, } from "vitest";
import GradesCalculator from "../src/lib/grades-calculator";

const gradesCalculator = new GradesCalculator()

test("calculateAverage is ok", () => {
  expect(gradesCalculator.calculateAverage([])).toBe(NaN);
  expect(gradesCalculator.calculateAverage([1])).toBe(1);
  expect(gradesCalculator.calculateAverage([1, 2, 3])).toBe(2);
  expect(gradesCalculator.calculateAverage([-1, 4, 3])).toBe(2);
  expect(gradesCalculator.calculateAverage([-1, 4, -3])).toBe(0);
});

test("gradesCalculator.parseCSV is ok", () => {
  expect(gradesCalculator.parseCSV("")).toEqual([]);
  expect(gradesCalculator.parseCSV("John Deer , 80")).toEqual([
    { name: "John Deer", grade: 80 },
  ]);
  expect(gradesCalculator.parseCSV("John Deer , 80\nMike Tyson , 22")).toEqual([
    { name: "John Deer", grade: 80 },
    { name: "Mike Tyson", grade: 22 },
  ]);
  expect(
    gradesCalculator.parseCSV("John Deer , 80\nMike Tyson , 22\nBarak Obama , 100")
  ).toEqual([
    { name: "John Deer", grade: 80 },
    { name: "Mike Tyson", grade: 22 },
    { name: "Barak Obama", grade: 100 },
  ]);
  expect(
    gradesCalculator.parseCSV("John Deer , 80\nMike Tyson , aa\nBarak Obama , 100")
  ).toEqual([
    { name: "John Deer", grade: 80 },
    { name: "Barak Obama", grade: 100 },
  ]);
});


