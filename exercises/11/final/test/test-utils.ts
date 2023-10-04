// --- used to resolve the promise in callback e.g. in setInerval
export const flushPromises = () => new Promise((res) => process.nextTick(res));

export enum ButtonsText {
  StartScheduler = "start scheduler",
  StopScheduler = "stop scheduler",
  QueueLength = "queue length",
  EnqueueAdd = "enqueue add(1,2)",
  EnqueueGetPosts = "enqueue getPosts",
  IsSchedulerRunning = 'is scheduler running'
}

export interface IEnumKeyValue {
  key: string;
  value: string;
}

export function getEnumKeyValues(_enum: Object): IEnumKeyValue[] {
  const enumKeyValues: IEnumKeyValue[] = [];

  for (const [key, value] of Object.entries(_enum)) {
    const item: IEnumKeyValue = { key, value };
    enumKeyValues.push(item);
  }

  return enumKeyValues;
}

export function getButtonInUI(
  text: ButtonsText
): HTMLButtonElement | undefined {
  const buttons = document.querySelectorAll("button");

  return Array.from(buttons).find((bt) => bt.textContent == text);
}

export function pauseMs(sleepMs: number): Promise<unknown> {
  return new Promise((resolve) => {
    setInterval(() => resolve(null), sleepMs);
  });
}
