import {
  DispatchedFunction,
  DispatchedFunctionResult,
} from "../../types/dispatched-function";

export const add: DispatchedFunction = (obj: { n1: number; n2: number }) => {
  const res: DispatchedFunctionResult = {
    status: "success",
    result: obj.n1 + obj.n2,
  };

  return res;
};

export type AddReturn = number;


/*
todo , use after dispatch handle async operation
export const getPosts : DispatchedFunction = async ()=>{
  const res: DispatchedFunctionResult = {
    status: "failure",
    result : undefined,
  };

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts: IPost[] = await response.json();
    res.result = posts;
    res.status = "success";
  } catch (err) {
    console.error(err);
  }

  return res;
} 



 */
interface IPost {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export type GetPostsReturn = IPost[];