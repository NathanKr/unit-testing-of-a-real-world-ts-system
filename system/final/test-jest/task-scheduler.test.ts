import FakeTimers from "@sinonjs/fake-timers";
import TaskScheduler from "../src/lib/task-scheduler";
import TaskDispatcher from "../src/lib/task-dispatcher";
import { Action } from "../src/types/types";
import { DispatchedFunction } from "../src/types/dispatched-function";
import TaskQueue from "../src/lib/task-queue";
import { ITask } from "../src/types/i-task";
import { flushPromises, pauseMs } from "../test/test-utils";
import ActionType from "../src/types/e-action-type";

let fakeClock: FakeTimers.InstalledClock;
const intervalSec = 100;
const map: Map<Action, DispatchedFunction> = new Map();
map.set(ActionType.action1, () => {
  return Promise.resolve({ status: "failure", result: {} });
});
map.set(ActionType.action2, () => {
  return Promise.resolve({ status: "success", result: {} });
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

test("enqueue a task , start , wait for interval and get the result and action", async () => {
  const onDispatchResult = jest.fn();
  const taskScheduler = new TaskScheduler(
    intervalSec,
    taskDispatcher,
    taskQueue,
    onDispatchResult
  );

  const task: ITask = {
    action: ActionType.action1,
    payload: { baz: "hello" },
  };

  let time = Date.now();
  expect(time).toBe(0);

  taskQueue.enqueue(task);
  taskScheduler.start();

  expect(onDispatchResult).toBeCalledTimes(0);
  fakeClock.tick(intervalSec * 1000);
  await flushPromises();
  expect(onDispatchResult).toBeCalledTimes(1);
  expect(onDispatchResult).toBeCalledWith(
    { status: "failure", result: {} },
    ActionType.action1
  );

  fakeClock.tick(intervalSec * 1000);
  await flushPromises();
  expect(onDispatchResult).toBeCalledTimes(1);
});

test("enqueue a task , no start , wait for interval and no callback called", () => {
  const onDispatchResult = jest.fn();
  new TaskScheduler(intervalSec, taskDispatcher, taskQueue, onDispatchResult);

  const task: ITask = {
    action: ActionType.action1,
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

test("enqueue two tasks , start and atop", async () => {
  const onDispatchResult = jest.fn();
  const taskScheduler = new TaskScheduler(
    intervalSec,
    taskDispatcher,
    taskQueue,
    onDispatchResult
  );

  const task1: ITask = {
    action: ActionType.action1,
    payload: { baz: "hello" },
  };
  const task2: ITask = {
    action: ActionType.action2,
    payload: { foo: 1 },
  };

  let time = Date.now();
  expect(time).toBe(0);

  taskQueue.enqueue(task1);
  taskQueue.enqueue(task2);
  taskScheduler.start();

  expect(onDispatchResult).toBeCalledTimes(0);
  fakeClock.tick(intervalSec * 1000);
  await flushPromises();
  expect(onDispatchResult).toBeCalledTimes(1);

  taskScheduler.stop();
  fakeClock.tick(intervalSec * 1000);
  await flushPromises();
  expect(onDispatchResult).toBeCalledTimes(1);
});

test("isStarted is ok", () => {
  const taskScheduler = new TaskScheduler(
    intervalSec,
    taskDispatcher,
    taskQueue
  );

  expect(taskScheduler.isStarted()).toBe(false);
  taskScheduler.start();
  expect(taskScheduler.isStarted()).toBe(true);
  taskScheduler.stop();
  expect(taskScheduler.isStarted()).toBe(false);
});

test("long processing task casue scheduling skip", async () => {
  fakeClock.uninstall();
  const intervalSec = 1;

  const time = Date.now();
  expect(time).not.toBe(0);

  const task1: ITask = {
    action: ActionType.action3,
    payload: {},
  };

  const onDispatchResult = jest.fn();
  const taskScheduler = new TaskScheduler(
    intervalSec,
    taskDispatcher,
    taskQueue,
    onDispatchResult
  );

  map.set(ActionType.action3, async () => {
    await pauseMs(1.5 * intervalSec * 1000);
    return { status: "success", result: {} };
  });

  taskQueue.enqueue(task1);
  taskQueue.enqueue(task1);
  taskScheduler.start();

  await pauseMs(1.0 * intervalSec * 1000);
  // -- task1 start processing on inerval 1 , 1.5 sec
  expect(onDispatchResult).toBeCalledTimes(0);

  await pauseMs(1 * intervalSec * 1000);
  // -- task1 continue processing on inerval 2 , 0.5 sec to go
  expect(onDispatchResult).toBeCalledTimes(0);

  await pauseMs(0.7 * intervalSec * 1000);
  expect(onDispatchResult).toBeCalledTimes(1);

  // -- task2 start processing
  await pauseMs(0.3 * intervalSec * 1000);

  await pauseMs(1.0 * intervalSec * 1000);
  expect(onDispatchResult).toBeCalledTimes(1);

  await pauseMs(0.7 * intervalSec * 1000);
  expect(onDispatchResult).toBeCalledTimes(2);
});
