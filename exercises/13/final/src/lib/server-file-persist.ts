import IPersistStorage from "../types/i-persist-storage";
import path from "path";
import fs from "fs";

const fileName = "server-persist.txt";
const DirName = "data";

export default class ServerFilePersist implements IPersistStorage {
  
  getRelativePath(): string {
    return path.resolve(DirName, fileName);
  }

  getValue(): string | null {
    const buffer = fs.readFileSync(this.getRelativePath());
    return buffer.toString();
  }

  setValue(value: string): void {
    fs.writeFileSync(this.getRelativePath(), value);
  }
}
