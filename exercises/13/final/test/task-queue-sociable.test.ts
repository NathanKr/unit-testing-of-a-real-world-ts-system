import TaskQueue from "../src/lib/task-queue";
import { ITask } from "../src/types/i-task";
import persist from "../src/lib/persistence";
import ActionType from "../src/types/e-action-type";

const taskQueue = new TaskQueue();

beforeEach(() => {
  taskQueue.clear();
});

test("queue is empty -> length is 0", () => {
  expect(taskQueue.length).toBe(0);
});

test("queue is empty -> dequeue return falsy", () => {
  expect(taskQueue.dequeue()).toBeFalsy();
});

test("queue has few items -> length is ok", () => {
  expect(taskQueue.length).toBe(0);
  const task: ITask = {
    action: ActionType.action1,
    payload: {},
  };
  taskQueue.enqueue(task);
  expect(taskQueue.length).toBe(1);

  taskQueue.enqueue(task);
  expect(taskQueue.length).toBe(2);
});

test("queue not empty -> dequeue return correct task", () => {
  expect(taskQueue.length).toBe(0);
  const task1: ITask = {
    action: ActionType.action1,
    payload: {},
  };
  const task2: ITask = {
    action: ActionType.action2,
    payload: {},
  };
  taskQueue.enqueue(task1);
  taskQueue.enqueue(task2);

  expect(taskQueue.length).toBe(2);
});

test("persist on enqueue is ok", () => {
  expect(taskQueue.length).toBe(0);

  const task1: ITask = {
    action: ActionType.action1,
    payload: {},
  };
  taskQueue.enqueue(task1);
  expect(taskQueue.length).toBe(1);

  const taskQueue1 = new TaskQueue();
  expect(taskQueue1.length).toBe(1);
});

test("persist on dequeue is ok", () => {
  expect(taskQueue.length).toBe(0);

  const taskFirst: ITask = {
    action: ActionType.action1,
    payload: {},
  };
  const taskSecond: ITask = {
    action: ActionType.action2,
    payload: {},
  };

  taskQueue.enqueue(taskFirst);
  taskQueue.enqueue(taskSecond);
  const taskA = taskQueue.dequeue();
  expect(taskA).toBe(taskFirst);
  const taskQueue1 = new TaskQueue();
  expect(taskQueue1.length).toBe(1);
  const taskB = taskQueue1.dequeue();
  expect(taskB).toStrictEqual(taskSecond);
});

test("persist on clear is ok", () => {
  expect(taskQueue.length).toBe(0);

  const taskFirst: ITask = {
    action: ActionType.action1,
    payload: {},
  };
  const taskSecond: ITask = {
    action: ActionType.action2,
    payload: {},
  };

  taskQueue.enqueue(taskFirst);
  taskQueue.enqueue(taskSecond);
  expect(taskQueue.length).toBe(2);
  taskQueue.clear();

  const taskQueue1 = new TaskQueue();
  expect(taskQueue1.length).toBe(0);
});

test("no save in dequeue if array is empty", () => {
  expect(taskQueue.length).toBe(0);
  const spyOnPersistSave = jest.spyOn(persist, "save");
  taskQueue.dequeue();
  expect(spyOnPersistSave).toBeCalledTimes(0);
});
