import { expect, test, vi } from "vitest";
import { createCalculationTimeText } from "../src/ui/utils";

vi.useFakeTimers();
vi.setSystemTime(new Date(2020,2,19,12,45,29));

test("createCalculationTimeText is ok", () => {
  expect(createCalculationTimeText()).toBe("Calculation time : 12:45:29");
});
