/*

--- 1) i am using class because i need to initialize the object it and i 
---    prefer to use constructor not init

--- 2) here i have timer but in browser extension this might be alert
 */

import TaskDispatcher from "./task-dispatcher";
import TaskQueue from "./task-queue";

export default class TaskScheduler {
  constructor(
    private intervalSec: number,
    private taskDispatcher: TaskDispatcher,
    private taskQueue : TaskQueue
  ) {}

  start(): void {
    this.handler = window.setInterval(() => {
      TaskScheduler.dispatchCallback(this.taskDispatcher,this.taskQueue);
    }, this.intervalSec * 1000);
  }

  stop(): void {
    clearInterval(this.handler);
  }

  // --- static because of closure problem in setInterval
  private static dispatchCallback(_taskDispatcher: TaskDispatcher , _taskQueue : TaskQueue) {
    const task = _taskQueue.dequeue();
    if (task) {
      const res = _taskDispatcher.dispatch(task);
      console.log(res);
    } else {
      console.log(`queue is empty`);
    }
  }

  private handler: number | undefined;
}
