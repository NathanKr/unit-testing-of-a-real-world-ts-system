import { ITask } from "../types/i-task";
import persist from "./persistence";

const taskQueue = {
  /* --- insert at queue end

  end              start
  ---------------------
  |  x |    |    |    |
  ---------------------
  
  */
  enqueue(task: ITask): void {
    //put value on end of queue
    queue.push(task);
    // save();todo nath bring back
  },

  /* --- take first task from queue head

  end              start
  ---------------------
  |   |    |    |  x  |
  ---------------------

  */
  dequeue(): ITask | undefined {
    const firstTask = queue.shift();
    // save();todo nath bring back

    // todo nath no need to save if ifrstTask is null
    return firstTask;
  },

  length(): number {
    return queue.length;
  },

  clear(): void {
    queue.length = 0;
    // save();todo nath bring back
  },
};

export default taskQueue;

// -- private stuff

const queue: ITask[] =[];// todo nath bring back = load();

// function save(): void {
//   persist.save(queue);
// }

// function load(): ITask[] {
//   return persist.load();
// }
