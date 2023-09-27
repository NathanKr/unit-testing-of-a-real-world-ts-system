import {
  DispatchedFunction,
  DispatchedFunctionResult,
} from "../../types/dispatched-function";
import { Payload } from "../../types/types";
import axios from 'axios'

export type AddArgs = { n1: number; n2: number };

function validateAddArgsIsOk(payload: Payload): boolean {
  const obj = payload as AddArgs;
  return typeof obj.n1 == "number" && typeof obj.n2 == "number";
}

export const add: DispatchedFunction = async (payload: Payload) => {
  if (!validateAddArgsIsOk(payload)) {
    return { status: "failure", result: {}, error: "validation error" };
  }

  const obj = payload as AddArgs;
  const res: DispatchedFunctionResult = {
    status: "success",
    result: obj.n1 + obj.n2,
  };

  return res;
};

export type AddReturn = number;

export const getPosts: DispatchedFunction = async () => {
  const res: DispatchedFunctionResult = {
    status: "failure",
    result: undefined,
  };  
     
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts: IPost[] = response.data;
    res.result = posts.length;
    res.status = "success";
  } catch (err) {
    res.error = err;
  }

  return res;
};

interface IPost {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export type GetPostsReturn = number;
