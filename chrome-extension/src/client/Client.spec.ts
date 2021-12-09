import { Client } from "./Client";
import { crossFetch } from "../utility/crossFetch";
import { mocked } from "ts-jest/utils";
import { testClientConfig, testObject, testPath } from "../test/sampleData";

jest.mock("../utility/crossFetch");

describe(`${Client.name}`, () => {
  function testSetup({
    fetchResult,
  }: {
    fetchResult?: unknown;
  } = {}) {
    const setup: Record<string, any> = {};

    setup.client = new Client(testClientConfig);

    mocked(crossFetch).mockImplementationOnce(
      async () => ({ json: () => fetchResult } as unknown as Response)
    );

    return setup;
  }

  describe("constructor", () => {
    it("should set config prop on instance", () => {
      const { client } = testSetup();
      expect(client.config).toEqual(expect.objectContaining(testClientConfig));
    });
  });

  describe("get", () => {
    it("should make correct request", async () => {
      const expectedUrl = `${testClientConfig.baseUrl}${testPath}`;
      const { client } = testSetup();
      await client.get(testPath);

      expect(crossFetch).toHaveBeenCalledWith(expectedUrl);
    });

    it("should return correct result", async () => {
      const expectedResult = testObject;
      const { client } = testSetup({ fetchResult: expectedResult });
      const result = await client.get(testPath);

      expect(result).toEqual(expect.objectContaining(expectedResult));
    });
  });

  describe("whitelist", () => {
    const whitelistPath = "/whitelist";

    it("should make correct request", async () => {
      const expectedUrl = `${testClientConfig.baseUrl}${whitelistPath}`;
      const { client } = testSetup();
      await client.whitelist();

      expect(crossFetch).toHaveBeenCalledWith(expectedUrl);
    });

    it("should return correct result", async () => {
      const expectedResult = ["example.com/"];
      const { client } = testSetup({ fetchResult: expectedResult });
      const result = await client.whitelist();

      expect(result).toEqual(expect.objectContaining(expectedResult));
    });
  });

  describe("blacklist", () => {
    const blacklistPath = "/blacklist";

    it("should make correct request", async () => {
      const expectedUrl = `${testClientConfig.baseUrl}${blacklistPath}`;
      const { client } = testSetup();
      await client.blacklist();

      expect(crossFetch).toHaveBeenCalledWith(expectedUrl);
    });

    it("should return correct result", async () => {
      const expectedResult = ["example.com/"];
      const { client } = testSetup({ fetchResult: expectedResult });
      const result = await client.blacklist();

      expect(result).toEqual(expect.objectContaining(expectedResult));
    });
  });
});
