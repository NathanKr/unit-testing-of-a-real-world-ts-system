import React, { FC } from "react";
import { DispatchedFunctionResult } from "../../types/dispatched-function";
import { Action } from "../../types/types";
import { nowFormatted } from "../common/utils";

interface IProps {
  res: DispatchedFunctionResult;
  action: Action;
}

const TaskResult: FC<IProps> = ({ res, action }) => {
  return (
    <>
      <h2>Action : {action}</h2>
      <h3>get task processing result</h3>
      <div>
        {res.status == "failure" ? 'failure' : JSON.stringify(res.result)}
      </div>
      <p>{nowFormatted()}</p>
    </>
  );
};

export default TaskResult;
