import "./style.css";
import taskQueue from "./lib/task-queue";
import { Action } from "./types/i-task";
import { DispatchedFunction } from "./types/dispatched-function";
import TaskDispatcher from "./lib/task-dispatcher";
import TaskScheduler from "./lib/task-scheduler";

(window as any).start = start;
(window as any).stop = stop;
(window as any).enqueueClickHandle = enqueueClickHandle;
(window as any).queueLengthClickHandle = queueLengthClickHandle;

// --- create a map
const map = new Map<Action, DispatchedFunction>();
map.set("add", (obj) => {
  return (obj as any).n1 + (obj as any).n2;
});

const oTaskDispatcher = new TaskDispatcher(map);
const oTaskScheduler = new TaskScheduler(2, oTaskDispatcher);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Event loop POC</h1>
    <p>check the console</p>
    <button onclick='start()'>start scheduler</button>
    <button onclick='stop()'>stop scheduler</button>
    <button onclick='enqueueClickHandle()'>enqueue</button>
    <button onclick='queueLengthClickHandle()'>queue length</button>
  </div>
`;

function start() : void{
  oTaskScheduler.start();
}

function stop() : void{
  oTaskScheduler.stop();
}

function enqueueClickHandle() : void{
  // --- enqueue task
  taskQueue.enqueue({ action: "add", payload: { n1: 1, n2: 2 } });
}

function queueLengthClickHandle(): void{
  console.log(`taskQueue.length() : ${taskQueue.length()}`);
}
