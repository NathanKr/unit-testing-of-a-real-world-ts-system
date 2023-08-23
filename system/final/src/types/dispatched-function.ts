import { Payload } from "./types";

export type DispatchedFunctionResult = {
  status: "success" | "failure";
  result: unknown; 
  error?: unknown;
};

export type DispatchedFunction = (
  payload: Payload
) => Promise<DispatchedFunctionResult>;
