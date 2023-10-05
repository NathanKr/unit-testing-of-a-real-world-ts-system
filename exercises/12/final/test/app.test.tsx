import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/ui/App";
import React from "react";
import path from "path";
import fs from "fs";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<App />);
});

afterEach(() => {
  document.body.innerHTML = "";
});

vi.useFakeTimers({ toFake: ["Date"], now: new Date(2022, 11, 15, 12, 45, 29) });

test("Grade Calculator - React UI text exists on the DOM", () => {
  const elem = screen.getByText("Grade Calculator - React UI");
  expect(elem).toBeTruthy();
});

test("Upload file data/grades.csv via input -> 67.33 appears in UI", async () => {
  const fileName = "grades.csv";
  const csvFilePath = path.join("data", fileName);
  const data = fs.readFileSync(csvFilePath);

  // upload(element, file,
  let inputElem: HTMLInputElement = screen.getByLabelText(
    "Choose a csv grade file"
  );

  // Create an ArrayBuffer from the binary data (Buffer)
  const fileBits = [data.buffer];

  const file = new File(fileBits, fileName);

  userEvent.upload(inputElem, file);

  await waitFor(() => {
    expect(screen.getByText("67.33")).toBeTruthy();
  });
});

test('Upload bad data via input -> "No data found in the CSV file" appears in UI', async () => {
  const fileName = "grades.csv";
  let inputElem: HTMLInputElement = screen.getByLabelText(
    "Choose a csv grade file"
  );
  const fileBits: BlobPart[] = [];
  const file = new File(fileBits, fileName);

  userEvent.upload(inputElem, file);
  await waitFor(() => {
    expect(screen.getByText("No data found in the CSV file")).toBeTruthy();
  });
});

test("Upload file via input -> Calculate time is correct", async () => {
  const fileName = "grades.csv";
  const csvFilePath = path.join("data", fileName);
  const data = fs.readFileSync(csvFilePath);

  // upload(element, file,
  let inputElem: HTMLInputElement = screen.getByLabelText(
    "Choose a csv grade file"
  );

  // Create an ArrayBuffer from the binary data (Buffer)
  const fileBits = [data.buffer];

  const file = new File(fileBits, fileName);

  userEvent.upload(inputElem, file);

  await waitFor(() => {
    expect(screen.getByText("Calculation time : 12:45:29")).toBeTruthy();
  });
});

/*import {  beforeEach, expect, test, vi } from "vitest";
import { getByText, getByLabelText, waitFor } from "@testing-library/dom";
import { createDom, registerHandlers } from "../src/ui/main-ui";
import path from "path";
import fs from "fs";
import userEvent from "@testing-library/user-event";

let appElem: HTMLElement;

vi.useFakeTimers({ toFake: ["Date"], now: new Date(2022, 11, 15, 12, 45, 29) });


beforeEach(() => {
  document.body.innerHTML = '<div id="app"></div>';
  createDom();
  registerHandlers();
  appElem = document.getElementById("app")!;
});

test("Grade Calculator text exists on the DOM", () => {
  const elem = getByText(appElem, "Grade Calculator");
  expect(elem).toBeTruthy();
});

test("Upload file data/grades.csv via input -> 67.33 appears in UI", async () => {
  const fileName = "grades.csv";
  const csvFilePath = path.join("data", fileName);
  const data = fs.readFileSync(csvFilePath);

  // upload(element, file,
  let inputElem: HTMLInputElement = getByLabelText(
    appElem,
    "Choose a csv grade file"
  );

  // Create an ArrayBuffer from the binary data (Buffer)
  const fileBits = [data.buffer];

  const file = new File(fileBits, fileName);

  userEvent.upload(inputElem, file);

  await waitFor(() => {
    expect(getByText(appElem, "67.33")).toBeTruthy();
  });
});

test('Upload bad data via input -> "No data found in the CSV file" appears in UI', async () => {
  const fileName = "grades.csv";
  let inputElem: HTMLInputElement = getByLabelText(
    appElem,
    "Choose a csv grade file"
  );
  const fileBits: BlobPart[] = [];
  const file = new File(fileBits, fileName);

  userEvent.upload(inputElem, file);
  await waitFor(() => {
    expect(getByText(appElem, "No data found in the CSV file")).toBeTruthy();
  });
});



test("Upload file via input -> Calculate time is correct", async () => {

  const fileName = "grades.csv";
 const csvFilePath = path.join("data", fileName);
 const data = fs.readFileSync(csvFilePath);

 // upload(element, file,
 let inputElem: HTMLInputElement = getByLabelText(
   appElem,
   "Choose a csv grade file"
 );

 // Create an ArrayBuffer from the binary data (Buffer)
 const fileBits = [data.buffer];

 const file = new File(fileBits, fileName);

 userEvent.upload(inputElem, file);

 await waitFor(() => {
   expect(getByText(appElem, "Calculation time : 12:45:29")).toBeTruthy();
 });
});*/
