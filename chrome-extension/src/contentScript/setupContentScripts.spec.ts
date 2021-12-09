import { Badge } from "./Badge";
import { handleMessage } from "./handleMessage";
import { isHttpProtocol } from "../utility/isHttpProtocol";
import { mockChromeHelper } from "../test/helpers";
import { mocked } from "ts-jest/utils";
import { setupContentScripts } from "./setupContentScripts";

jest.mock("../utility/isHttpProtocol");
jest.mock("./Badge");
jest.mock("./handleMessage");

describe(`${setupContentScripts.name}`, () => {
  const mockIsHttpProtocol = mocked(isHttpProtocol);
  const mockBadge = mocked(Badge);
  const mockHandleMessage = mocked(handleMessage);
  const mockChrome = mockChromeHelper();

  function testSetup({
    isHttpProtocol = false,
  }: {
    isHttpProtocol?: boolean;
  } = {}) {
    const setup: Record<string, any> = {};

    mockIsHttpProtocol.mockImplementationOnce(() => isHttpProtocol);

    mockChrome.runtime.onMessage.addListener.mockImplementationOnce(
      (cb: () => boolean) => {
        setup.onMessageCallbackResult = cb();
      }
    );

    setupContentScripts();

    return setup;
  }

  describe("when isHttpProtocol returns false", () => {
    const isHttpProtocol = false;

    it("should do nothing", () => {
      testSetup({ isHttpProtocol });

      expect(mockBadge).not.toHaveBeenCalled();
      expect(mockChrome.runtime.onMessage.addListener).not.toHaveBeenCalled();
      expect(mockHandleMessage).not.toHaveBeenCalled();
    });
  });

  describe("when isHttpProtocol returns true", () => {
    const isHttpProtocol = true;

    it("should create badge", () => {
      testSetup({ isHttpProtocol });
      expect(mockBadge).toHaveBeenCalled();
    });

    it.todo("should init badge");

    it.todo("should mount badge");

    it("should call chrome.runtime.onMessage.addListener", () => {
      testSetup({ isHttpProtocol });
      expect(mockChrome.runtime.onMessage.addListener).toHaveBeenCalled();
    });

    describe("onMessage listener", () => {
      it("should call handleMessage", () => {
        testSetup({ isHttpProtocol });
        expect(mockHandleMessage).toHaveBeenCalled();
      });

      it("should return false", () => {
        const { onMessageCallbackResult } = testSetup({ isHttpProtocol });
        expect(onMessageCallbackResult).toBe(false);
      });
    });
  });

  it.todo("should broadcast url change");
  it.todo("should add event listener to popstate");
});
