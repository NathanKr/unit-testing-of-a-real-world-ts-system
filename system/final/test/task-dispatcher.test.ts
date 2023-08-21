import { test, expect } from "vitest";
import TaskDispatcher from "../src/lib/task-dispatcher";
import { DispatchedFunction } from "../src/types/dispatched-function";
import { ITask } from "../src/types/i-task";
import { Action } from "../src/types/types";

test("map empty -> status is failure and error with missing action name", async () => {
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: {},
  };
  const res = await oTaskDispatcher.dispatch(task1);
  expect(res.status).toBe("failure");
  expect(res.error).toContain("action");
});

test("action not in map -> status is failure and error with missing action name", async () => {
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: {},
  };

  // --- todo fix later (refactoing \ advanced chapter) by not passing a function
  map.set("action2", () => {
    return Promise.resolve({ status: "failure", result: {} });
  });

  const res = await oTaskDispatcher.dispatch(task1);
  expect(res.status).toBe("failure");
  expect(res.error).toContain("action1");
});

test("dispatch ok -> status is success", async () => {
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: {},
  };

  // --- todo fix later (refactoing \ advanced chapter) by not passing a function
  map.set("action1", () => {
    return Promise.resolve({ status: "success", result: {} });
  });

  const res = await oTaskDispatcher.dispatch(task1);
  expect(res.status).toBe("success");
});

test("dispatch not ok -> status is failure", async () => {
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: {},
  };

  // --- todo fix later (refactoing \ advanced chapter) by not passing a function
  map.set("action1", () => {
    return Promise.resolve({ status: "failure", result: {} });
  });

  const res = await oTaskDispatcher.dispatch(task1);
  expect(res.status).toBe("failure");
});

test("dispatch result is ok for add", async () => {
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
    return Promise.resolve({
      status: "success",
      result: payload.n1 + payload.n2,
    });
  };

  map.set("action1", addDispatch);
  const res = await oTaskDispatcher.dispatch(task1);
  expect(res.status).toBe("success");
  expect(res.result).toBe(3);
});


test('dispatch function throw -> result status is failure',async ()=>{
  const map: Map<Action, DispatchedFunction> = new Map();
  const oTaskDispatcher = new TaskDispatcher(map);
  const task1: ITask = {
    action: "action1",
    payload: { },
  };

  map.set('action1',()=>{
    return Promise.reject('some error')
  })

  const res = await oTaskDispatcher.dispatch(task1);
  expect(res.status).toBe('failure');
  expect(res.error).toBe('some error')
})