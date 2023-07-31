export type Action = string;
export type Payload = object;

export interface ITask{
    action : Action;
    payload : Payload;
}