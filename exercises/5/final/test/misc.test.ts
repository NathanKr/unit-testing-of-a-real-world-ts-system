import { expect, test } from "vitest";

test("toStrictEqual is true", () => {
  const array1 = [
    { name: "John Deer", grade: 80 },
    { name: "Barak Obama", grade: 100 },
  ];

  const array2 = [
    { name: "John Deer", grade: 80 },
    { name: "Barak Obama", grade: 100 },
  ];

  expect(array1).toStrictEqual(array2);
});

test("toStrictEqual is false", () => {
  const array1 = [
    { name: "Barak Obama", grade: 100 },
    { name: "John Deer", grade: 80 },
  ];

  const array2 = [
    { name: "John Deer", grade: 80 },
    { name: "Barak Obama", grade: 100 },
  ];

  expect(array1).not.toStrictEqual(array2);
});

