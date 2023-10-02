import IStudent from "../types/i-student";
import * as math from "./math";

export function parseCSV(csvData: string): IStudent[] {
  const lines = csvData.split("\n");
  const students: IStudent[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length > 0) {
      const parts = line.split(",");

      const student : IStudent = {
        name: parts[0].trim(),
        grade: parseFloat(parts[1])
      }
      
      if (!isNaN(student.grade)) {
        students.push(student);
      }
    }
  }

  return students;
}

export function calculateAverage(grades: number[]): number {
  return math.calculateAverage(grades);
}
