import React, { useState } from "react";
import GradesCalculator from "../lib/grades-calculator";
import "./App.css";
import { useId } from 'react';

import IStudent from "../types/i-student";
import { createCalculationTimeText, getGrades } from "./utils";

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [error, setError] = useState("");
  const fileInputId = useId();

  const gradeCalculator = new GradesCalculator(); // Initialize GradesCalculator here
  const grades = getGrades(students)
  const average = gradeCalculator.calculateAverage(grades);
  const maximum = Math.max(...grades);
  const minimum = Math.min(...grades);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files![0];
    const reader = new FileReader();

    reader.onload = function (event: ProgressEvent<FileReader>) {
      const csvData = event.target!.result as string;
      const parsedGrades = gradeCalculator.parseCSV(csvData);

      if (parsedGrades.length > 0) {
        setError("");
        setStudents(parsedGrades);
      } else {
        // Handle error
        setError("No data found in the CSV file");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Grade Calculator - React UI</h1>
      <label htmlFor={fileInputId}>Choose a csv grade file</label>
      <input id={fileInputId} type="file" onChange={handleFileChange} />
      <p style={{ color: "red" }}>{error}</p>
      <output></output>
      <table>
        {grades.length > 0 && (
          <thead>
            <tr>
              <th>Student</th>
              <th>Grade</th>
            </tr>
          </thead>
        )}
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.grade.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>{createCalculationTimeText()}</p>
        {grades.length > 0 && (
          <>
            <p>
              Average Grade: <span>{average.toFixed(2)}</span>
            </p>
            <p>
              Maximum Grade: <span>{maximum.toFixed(2)}</span>
            </p>
            <p>
              Minimum Grade: <span>{minimum.toFixed(2)}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
