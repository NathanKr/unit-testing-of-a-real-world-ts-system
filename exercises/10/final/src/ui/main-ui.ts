import GradesCalculator from "../lib/grades-calculator";
import IStudent from "../types/i-student";
import "./styles.css";
import { createCalculationTimeText } from "./utils";

const gradesCalculator = new GradesCalculator()

export function createDom() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div>
        <h1>Grade Calculator</h1>
        <label for="csvFileInput">Choose a csv grade file</label>
        <input type="file" id="csvFileInput" />
        <output style="color:red" id="error"></output>
        <table id="gradeTable">
        </table>
        <div id="results">
            <p id="time"></p>
            <p>Average Grade: <span id="average"></span></p>
            <p>Maximum Grade: <span id="maximum"></span></p>
            <p>Minimum Grade: <span id="minimum"></span></p>
        </div>
    </div>
  `;
}

export function registerHandlers() {
  document
    .getElementById("csvFileInput")!
    .addEventListener("change", handleFile);
}

// Function to update the time
function updateCalculationTime() {
  // Update the content of the 'time' div with the current time
  document.getElementById("time")!.textContent = createCalculationTimeText();
}

function handleFile(e: Event) {
  const fileInput = e.target as HTMLInputElement;
  const file = fileInput.files![0];
  const reader = new FileReader();

  reader.onload = function (event: ProgressEvent<FileReader>) {
    const csvData = event.target!.result as string;
    const students = gradesCalculator.parseCSV(csvData);
    const grades: number[] = students.map((it) => it.grade);

    if (students.length > 0) {
      displayTable(students);
      calculateResults(grades);
    } else {
      // alert("No data found in the CSV file.");
      document.getElementById("error")!.innerHTML =
        "<p>No data found in the CSV file</p>";
    }
  };

  reader.readAsText(file);
}

function displayTable(students: IStudent[]) {
  // --- todo nath fix any with table
  const table = document.getElementById("gradeTable")! as HTMLTableElement;
  table.innerHTML = "";

  const headerRow = table.insertRow(0);
  const headerCell1 = headerRow.insertCell(0);
  const headerCell2 = headerRow.insertCell(1);

  headerCell1.textContent = "Student";
  headerCell2.textContent = "Grade";

  for (let i = 0; i < students.length; i++) {
    const row = table.insertRow(i + 1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    cell1.textContent = students[i].name;
    cell2.textContent = students[i].grade.toString();
  }
}

function calculateResults(grades: number[]) {
  const average = gradesCalculator.calculateAverage(grades);
  const maximum = Math.max(...grades);
  const minimum = Math.min(...grades);

  updateCalculationTime();
  document.getElementById("average")!.textContent = average.toFixed(2);
  document.getElementById("maximum")!.textContent = maximum.toFixed(2);
  document.getElementById("minimum")!.textContent = minimum.toFixed(2);
}
