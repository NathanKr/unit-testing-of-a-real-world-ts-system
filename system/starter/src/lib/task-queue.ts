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
    save();
  },

  /* --- take first task from queue head

  end              start
  ---------------------
  |   |    |    |  x  |
  ---------------------

  */
  dequeue(): ITask | undefined {
    const firstTask = queue.shift();
    save();
    return firstTask;
  },

  length() : number{
    return queue.length;
  }
};

export default taskQueue;

// -- private stuff

const queue: ITask[] = load();

function save(): void {
  persist.save(queue);
}

function load(): ITask[] {
  return persist.load();
}
