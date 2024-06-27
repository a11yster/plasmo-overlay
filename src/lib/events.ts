export const triggerEvents = (targetNode: HTMLElement, message: { prompt: string; response: string }) => {
    let eventFocus = new Event("focus");
    let inputEvent = new Event("input", { bubbles: true });
    let enterKeyEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      which: 13,
      keyCode: 13,
      bubbles: true,
    });
  
    targetNode.dispatchEvent(eventFocus);
    targetNode.innerHTML = `<p>${message.response}</p>`;
    targetNode.dispatchEvent(inputEvent);
    targetNode.dispatchEvent(enterKeyEvent);
  };
  