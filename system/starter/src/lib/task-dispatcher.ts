import {
  DispatchedFunction,
  DispatchedFunctionResult,
} from "../types/dispatched-function";
import { Action, ITask } from "../types/i-task";

/*

--- i am using class because i need to initialize the object it and i 
 --- prefer to use constructor not init

 */

export default class TaskDispatcher {
  private mapActionToFunction: Map<Action, DispatchedFunction>;

  constructor(map: Map<Action, DispatchedFunction>) {
    this.mapActionToFunction = map;
    
  }

  dispatch(task: ITask): DispatchedFunctionResult {
    let res: DispatchedFunctionResult = {
      status: "failure",
      result: {},
    };
    // --- get function

    const func = this.mapActionToFunction?.get(task.action);
    if (func) {
      res.result = func(task.payload);
      res.status = "success";
    } else {
      throw new Error(`missing function for action : ${task.action}`);
    }

    // --- invoke
    return res;
  }
}
