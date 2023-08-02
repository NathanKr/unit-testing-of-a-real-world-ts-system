import { test, expect } from "vitest";
import TaskDispatcher from "../src/lib/task-dispatcher";
import { DispatchedFunction } from "../src/types/dispatched-function";
import { ITask } from "../src/types/i-task";
import { Action } from "../src/types/types";

test("map empty -> dispatch throw", () => {
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: {},
  };
  expect(() => oTaskDispatcher.dispatch(task1)).toThrowError();
});

test("action not in map -> dispatch throw", () => {
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: {},
  };

  // --- todo fix later (refactoing \ advanced chapter) by not passing a function
  map.set("action2", () => {
    return { status: "failure", result: {} };
  });
  expect(() => oTaskDispatcher.dispatch(task1)).toThrowError();
});

test("dispatch ok -> status is success", () => {
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: {},
  };

  // --- todo fix later (refactoing \ advanced chapter) by not passing a function
  map.set("action1", () => {
    return { status: "success", result: {} };
  });

  const res = oTaskDispatcher.dispatch(task1);
  expect(res.status).toBe("success");
});

test("dispatch not ok -> status is failure", () => {
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: {},
  };

  // --- todo fix later (refactoing \ advanced chapter) by not passing a function
  map.set("action1", () => {
    return { status: "failure", result: {} };
  });

  const res = oTaskDispatcher.dispatch(task1);
  expect(res.status).toBe("failure");
});

test("dispatch result is ok for add", () => {
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: { n1: 1, n2: 2 },
  };

  const addDispatch: DispatchedFunction = (payload: {
    n1: number;
    n2: number;
  }) => {
    return { status: "success", result: payload.n1 + payload.n2 };
  };

  map.set("action1", addDispatch);
  const res = oTaskDispatcher.dispatch(task1);
  expect(res.status).toBe("success");
  expect(res.result).toBe(3);
});
