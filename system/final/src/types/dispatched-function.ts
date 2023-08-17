import { Payload } from "./types";

export type DispatchedFunctionResult = {
  status: "success" | "failure";
  result: any; // todo nath , may be later change to unknown
  error?:any;
};

export type DispatchedFunction = (
  payload: Payload
) => Promise<DispatchedFunctionResult>;
