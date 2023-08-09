import { test, expect, beforeEach, afterEach, vi } from "vitest";
import FakeTimers from "@sinonjs/fake-timers";
import TaskScheduler from "../src/lib/task-scheduler";
import TaskDispatcher from "../src/lib/task-dispatcher";
import { Action } from "../src/types/types";
import { DispatchedFunction } from "../src/types/dispatched-function";
import TaskQueue from "../src/lib/task-queue";
import { ITask } from "../src/types/i-task";

let fakeClock: FakeTimers.InstalledClock;
const intervalSec = 100;
const map: Map<Action, DispatchedFunction> = new Map();
map.set("action1", () => {
  return { status: "failure", result: {} };
});
map.set("action2", () => {
  return { status: "success", result: {} };
});

const taskDispatcher: TaskDispatcher = new TaskDispatcher(map);
const taskQueue = new TaskQueue();

beforeEach(() => {
  fakeClock = FakeTimers.install();
});

afterEach(() => {
  fakeClock.uninstall();
  taskQueue.clear();
});

test("fake timer start with zero", () => {
  const time = Date.now();
  expect(time).toBe(0);
});

test("progress the fake time using tics function", () => {
  let time = Date.now();
  expect(time).toBe(0);

  fakeClock.tick(50000); // progress the clock by 50000 ms
  time = Date.now();
  expect(time).toBe(50000);
});

test("enqueue a task , start , wait for interval and get the result", () => {
  const onDispatchResult = vi.fn();
  const taskScheduler = new TaskScheduler(
    intervalSec,
    taskDispatcher,
    taskQueue,
    onDispatchResult
  );

  const task: ITask = {
    action: "action1",
    payload: { baz: "hello" },
  };

  let time = Date.now();
  expect(time).toBe(0);

  taskQueue.enqueue(task);
  taskScheduler.start();

  expect(onDispatchResult).toBeCalledTimes(0);
  fakeClock.tick(intervalSec * 1000);
  expect(onDispatchResult).toBeCalledTimes(1);
  expect(onDispatchResult).toBeCalledWith({ status: "failure", result: {} });
  fakeClock.tick(intervalSec * 1000);
  expect(onDispatchResult).toBeCalledTimes(1);
});

test("enqueue a task , no start , wait for interval and no callback called", () => {
  const onDispatchResult = vi.fn();
  new TaskScheduler(intervalSec, taskDispatcher, taskQueue, onDispatchResult);

  const task: ITask = {
    action: "action1",
    payload: { baz: "hello" },
  };

  let time = Date.now();
  expect(time).toBe(0);

  taskQueue.enqueue(task);
  //   taskScheduler.start();

  expect(onDispatchResult).toBeCalledTimes(0);
  fakeClock.tick(intervalSec * 1000);
  expect(onDispatchResult).toBeCalledTimes(0);
});

test("enqueue two tasks , start and atop", () => {
    const onDispatchResult = vi.fn();
    const taskScheduler = new TaskScheduler(
      intervalSec,
      taskDispatcher,
      taskQueue,
      onDispatchResult
    );
  
    const task1: ITask = {
      action: "action1",
      payload: { baz: "hello" },
    };
    const task2: ITask = {
        action: "action2",
        payload: { foo: 1 },
      };
  
    let time = Date.now();
    expect(time).toBe(0);
  
    taskQueue.enqueue(task1);
    taskQueue.enqueue(task2);
    taskScheduler.start();
  
    expect(onDispatchResult).toBeCalledTimes(0);
    fakeClock.tick(intervalSec * 1000);
    expect(onDispatchResult).toBeCalledTimes(1);
    taskScheduler.stop();
    fakeClock.tick(intervalSec * 1000);
    expect(onDispatchResult).toBeCalledTimes(1);
});
