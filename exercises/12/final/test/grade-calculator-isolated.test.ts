import { expect, test, vi } from "vitest";
import { dummyLogger } from "ts-log";
import GradesCalculator from "../src/lib/grades-calculator";

const gradesCalculator = new GradesCalculator()


test("dummyLogger is called correct times with correct arguments in parseCSV -> use spyOn", () => {
  const spyOnDummyLogger = vi.spyOn(dummyLogger, "debug");
  gradesCalculator.parseCSV("");
  expect(spyOnDummyLogger).toBeCalledTimes(1);
  expect(spyOnDummyLogger).toBeCalledWith([]);

  expect(gradesCalculator.parseCSV("John Deer , 80\nMike Tyson , 22"));
  expect(spyOnDummyLogger).toBeCalledTimes(2);
  expect(spyOnDummyLogger).toBeCalledWith([80, 22]);
});

test("dummyLogger is called correct times with correct arguments in calculateAverage -> use fn", () => {
  dummyLogger.debug = vi.fn();
  gradesCalculator.calculateAverage([1, 2, 3]);
  expect(dummyLogger.debug).toBeCalledTimes(1);
  expect(dummyLogger.debug).toBeCalledWith(2);

  gradesCalculator.calculateAverage([]);
  expect(dummyLogger.debug).toBeCalledTimes(2);
  expect(dummyLogger.debug).toBeCalledWith(NaN);
});




test("console is called correct times with correct arguments in parseCSV -> use spyOn", () => {
  const gradesCalculator = new GradesCalculator(console)
    const spyOnconsole = vi.spyOn(console, "debug");
    gradesCalculator.parseCSV("");
    expect(spyOnconsole).toBeCalledTimes(1);
    expect(spyOnconsole).toBeCalledWith([]);
  
    expect(gradesCalculator.parseCSV("John Deer , 80\nMike Tyson , 22"));
    expect(spyOnconsole).toBeCalledTimes(2);
    expect(spyOnconsole).toBeCalledWith([80, 22]);
  });
  