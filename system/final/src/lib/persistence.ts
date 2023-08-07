// -- curently in this POC saved to local storage

import { ITask } from "../types/i-task";

const KEY = "tasks";
const persist = {
  // -- using browser extension - save chrome.storage.sync ??
  save(tasks: ITask[]): void {
    // todo nath remove later
    throw new Error('save function is not ready yet')
    const tasksAsString = JSON.stringify(tasks);
    localStorage.setItem(KEY, tasksAsString);
    console.log(KEY,tasksAsString);
  },

  load(): ITask[] {
    // todo nath remove later
    throw new Error('save function is not ready yet')

    // todo nath bring back
    // const tasksAsString = localStorage.getItem(KEY);
    // console.log(tasksAsString);
    // return tasksAsString ? JSON.parse(tasksAsString) : [];
  },
};

export default persist;
