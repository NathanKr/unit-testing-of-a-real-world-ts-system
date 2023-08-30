import React, { useEffect, useState } from "react";
import "../style.css";
import style from "../../styles/button.module.css";
import {
  SCHEDULER_INTERVAL_SEC,
  isSchedulerStartedFormatted,
  taskQueueLengthFormatted,
} from "../common/utils";
import { Action } from "../../types/types";
import { DispatchedFunctionResult } from "../../types/dispatched-function";
import TaskResult from "./task-result";
import Status from "./status";
import TaskQueueSystemForUi from "../common/task-queue-system-for-ui";

let oTaskQueueSystemForUi: TaskQueueSystemForUi;

function TaskQueueManager() {
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<{
    res: DispatchedFunctionResult;
    action: Action;
  } | null>();
  function onDispatchResult(res: DispatchedFunctionResult, action: Action) {
    setResult({ action, res });
  }
  useEffect(() => {
    oTaskQueueSystemForUi = new TaskQueueSystemForUi(onDispatchResult);
  }, []);

  const queueLengthClickHandler = () => {
    setResult(null);
    setStatus(taskQueueLengthFormatted(oTaskQueueSystemForUi.taskQueue.length));
  };

  const isSchedulerRunningClickHandler = () => {
    setResult(null);
    setStatus(
      isSchedulerStartedFormatted(
        oTaskQueueSystemForUi.taskScheduler.isStarted()
      )
    );
  };

  const resElem = result && (
    <TaskResult res={result.res} action={result.action} />
  );
  const outputElem = result ? resElem : <Status status={status} />;

  return (
    <div>
      <h1>Task Queue Manager - React UI</h1>
      <p>scheduler interval : {SCHEDULER_INTERVAL_SEC} [sec]</p>
      <button onClick={() => oTaskQueueSystemForUi.start()} className={style.container}>
        start scheduler
      </button>
      <button onClick={() => oTaskQueueSystemForUi.stop()} className={style.container}>
        stop scheduler
      </button>
      <button onClick={queueLengthClickHandler} className={style.container}>
        queue length
      </button>
      <button onClick={() => oTaskQueueSystemForUi.enqueueAdd()} className={style.container}>
        enqueue add(1,2)
      </button>
      <button onClick={() => oTaskQueueSystemForUi.enqueueGetPosts()} className={style.container}>
        enqueue getPosts
      </button>
      <button
        onClick={isSchedulerRunningClickHandler}
        className={style.container}
      >
        is scheduler running
      </button>
      <br />
      <output>{outputElem}</output>
    </div>
  );
}

export default TaskQueueManager;
