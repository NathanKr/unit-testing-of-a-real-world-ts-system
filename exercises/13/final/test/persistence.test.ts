import persist from "../src/lib/persistence";
import { ITask } from "../src/types/i-task";
import ActionType from "../src/types/e-action-type";

beforeEach(()=>{
  persist.save([])
  jest.clearAllMocks()
})

/*test("localStorage is not null", () => {
  expect(localStorage).not.toBe(null);
});

test("localStorage set  get are working ok", () => {
  localStorage.setItem("key1", "val1");

  expect(localStorage.getItem("key1")).toBe("val1");
});*/

test("persist.load() from empty storage in []", () => {
  const tasks = persist.load();
  expect(tasks.length).toBe(0);
});

test("save one task and load one task -> is ok", () => {
  const task1: ITask = {
    action: ActionType.action1,
    payload: { foo: 1 },
  };

  const tasks: ITask[] = [task1];
  persist.save(tasks);
  const tasksLoaded = persist.load();
  expect(tasksLoaded.length).toBe(1);
  expect(tasksLoaded[0].payload).toEqual({ foo: 1 });
  expect(tasksLoaded).toEqual(tasks);
});

test("save two tasks and load two tasks -> is ok", () => {
  const task1: ITask = {
    action: ActionType.action1,
    payload: { foo: 1 },
  };
  const task2: ITask = {
    action: ActionType.action2,
    payload: { bar: 2 },
  };

  const tasks: ITask[] = [task1, task2];
  persist.save(tasks);
  const tasksLoaded = persist.load();
  expect(tasksLoaded.length).toBe(2);
  expect(tasksLoaded).toEqual(tasks);
});

test("save one task  -> console.log is called once", () => {
  const task1: ITask = {
    action: ActionType.action1,
    payload: { foo: 1 },
  };

  const tasks: ITask[] = [task1];
  const spyOnConsoleLog = jest.spyOn(console, "log");
  persist.save(tasks);
  expect(spyOnConsoleLog).toBeCalledTimes(1);
});

test("load -> console.log is called once", () => {
  const spyOnConsoleLog = jest.spyOn(console, "log");
  persist.load();
  expect(spyOnConsoleLog).toBeCalledTimes(1);
});

test("save one task  -> console.log is called with correct args", () => {
  const task1: ITask = {
    action: ActionType.action1,
    payload: { foo: 1 },
  };

  const tasks: ITask[] = [task1];
  const spyOnConsoleLog = jest.spyOn(console, "log");
  const tasksAsString = JSON.stringify(tasks);
  persist.save(tasks);
  expect(spyOnConsoleLog).toBeCalledWith(tasksAsString);
  expect(spyOnConsoleLog).toHaveReturnedWith(undefined);
});

/*
test("load -> console.log is called with correct args", () => {
  const spyOnConsoleLog = jest.spyOn(console, "log");
  persist.load();
  const KEY = "tasks";

  const tasksAsString = localStorage.getItem(KEY);
  expect(spyOnConsoleLog).toBeCalledWith(tasksAsString);
  expect(spyOnConsoleLog).toHaveReturnedWith(undefined);
});


test("load -> getItem of localStorage is called", () => {
  const spyLocalSorageGetItem = jest.spyOn(Storage.prototype, "getItem");
  persist.load();
  expect(spyLocalSorageGetItem).toBeCalledTimes(1);
});

test('save -> saveItem of localStorage is called',()=>{
    const spyLocalSorageGetItem = jest.spyOn(Storage.prototype, "setItem");

    const task1: ITask = {
        action: ActionType.action1,
        payload: { foo: 1 },
      };
    
      const tasks: ITask[] = [task1];
      persist.save(tasks);
      expect(spyLocalSorageGetItem).toBeCalledTimes(1);
})*/
