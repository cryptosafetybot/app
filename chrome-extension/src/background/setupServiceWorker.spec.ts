import { Client } from "../client/Client";
import { handleMessage } from "./handleMessage";
import { handleUrlChange } from "./handleUrlChange";
import { mockChromeHelper, mockEnvHelper } from "../test/helpers";
import { mocked } from "ts-jest/utils";
import { setupServiceWorker } from "./setupServiceWorker";
import { testSimpleHttpUrl } from "../test/sampleData";
import { Verifier } from "./Verifier";

jest.mock("../client/Client");
jest.mock("./handleUrlChange");
jest.mock("./handleMessage");
jest.mock("./Verifier");

describe(`${setupServiceWorker.name}`, () => {
  const mockChrome = mockChromeHelper();

  function testSetup() {
    const setup: Record<string, any> = {};

    mockChrome.tabs.onActivated.addListener.mockImplementationOnce(
      (cb: () => boolean) => {
        setup.onActivatedCallbackResult = cb();
      }
    );

    mockChrome.runtime.onMessage.addListener.mockImplementationOnce(
      (cb: () => boolean) => {
        setup.onMessageCallbackResult = cb();
      }
    );

    setupServiceWorker();

    return setup;
  }

  describe("REACT_APP_API_BASE_URL not defined", () => {
    mockEnvHelper("REACT_APP_API_BASE_URL", undefined);

    it("should throw", () => {
      expect(() => setupServiceWorker()).toThrow();
    });
  });

  describe("REACT_APP_API_BASE_URL defined", () => {
    const testBaseUrl = testSimpleHttpUrl;
    mockEnvHelper("REACT_APP_API_BASE_URL", testBaseUrl);

    it("should create client correctly", () => {
      testSetup();

      expect(Client).toHaveBeenCalledWith(
        expect.objectContaining({
          baseUrl: testBaseUrl,
        })
      );
    });

    it("should create verifier correctly", () => {
      testSetup();

      expect(Verifier).toHaveBeenCalled();
      expect(mocked(Verifier).mock.calls[0][0]).toBeInstanceOf(Client);
    });

    it("should call chrome.tabs.onActivated.addListener", () => {
      testSetup();
      expect(mockChrome.tabs.onActivated.addListener).toHaveBeenCalled();
    });

    describe("onActivated listener", () => {
      it("should call handleUrlChange", () => {
        testSetup();
        expect(handleUrlChange).toHaveBeenCalled();
      });

      it("should return false", () => {
        const { onActivatedCallbackResult } = testSetup();
        expect(onActivatedCallbackResult).toBe(false);
      });
    });

    it("should call chrome.runtime.onMessage.addListener", () => {
      testSetup();
      expect(mockChrome.runtime.onMessage.addListener).toHaveBeenCalled();
    });

    describe("onMessage listener", () => {
      it("should call handleMessage", () => {
        testSetup();
        expect(handleMessage).toHaveBeenCalled();
      });

      it("should return false", () => {
        const { onMessageCallbackResult } = testSetup();
        expect(onMessageCallbackResult).toBe(false);
      });
    });
  });
});
