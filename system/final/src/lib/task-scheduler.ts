/*

--- 1) i am using class because i need to initialize the object it and i 
---    prefer to use constructor not init

--- 2) here i have timer but in browser extension this might be alert
 */

import { DispatchedFunctionResult } from "../types/dispatched-function";
import TaskDispatcher from "./task-dispatcher";
import TaskQueue from "./task-queue";

export default class TaskScheduler {
  constructor(
    private intervalSec: number,
    private taskDispatcher: TaskDispatcher,
    private taskQueue: TaskQueue,
    private onDispatchResult?: (res: DispatchedFunctionResult) => void
  ) {
    this._isStarted = false;
  }

  start(): void {
    this._isStarted = true;
    this.handler = window.setInterval(() => {
      TaskScheduler.dispatchCallback(
        this.taskDispatcher,
        this.taskQueue,
        this.onDispatchResult
      );
    }, this.intervalSec * 1000);
  }

  stop(): void {
    this._isStarted = false;
    clearInterval(this.handler);
  }

  isStarted(): boolean {
    return this._isStarted;
  }
  // --- static because of closure problem in setInterval
  private static async dispatchCallback(
    _taskDispatcher: TaskDispatcher,
    _taskQueue: TaskQueue,
    _onDispatchResult?: (res: DispatchedFunctionResult) => void
  ) {
    const task = _taskQueue.dequeue();
    if (task) {
      const res = await _taskDispatcher.dispatch(task);
      _onDispatchResult && _onDispatchResult(res);
    } else {
      // console.log(`queue is empty`);
    }
  }

  private handler: number | undefined;
  private _isStarted: boolean;
}
