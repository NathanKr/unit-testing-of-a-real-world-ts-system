import TaskDispatcher from "../../lib/task-dispatcher";
import TaskQueue from "../../lib/task-queue";
import TaskScheduler from "../../lib/task-scheduler";
import { add, getPosts } from "../../lib/utils/dispatched-functions";
import { DispatchedFunction } from "../../types/dispatched-function";
import ActionType from "../../types/e-action-type";
import { Action, OnDispatchResult } from "../../types/types";
import { SCHEDULER_INTERVAL_SEC } from "./utils";

export default class TaskQueueSystemForUi {
  constructor(private onDispatchResult: OnDispatchResult) {
    const map = new Map<Action, DispatchedFunction>();
    map.set(ActionType.add, add);
    map.set(ActionType.getPosts, getPosts);

    this._taskQueue = new TaskQueue();
    this.taskDispatcher = new TaskDispatcher(map);
    this._taskScheduler = new TaskScheduler(
      SCHEDULER_INTERVAL_SEC,
      this.taskDispatcher,
      this._taskQueue,
      this.onDispatchResult
    );
  }


  get taskScheduler() : TaskScheduler{
    return this._taskScheduler
  } 

  get taskQueue() : TaskQueue{
    return this._taskQueue
  } 

  start(): void {
    this._taskScheduler.start();
  }

  stop(): void {
    this._taskScheduler.stop();
  }

  enqueueAdd(): void {
    // --- enqueue task
    const payload = { n1: 1, n2: 2 };
    console.log('Enqueue in called');
    this._taskQueue.enqueue({ action: ActionType.add, payload });
  }

  enqueueGetPosts(): void {
    // --- enqueue task getPosts
    const payload = null;
    this._taskQueue.enqueue({ action: ActionType.getPosts, payload });
  }

  private _taskScheduler: TaskScheduler;
  private _taskQueue: TaskQueue;
  private taskDispatcher: TaskDispatcher;
}
