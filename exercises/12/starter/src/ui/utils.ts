import IStudent from "../types/i-student";

export function createCalculationTimeText() : string{
    const currentTime = new Date();

  // Format the time as a string
  const formattedTime = currentTime.toLocaleTimeString();

  return `Calculation time : ${formattedTime}`;
}

export function getGrades(students : IStudent[]) : number[]{
  return students.map(it=> it.grade)
}