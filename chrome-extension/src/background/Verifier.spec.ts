import { Client } from "../client/Client";
import { MemoizedFunction } from "lodash";
import { mocked } from "ts-jest/utils";
import { ParsedPattern } from "./ParsedPattern";
import { SafetyRating } from "../types";
import { testClientConfig } from "../test/sampleData";
import { Verifier } from "./Verifier";

jest.mock("../client/Client");

describe(`${Verifier.name}`, () => {
  const mockClient = new Client(testClientConfig);

  function testSetup({
    whitelist = [],
    blacklist = [],
  }: {
    whitelist?: string[];
    blacklist?: string[];
  } = {}) {
    const setup: Record<string, any> = {};

    mocked(mockClient.whitelist).mockResolvedValueOnce(whitelist);
    mocked(mockClient.blacklist).mockResolvedValueOnce(blacklist);

    setup.verifier = new Verifier(mockClient as unknown as Client);

    return setup;
  }

  describe("constructor", () => {
    it("should memoize getLists", () => {
      const { verifier } = testSetup();

      const mFn = verifier.getLists as unknown as MemoizedFunction;
      expect(mFn.cache).toBeDefined();
    });

    it("should memoize getSafetyRaing", () => {
      const { verifier } = testSetup();

      const mFn = verifier.getSafetyRating as unknown as MemoizedFunction;
      expect(mFn.cache).toBeDefined();
    });
  });

  describe("getLists", () => {
    const whitelist = ["example.com/"];
    const blacklist = ["example.com/"];

    it("should return correctly parsed lists", async () => {
      const { verifier } = testSetup({ whitelist, blacklist });
      const result = await verifier.getLists();

      expect(result.whitelist[0]).toBeInstanceOf(ParsedPattern);
      expect(result.whitelist[0]).toEqual(new ParsedPattern(whitelist[0]));
      expect(result.whitelist).toHaveLength(1);

      expect(result.blacklist[0]).toBeInstanceOf(ParsedPattern);
      expect(result.blacklist[0]).toEqual(new ParsedPattern(blacklist[0]));
      expect(result.blacklist).toHaveLength(1);
    });
  });

  describe("getSafetyRating", () => {
    const whitelist = ["example.com/whitelist"];
    const blacklist = ["example.com/blacklist"];
    const urlOnWhitelist = "http://example.com/whitelist";
    const urlOnBlacklist = "http://example.com/blacklist";
    const urlOnNoList = "http://example.com/nolist";

    describe("url is on whitelist", () => {
      it(`should return ${SafetyRating.Verified}`, async () => {
        const { verifier } = testSetup({ whitelist, blacklist });
        const result = await verifier.getSafetyRating(urlOnWhitelist);

        expect(result).toBe(SafetyRating.Verified);
      });
    });

    describe("url is on blacklist", () => {
      it(`should return ${SafetyRating.Blocked}`, async () => {
        const { verifier } = testSetup({ whitelist, blacklist });
        const result = await verifier.getSafetyRating(urlOnBlacklist);

        expect(result).toBe(SafetyRating.Blocked);
      });
    });

    describe("url is not on any list", () => {
      it(`should return ${SafetyRating.Unverified}`, async () => {
        const { verifier } = testSetup({ whitelist, blacklist });
        const result = await verifier.getSafetyRating(urlOnNoList);

        expect(result).toBe(SafetyRating.Unverified);
      });
    });
  });
});
