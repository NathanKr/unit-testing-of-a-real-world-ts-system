/*

--- 1) i am using class because i need to initialize the object it and i 
---    prefer to use constructor not init

--- 2) here i have timer but in browser extension this might be alert
 */

import { DispatchedFunctionResult } from "../types/dispatched-function";
import { Action } from "../types/types";
import TaskDispatcher from "./task-dispatcher";
import TaskQueue from "./task-queue";

export default class TaskScheduler {
  constructor(
    private intervalSec: number,
    private taskDispatcher: TaskDispatcher,
    private taskQueue: TaskQueue,
    private onDispatchResult?: (
      res: DispatchedFunctionResult,
      action: Action
    ) => void
  ) {
    this._isStarted = false;
    this.isDispatching = false;
  }

  start(): void {
    this._isStarted = true;
    this.handler = setInterval(() => {
      this.dispatchCallback();
    }, this.intervalSec * 1000);
  }

  stop(): void {
    this._isStarted = false;
    clearInterval(this.handler);
  }

  isStarted(): boolean {
    return this._isStarted;
  }

  private async dispatchCallback() {
    if (!this.isDispatching) {
      this.isDispatching = true;
      const task = this.taskQueue.dequeue();
      if (task) {
        const res = await this.taskDispatcher.dispatch(task);
        this.onDispatchResult && this.onDispatchResult(res, task.action);
      }
      this.isDispatching = false;
    }
  }

  private handler: string | number | NodeJS.Timeout | undefined;
  private _isStarted: boolean;
  private isDispatching: boolean;
}
