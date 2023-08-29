import React, { FC } from "react";

interface IProps {
  status: string;
}

const Status: FC<IProps> = ({ status }) => {
  return <p>{status}</p>;
};

export default Status;
