import {
  DispatchedFunction,
  DispatchedFunctionResult,
} from "../types/dispatched-function";
import { ITask } from "../types/i-task";
import { Action } from "../types/types";

/*

--- i am using class because i need to initialize the object it and i 
 --- prefer to use constructor not init

 */

export default class TaskDispatcher {
  private mapActionToFunction: Map<Action, DispatchedFunction>;

  constructor(map: Map<Action, DispatchedFunction>) {
    this.mapActionToFunction = map;
    
  }

  dispatch(task: ITask): DispatchedFunctionResult | never  {
    let res: DispatchedFunctionResult = {
      status: "failure",
      result: {},
    };
    // --- get function

    const func = this.mapActionToFunction?.get(task.action);
    if (func) {
      res = func(task.payload);
    } else {
      throw new Error(`missing function for action : ${task.action}`);
    }

    // --- invoke
    return res;
  }
}
