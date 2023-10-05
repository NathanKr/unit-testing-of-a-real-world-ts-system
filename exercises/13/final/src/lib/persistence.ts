// -- curently in this POC saved to local storage

import IPersistStorage from "../types/i-persist-storage";
import { ITask } from "../types/i-task";
import ServerFilePersist from "./server-file-persist";

class Persist {
  constructor(private storage : IPersistStorage){

  }

  save(tasks: ITask[]): void {
    const tasksAsString = JSON.stringify(tasks);
    this.storage.setValue(tasksAsString)
    console.log(tasksAsString);
  }

  load(): ITask[] {
    const tasksAsString = this.storage.getValue();
    console.log(tasksAsString);
    return tasksAsString ? JSON.parse(tasksAsString) : [];
  }
};

const persist = new Persist(new ServerFilePersist());
export default persist;
