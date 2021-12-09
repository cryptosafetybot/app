import { DOMMessageType } from "../types";
import { handleMessage } from "./handleMessage";

describe(`${handleMessage.name}`, () => {
  describe(`msg.type=${DOMMessageType.UrlChange}`, () => {
    it.todo("should call handleUrlChange");
  });

  describe(`msg.type=${DOMMessageType.UpdateOptions}`, () => {
    it.todo("should relay to active tab");
    it.todo("should call handleUrlChange");
  });
});
