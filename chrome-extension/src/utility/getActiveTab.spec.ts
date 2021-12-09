import { getActiveTab } from "../utility/getActiveTab";
import { mockChromeHelper } from "../test/helpers";

const testActiveTab = { url: "example.com" } as unknown as chrome.tabs.Tab;
const testActiveTabWithoutUrl = {} as unknown as chrome.tabs.Tab;

describe(`${getActiveTab.name}`, () => {
  const mockedChrome = mockChromeHelper();

  function mockQueryResultOnce(result: chrome.tabs.Tab[] | void[]) {
    mockedChrome.tabs.query.mockImplementationOnce(
      (_qi: unknown, cb: (result: unknown) => unknown) => cb(result)
    );
  }

  describe("valid result", () => {
    const expectedResult = testActiveTab;
    let result: chrome.tabs.Tab;

    beforeEach(async () => {
      mockQueryResultOnce([expectedResult]);
      result = await getActiveTab();
    });

    it("should call chrome.tabs.query correctly", () => {
      expect(mockedChrome.tabs.query).toHaveBeenCalledWith(
        expect.objectContaining({ active: true, currentWindow: true }),
        expect.any(Function)
      );
    });

    it("should resolve correctly", () => {
      expect(result).toBe(expectedResult);
    });
  });

  describe("undefined tab", () => {
    beforeEach(() => {
      mockQueryResultOnce([]);
    });

    it("should reject", async () => {
      await expect(async () => await getActiveTab()).rejects.toBeDefined();
    });
  });

  describe("undefined tab.url", () => {
    const expectedResult = testActiveTabWithoutUrl;
    let result: chrome.tabs.Tab;

    beforeEach(async () => {
      mockQueryResultOnce([expectedResult]);
      result = await getActiveTab();
    });

    it("should resolve correctly", () => {
      expect(result).toBe(expectedResult);
    });
  });
});
