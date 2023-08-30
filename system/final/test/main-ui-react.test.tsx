import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import { ButtonsText, getEnumKeyValues } from "./test-utils";
import { screen, waitFor, render } from "@testing-library/react";
import ActionType from "../src/types/e-action-type";
import { SCHEDULER_INTERVAL_SEC } from "../src/ui/common/utils";
import TaskQueueManager from "../src/ui/react/task-queue-manager";
import React from "react";
import * as functions from "../src/lib/utils/dispatched-functions";
import { DispatchedFunctionResult } from "../src/types/dispatched-function";


beforeEach(() => {
  render(<TaskQueueManager />);
  vi.clearAllMocks();
});

test("button enqueueGetPosts invoked --> getPosts and 100 in output", async () => {
  userEvent.click(screen.getByText(ButtonsText.EnqueueGetPosts));
  userEvent.click(screen.getByText(ButtonsText.StartScheduler));

  const outputElem = screen.getByRole("status");
  expect(outputElem).toBeInTheDocument();

  await waitFor(
    () => {
      expect(outputElem.textContent).contain("100");
      expect(outputElem.textContent).contain(ActionType.getPosts);
    },
    { timeout: SCHEDULER_INTERVAL_SEC * 1000 * 2 }
  );
});

test("document exist", () => {
  expect(document).toBeTruthy();
});

test("heading with text : 'Task Queue Manager - React UI' is in the dom ", () => {
  const headingElem = screen.getByRole("heading");

  expect(headingElem).toBeInTheDocument();
  expect(headingElem!.textContent).toBe("Task Queue Manager - React UI");
});

test("Six buttons inside app element", () => {
    const buttonElems = screen.getAllByRole("button");
  
    expect(buttonElems.length).toBe(6);
  });

  test("The first button has correct text", () => {
    const firstButton = screen.getAllByRole( "button")[0];
  
    expect(firstButton?.textContent).toBe("start scheduler");
  });
  
  test("all buttons has correct text", () => {
    const arrayButtonsKeyValue = getEnumKeyValues(ButtonsText);
    const buttons = screen.getAllByRole("button");
  
    expect(arrayButtonsKeyValue.length).toBe(buttons.length);
  
    arrayButtonsKeyValue.forEach((bt, i) => {
      expect(bt.value).toBe(buttons[i].textContent);
    });
  });

  test("click on add -> 3 and add appears in the output", async () => {
    userEvent.click(screen.getByText( ButtonsText.EnqueueAdd));
    userEvent.click(screen.getByText( ButtonsText.StartScheduler));
  
    const outputElem = screen.getByRole( "status");
    expect(outputElem).toBeInTheDocument();
  
    await waitFor(
      () => {
        expect(outputElem.textContent).toContain(3);
        expect(outputElem.textContent).contain(ActionType.add)
      },
      { timeout: SCHEDULER_INTERVAL_SEC * 1000 * 2 }
    );
  });

  
  
test("failure status is add --> failure to appear in the ui", async () => {
    const spyOnAdd = vi.spyOn(functions, ActionType.add);
    const resFailure: Promise<DispatchedFunctionResult> = Promise.resolve({
      status: "failure",
      result: undefined,
    });
    document.body.innerHTML = "";
    spyOnAdd.mockReturnValue(resFailure);
    // registerHandlers();
    render(<TaskQueueManager />);

    
    userEvent.click(screen.getByText( ButtonsText.EnqueueAdd));
    userEvent.click(screen.getByText( ButtonsText.StartScheduler));
  
    await waitFor(
      () => {
        const outputElem = screen.getByRole("status");
        expect(outputElem.textContent).toContain("failure");
      },
      { timeout: SCHEDULER_INTERVAL_SEC * 1000 * 2 }
    );
  });

  test("enqueue , start , stop --> output is empty", async () => {
    userEvent.click(screen.getByText( ButtonsText.EnqueueAdd));
    userEvent.click(screen.getByText( ButtonsText.StartScheduler));
    userEvent.click(screen.getByText( ButtonsText.StopScheduler));
  
    await waitFor(
      () => {
        const outputElem = screen.getByRole( "status");
        expect(outputElem.textContent).toContain("");
      },
      { timeout: SCHEDULER_INTERVAL_SEC * 1000 * 2 }
    );
  });
  
  test("enqueue -> queue length is 1 --> correct value in output", async () => {
    userEvent.click(screen.getByText( ButtonsText.EnqueueAdd));
    userEvent.click(screen.getByText( ButtonsText.QueueLength));
  
    const outputElemWithText = await screen.findByText(
      "taskQueue.length() : 1"
    );
    expect(outputElemWithText).toBeInTheDocument();
  });
  
  test("button isSchedulerStarted invoked --> correct value in output", async () => {
    userEvent.click(screen.getByText( ButtonsText.IsSchedulerRunning));
    let outputElemWithText = await screen.findByText(
      "isSchedulerStarted : false"
    );
    expect(outputElemWithText).toBeInTheDocument();
  
    userEvent.click(screen.getByText( ButtonsText.StartScheduler));
    userEvent.click(screen.getByText( ButtonsText.IsSchedulerRunning));
    outputElemWithText = await screen.findByText("isSchedulerStarted : true");
    expect(outputElemWithText).toBeInTheDocument();
  });
  
  test('start , stop -> isSchedulerStarted is false',async ()=>{
    userEvent.click(screen.getByText( ButtonsText.StartScheduler));
    userEvent.click(screen.getByText( ButtonsText.IsSchedulerRunning));
    let outputElemWithText = await screen.findByText("isSchedulerStarted : true");
    expect(outputElemWithText).toBeInTheDocument();

    userEvent.click(screen.getByText( ButtonsText.StopScheduler));
    userEvent.click(screen.getByText( ButtonsText.IsSchedulerRunning));
    outputElemWithText = await screen.findByText("isSchedulerStarted : false");
    expect(outputElemWithText).toBeInTheDocument();
  })
  