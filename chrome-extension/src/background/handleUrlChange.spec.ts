import { DOMMessageType, SafetyRating } from "../types";
import { getActiveTab } from "../utility/getActiveTab";
import { handleUrlChange } from "./handleUrlChange";
import { isHttpProtocol } from "../utility/isHttpProtocol";
import { mockChromeHelper, mockOptions } from "../test/helpers";
import { mocked } from "ts-jest/utils";
import { Option, OptionsConfig } from "../components/Options/optionsConfig";
import { testTab } from "../test/sampleData";
import { Verifier } from "./Verifier";

jest.mock("../utility/getActiveTab");
jest.mock("../utility/isHttpProtocol");

describe(`${handleUrlChange.name}`, () => {
  const mockGetActiveTab = mocked(getActiveTab);
  const mockIsHttpProtocol = mocked(isHttpProtocol);
  const mockChrome = mockChromeHelper();
  const mockVerifier = {
    getSafetyRating: jest.fn(),
  } as unknown as Verifier;

  async function testSetup({
    options = {},
    activeTab = testTab,
    isHttpProtocol = true,
    safetyRating = SafetyRating.Unverified,
  }: {
    options?: Partial<OptionsConfig>;
    activeTab?: chrome.tabs.Tab;
    isHttpProtocol?: boolean;
    safetyRating?: SafetyRating;
  }) {
    mockOptions(options);
    mockGetActiveTab.mockResolvedValueOnce(activeTab);
    mockIsHttpProtocol.mockImplementationOnce(() => isHttpProtocol);
    mocked(mockVerifier.getSafetyRating).mockResolvedValueOnce(safetyRating);

    await handleUrlChange(mockVerifier);
  }

  describe("extension disabled", () => {
    it("should not call chrome.tabs.sendMessage", async () => {
      await testSetup({
        options: {
          [Option.EnableExtension]: false,
        },
      });

      expect(mockChrome.tabs.sendMessage).not.toHaveBeenCalled();
    });
  });

  describe("tab.id not set", () => {
    const testTabWithoutId = { ...testTab };
    delete testTabWithoutId.id;

    it("should not call chrome.tabs.sendMessage", async () => {
      await testSetup({
        activeTab: testTabWithoutId,
      });

      expect(mockChrome.tabs.sendMessage).not.toHaveBeenCalled();
    });
  });

  describe("tab.url not set", () => {
    const testTabWithoutUrl = { ...testTab };
    delete testTabWithoutUrl.url;

    it("should not call chrome.tabs.sendMessage", async () => {
      await testSetup({
        activeTab: testTabWithoutUrl,
      });

      expect(mockChrome.tabs.sendMessage).not.toHaveBeenCalled();
    });
  });

  describe("isHttpProtocol returns false", () => {
    it("should not call chrome.tabs.sendMessage", async () => {
      await testSetup({
        isHttpProtocol: false,
      });

      expect(mockChrome.tabs.sendMessage).not.toHaveBeenCalled();
    });
  });

  describe("isHttpProtocol returns true", () => {
    const expectedMessage = {
      type: DOMMessageType.SafetyRating,
      safetyRating: SafetyRating.Unverified,
    };

    it("should call verifier.getSafetyRating correctly", async () => {
      await testSetup({
        isHttpProtocol: true,
        activeTab: testTab,
        safetyRating: expectedMessage.safetyRating,
      });

      expect(mockVerifier.getSafetyRating).toHaveBeenCalledWith(testTab.url);
    });

    it("should call chrome.tabs.sendMessage", async () => {
      await testSetup({
        isHttpProtocol: true,
        activeTab: testTab,
        safetyRating: expectedMessage.safetyRating,
      });

      expect(mockChrome.tabs.sendMessage).toHaveBeenCalledWith(
        testTab.id,
        expect.objectContaining(expectedMessage)
      );
    });
  });
});
