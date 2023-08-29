import "../style.css";
import style from "../../styles/button.module.css";
import { Action, OnDispatchResult } from "../../types/types.ts";
import { DispatchedFunctionResult } from "../../types/dispatched-function.ts";
import {
  SCHEDULER_INTERVAL_SEC,
  isSchedulerStartedFormatted,
  nowFormatted,
  taskQueueLengthFormatted,
} from "../common/utils.ts";
import TaskQueueSystemForUi from "../common/task-queue-system-for-ui.ts";

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
  const onDispatchResult: OnDispatchResult = (
    res: DispatchedFunctionResult,
    action: Action
  ) => {
    let htmlAsString = `<h2>Action : ${action}</h2><h3>get task processing result</h3>`;

    if (res.status == "failure") {
      htmlAsString += `<div>failure</div>`;
    } else {
      let componentHtmlAsString = JSON.stringify(res.result);

      htmlAsString += `<div>${componentHtmlAsString}</div>`;
    }

    const now: string = nowFormatted();
    document.querySelector(
      "output"
    )!.innerHTML = `<p>${now}</p>${htmlAsString}`;
  };

  const oTaskQueueSystemForUi = new TaskQueueSystemForUi(onDispatchResult);
  const elemButtons = document.body.querySelectorAll("button");
  const handlers = [
    () => oTaskQueueSystemForUi.start(),
    () => oTaskQueueSystemForUi.stop(),
    queueLengthClickHandle,
    () => oTaskQueueSystemForUi.enqueueAdd(),
    () => oTaskQueueSystemForUi.enqueueGetPosts(),
    isSchedulerStarted,
  ];
  handlers.forEach((clickHandler, index) => {
    elemButtons[index].addEventListener("click", clickHandler);
  });

  function queueLengthClickHandle(): void {
    document.querySelector("output")!.innerHTML = taskQueueLengthFormatted(
      oTaskQueueSystemForUi.taskQueue.length
    );
  }

  function isSchedulerStarted(): void {
    document.querySelector("output")!.innerHTML = isSchedulerStartedFormatted(
      oTaskQueueSystemForUi.taskScheduler.isStarted()
    );
  }
}
