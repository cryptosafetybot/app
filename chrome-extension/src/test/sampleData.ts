import { ClientConfig } from "../client/Client";

export const testObject = { test: "object" };

export const testSimpleHttpUrl = "http://example.com/";
export const testSimpleHttpsUrl = "http://example.com/";
export const testSimpleExtUrl = "chrome-extension://xxxzzzyyy";

export const testPath = "/example";

export const testClientConfig: ClientConfig = {
  baseUrl: testSimpleHttpUrl,
};

export const testTab = {
  id: 1,
  url: testSimpleHttpUrl,
} as unknown as chrome.tabs.Tab;
