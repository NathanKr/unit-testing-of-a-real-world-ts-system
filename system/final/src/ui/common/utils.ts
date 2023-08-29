import dayjs from "dayjs";

export const SCHEDULER_INTERVAL_SEC = 2;



export function taskQueueLengthFormatted(queueLength : number) : string{
  return `taskQueue.length() : ${queueLength}`
}

export function isSchedulerStartedFormatted(isStarted : boolean) : string{
  return `isSchedulerStarted : ${isStarted}`
}

export function nowFormatted(){
  return dayjs().format("{YYYY} MM-DDTHH:mm:ss SSS [Z] A");
}
