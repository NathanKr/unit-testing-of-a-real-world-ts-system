import { expect, test, vi } from "vitest";
import { calculateAverage, parseCSV } from "../src/lib/grades-calculator";

test("calculateAverage is ok", () => {
  expect(calculateAverage([])).toBe(NaN);
  expect(calculateAverage([1])).toBe(1);
  expect(calculateAverage([1, 2, 3])).toBe(2);
  expect(calculateAverage([-1, 4, 3])).toBe(2);
  expect(calculateAverage([-1, 4, -3])).toBe(0);
});

test("parseCSV is ok", () => {
  expect(parseCSV("")).toEqual([]);
  expect(parseCSV("John Deer , 80")).toEqual([
    { name: "John Deer", grade: 80 },
  ]);
  expect(parseCSV("John Deer , 80\nMike Tyson , 22")).toEqual([
    { name: "John Deer", grade: 80 },
    { name: "Mike Tyson", grade: 22 },
  ]);
  expect(
    parseCSV("John Deer , 80\nMike Tyson , 22\nBarak Obama , 100")
  ).toEqual([
    { name: "John Deer", grade: 80 },
    { name: "Mike Tyson", grade: 22 },
    { name: "Barak Obama", grade: 100 },
  ]);
  expect(
    parseCSV("John Deer , 80\nMike Tyson , aa\nBarak Obama , 100")
  ).toEqual([
    { name: "John Deer", grade: 80 },
    { name: "Barak Obama", grade: 100 },
  ]);
});


test('console.log is called correct times with correct arguments in parseCSV',()=>{
  const spyOnLog = vi.spyOn(console,'log');
  parseCSV("")
  expect(spyOnLog).toBeCalledTimes(1);
  expect(spyOnLog).toBeCalledWith([]);

  expect(parseCSV("John Deer , 80\nMike Tyson , 22"))
  expect(spyOnLog).toBeCalledTimes(2);
  expect(spyOnLog).toBeCalledWith([80 , 22]);
})

test('console.log is called correct times with correct arguments in calculateAverage',()=>{
  const spyOnLog = vi.spyOn(console,'log');
  calculateAverage([1, 2, 3]);
  expect(spyOnLog).toBeCalledTimes(1);
  expect(spyOnLog).toBeCalledWith(2)

  calculateAverage([])
  expect(spyOnLog).toBeCalledTimes(2);
  expect(spyOnLog).toBeCalledWith(NaN)
})