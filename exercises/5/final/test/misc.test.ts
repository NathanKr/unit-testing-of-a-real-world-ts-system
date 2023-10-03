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

test('toEqual pass',()=>{
  const obj1 = {a : undefined , b : 122};
  const obj2 = {b : 122};
  expect(obj1).toEqual(obj2)
})


test('toStrictEqual not pass',()=>{
  const obj1 = {a : undefined , b : 122};
  const obj2 = {b : 122};
  expect(obj1).not.toStrictEqual(obj2)
})