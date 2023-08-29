import { test, expect } from "vitest";
import TaskQueueManager from "../src/ui/react/task-queue-manager";
import React from "react";
import ReactDOM from "react-dom";

test('React text appear in the DOM -> using jsdom',()=>{
    const container = document.createElement('div');
    document.body.appendChild(container)
    ReactDOM.render(<TaskQueueManager/>,container);
    const h1Elem = document.querySelector('h1');
    expect(h1Elem).toBeInTheDocument();
    expect(h1Elem?.textContent).contain('React')
})