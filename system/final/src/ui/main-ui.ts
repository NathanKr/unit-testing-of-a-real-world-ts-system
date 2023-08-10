import "./style.css";
import style from "../styles/button.module.css";
import TaskDispatcher from "../lib/task-dispatcher.ts";
import TaskScheduler from "../lib/task-scheduler.ts";
import TaskQueue from "../lib/task-queue.ts";
import { Action } from "../types/types.ts";
import {
  DispatchedFunction,
  DispatchedFunctionResult,
} from "../types/dispatched-function.ts";
import { add } from "../lib/utils/dispatched-functions.ts";
import dayjs from 'dayjs'

export const SCHEDULER_INTERVAL_SEC = 2;

export function createDom() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Task Queue Manager</h1>
    <p>check the console</p>
    <p>scheduler interval : ${SCHEDULER_INTERVAL_SEC} [sec]</p>
    <button class=${style.container}>start scheduler</button>
    <button class=${style.container}>stop scheduler</button>
    <button class=${style.container}>queue length</button>
    <button class=${style.container}>enqueue add(1,2)</button>
    <button class=${style.container}>enqueue getPosts</button>
    <button class=${style.container}>is scheduler running</button>
    <br/>
    <output></output>
  </div>
`;
}

export function registerHandlers() {
  // --- create a map
  const map = new Map<Action, DispatchedFunction>();
  map.set("add", add);
  // map.set('getPosts', getPosts);

  const taskQueue = new TaskQueue();
  const oTaskDispatcher = new TaskDispatcher(map);

  const onDispatchResult = (res: DispatchedFunctionResult) => {
    let htmlAsString = `<h3>get task processing result</h3>`;

    if (res.status == "failure") {
      htmlAsString += `<div>failure</div>`;
    } else {
      let componentHtmlAsString = JSON.stringify(res.result);

      htmlAsString += `<div>${componentHtmlAsString}</div>`;
    }

    const now: string = dayjs().format("{YYYY} MM-DDTHH:mm:ss SSS [Z] A");
    document.querySelector(
      "output"
    )!.innerHTML = `<p>${now}</p>${htmlAsString}`;
  };

  const oTaskScheduler = new TaskScheduler(
    SCHEDULER_INTERVAL_SEC,
    oTaskDispatcher,
    taskQueue,
    onDispatchResult
  );

  const elemButtons = document.body.querySelectorAll("button");
  const handlers = [
    start,
    stop,
    queueLengthClickHandle,
    enqueueAdd,
    enqueueGetPosts,
    isSchedulerStarted,
  ];
  handlers.forEach((clickHandler, index) => {
    elemButtons[index].addEventListener("click", clickHandler);
  });

  function start(): void {
    oTaskScheduler.start();
  }

  function stop(): void {
    oTaskScheduler.stop();
  }

  function enqueueAdd(): void {
    // --- enqueue task
    const payload = { n1: 1, n2: 2 };
    taskQueue.enqueue({ action: "add", payload });
  }

  function enqueueGetPosts(): void {
    // --- enqueue task
    console.error(
      `enqueueGetPosts not implemented because async getPosts 
        require dispatch support for async`
    );
  }

  function queueLengthClickHandle(): void {
    console.log(`taskQueue.length() : ${taskQueue.length()}`);
  }

  function isSchedulerStarted(): void {
    console.error(
      `isSchedulerStarted not implemented because it requires
       api change in TaskScheduler`
    );
  }
}
