import { test, expect, beforeEach, vi } from "vitest";
import {
  SCHEDULER_INTERVAL_SEC,
  createDom,
  registerHandlers,
} from "../src/ui/main-ui";
import {
  ButtonsText,
  getButtonInUI,
  getEnumKeyValues,
  pauseMs,
} from "./test-utils";
import * as functions from "../src/lib/utils/dispatched-functions";
import { DispatchedFunctionResult } from "../src/types/dispatched-function";

let appElem: HTMLElement;

beforeEach(() => {
  document.body.innerHTML = '<div id="app"></div>';
  createDom();
  registerHandlers();
  appElem = document.getElementById("app")!;
  vi.clearAllMocks();
});

test("document exist", () => {
  expect(document).toBeTruthy();
});

test("h1 with text : 'Task Queue Manager' is in the dom ", () => {
  const h1Elem = document.querySelector("h1");

  expect(h1Elem).toBeTruthy();
  expect(h1Elem!.textContent).toBe("Task Queue Manager");
});

test("Six buttons inside app id element", () => {
  const buttonElems = appElem.querySelectorAll("button");

  expect(buttonElems.length).toBe(6);
});

test("The first button has correct text", () => {
  const firstButton = appElem.querySelector("button");

  expect(firstButton?.textContent).toBe("start scheduler");
});

test("all buttons has correct text", () => {
  const arrayButtonsKeyValue = getEnumKeyValues(ButtonsText);
  const buttons = appElem.querySelectorAll("button");

  expect(arrayButtonsKeyValue.length).toBe(buttons.length);

  arrayButtonsKeyValue.forEach((bt, i) => {
    expect(bt.value).toBe(buttons[i].textContent);
  });
});

test("click on add -> 3 appears in the output", async () => {
  getButtonInUI(ButtonsText.EnqueueAdd)!.click();
  getButtonInUI(ButtonsText.StartScheduler)!.click();

  const outputElem = appElem.querySelector("output");
  await pauseMs(SCHEDULER_INTERVAL_SEC * 1000 * 2);
  expect(outputElem?.textContent?.includes("3")).toBeTruthy();
});

test("enqueue -> queue length is 1 -> in console.log", () => {
  getButtonInUI(ButtonsText.EnqueueAdd)?.click();
  const spyOnConsoleLog = vi.spyOn(console, "log");
  getButtonInUI(ButtonsText.QueueLength)?.click();

  expect(spyOnConsoleLog).toBeCalledTimes(1);
  expect(spyOnConsoleLog).toBeCalledWith("taskQueue.length() : 1");
});

test("failure status is add --> failure to appear in the ui", async () => {
  const spyOnAdd = vi.spyOn(functions, "add");
  const resFailure: DispatchedFunctionResult = {
    status: "failure",
    result: undefined,
  };
  spyOnAdd.mockReturnValue(resFailure);
  registerHandlers();

  getButtonInUI(ButtonsText.EnqueueAdd)?.click();
  getButtonInUI(ButtonsText.StartScheduler)!.click();

  await pauseMs(SCHEDULER_INTERVAL_SEC * 1000 * 2);

  expect(spyOnAdd).toBeCalledTimes(1);
  expect(appElem.querySelector("output")!.textContent).toContain("failure");
});


test('button isSchedulerStarted invoked --> console.error is called',()=>{
  // --- todo add real source code implementation
  
  const spyOnConsoleError = vi.spyOn(console,'error');
  getButtonInUI(ButtonsText.IsSchedulerRunning)?.click();

  expect(spyOnConsoleError).toBeCalledTimes(1);
})

test('button enqueueGetPosts invoked --> console.error is called',()=>{
  // --- todo add real source code implementation
  const spyOnConsoleError = vi.spyOn(console,'error');
  getButtonInUI(ButtonsText.EnqueueGetPosts)?.click();

  expect(spyOnConsoleError).toBeCalledTimes(1);
})

test('enqueue , start , stop --> output is empty',async ()=>{
  getButtonInUI(ButtonsText.EnqueueAdd)?.click();
  getButtonInUI(ButtonsText.StartScheduler)!.click();
  getButtonInUI(ButtonsText.StopScheduler)!.click();

  await pauseMs(SCHEDULER_INTERVAL_SEC * 1000 * 2);
  expect(appElem.querySelector("output")!.textContent).toContain("");

})