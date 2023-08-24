import IPersistStorage from "../types/i-persist-storage";

const KEY = "tasks";

export default class LocalStoragePersist implements IPersistStorage {
  getValue(): string | null {
    return localStorage.getItem(KEY);
  }
  setValue(value: string): void {
    localStorage.setItem(KEY, value);
  }
}
