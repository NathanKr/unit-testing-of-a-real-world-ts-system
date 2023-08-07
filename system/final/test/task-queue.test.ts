import { test, expect, beforeEach, vi } from "vitest";
import taskQueue from "../src/lib/task-queue";
import { ITask } from "../src/types/i-task";

vi.mock('../src/lib/persistence',()=>({
default : {
  load : vi.fn(() => []),
  save : vi.fn(() => {})
}
}))

beforeEach(() => {
  taskQueue.clear();
});

test("queue is empty -> length is 0", () => {
  expect(taskQueue.length()).toBe(0);
});

test("queue is empty -> dequeue return falsy", () => {
  expect(taskQueue.dequeue()).toBeFalsy();
});

test("queue has few items -> length is ok", () => {
  expect(taskQueue.length()).toBe(0);
  const task: ITask = {
    action: "action1",
    payload: {},
  };
  taskQueue.enqueue(task);
  expect(taskQueue.length()).toBe(1);

  taskQueue.enqueue(task);
  expect(taskQueue.length()).toBe(2);
});

test("queue not empty -> dequeue return correct task", () => {
  expect(taskQueue.length()).toBe(0);
  const task1: ITask = {
    action: "action1",
    payload: {},
  };
  const task2: ITask = {
    action: "action2",
    payload: {},
  };
  taskQueue.enqueue(task1);
  taskQueue.enqueue(task2);

  expect(taskQueue.length()).toBe(2);
});
