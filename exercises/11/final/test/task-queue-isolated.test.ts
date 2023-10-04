import { test, expect, beforeEach, vi } from "vitest";
import TaskQueue from "../src/lib/task-queue";
import { ITask } from "../src/types/i-task";
import persist from '../src/lib/persistence'
import ActionType from "../src/types/e-action-type";

const taskQueue = new TaskQueue();

vi.mock('../src/lib/persistence',()=>({
default : {
  load : vi.fn(() => []),
  save : vi.fn()
}
}))

beforeEach(() => {
  taskQueue.clear();
  vi.clearAllMocks();
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

test('persist.load is called for new TaskQueue',()=>{
  new TaskQueue();
  expect(persist.load).toBeCalledTimes(1);
})

test('persist.save is called on enqueue with correct arguments',()=>{
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
  expect(persist.save).toBeCalledTimes(1);
  expect(persist.save).toBeCalledWith([task1])

  taskQueue.enqueue(task2);
  expect(persist.save).toBeCalledTimes(2);
  expect(persist.save).toBeCalledWith([task1 , task2])
})

test('persist.save is called on dequeue ',()=>{
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
  expect(persist.save).toBeCalledTimes(2);
  taskQueue.dequeue();
  expect(persist.save).toBeCalledTimes(3);
})

test('save is called on clear',()=>{
  taskQueue.clear();
  expect(persist.save).toBeCalledTimes(1);
  expect(persist.save).toBeCalledWith([])
})
