import { Payload } from "./i-task";

export type DispatchedFunctionResult = {
  status: "success" | "failure";
  result: object;
};

export type DispatchedFunction = (payload: Payload) => DispatchedFunctionResult;
