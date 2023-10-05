import { ITask } from "../types/i-task";
import persist from "./persistence";

class TaskQueue{

/* --- insert at queue end

  end              start
  ---------------------
  |  x |    |    |    |
  ---------------------
  
  */
  enqueue(task: ITask): void {
    //put value on end of queue
    this.queue.push(task);
    this.save();
  }

  /* --- take first task from queue head

  end              start
  ---------------------
  |   |    |    |  x  |
  ---------------------

  */
  dequeue(): ITask | undefined {
    const firstTask = this.queue.shift();
    if (firstTask){
      this.save();
    }
    

    return firstTask;
  }

  get length() : number {
    return this.queue.length;
  }

  clear(): void {
    this.queue.length = 0;
    this.save();
  }

  private save(): void {
    persist.save(this.queue);
  }
  
 private  load(): ITask[] {
    return persist.load();
  }

  private queue: ITask[] = this.load();
}




export default TaskQueue;







