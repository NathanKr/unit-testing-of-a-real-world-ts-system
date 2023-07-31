// -- curently in this POC saved to local storage

import { ITask } from "../types/i-task";

const KEY = "tasks";
const persist = {
  // -- using browser extension - save chrome.storage.sync ??
  save(tasks: ITask[]): void {
    const tasksAsString = JSON.stringify(tasks);
    localStorage.setItem(KEY, tasksAsString);
  },

  load(): ITask[] {
    const tasksAsString = localStorage.getItem(KEY);
    return tasksAsString ? JSON.parse(tasksAsString) : [];
  },
};

export default persist;
