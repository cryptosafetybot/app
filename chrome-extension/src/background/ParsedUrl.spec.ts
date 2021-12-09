import { ParsedPattern } from "./ParsedPattern";
import { ParsedUrl } from "./ParsedUrl";

describe(`${ParsedUrl.name}`, () => {
  describe(`static ${ParsedUrl.getSegments.name}`, () => {
    it.each([
      {
        url: "http://example.com/",
        expected: {
          subdomains: [],
          domain: "example",
          tld: "com",
          paths: [],
        },
      },
      {
        url: "http://sbd.example.com/",
        expected: {
          subdomains: ["sbd"],
          domain: "example",
          tld: "com",
          paths: [],
        },
      },
      {
        url: "http://example.com/path/",
        expected: {
          subdomains: [],
          domain: "example",
          tld: "com",
          paths: ["path"],
        },
      },
      {
        url: "http://example.com/longer/path/",
        expected: {
          subdomains: [],
          domain: "example",
          tld: "com",
          paths: ["longer", "path"],
        },
      },
      {
        url: "http://sbd1.sbd2.example.com/",
        expected: {
          subdomains: ["sbd1", "sbd2"],
          domain: "example",
          tld: "com",
          paths: [],
        },
      },
    ])("%j", ({ url, expected }) => {
      const result = ParsedUrl.getSegments(url);
      expect(result).toEqual(expect.objectContaining(expected));
    });
  });

  describe(`${ParsedUrl.matchString}`, () => {
    it.each([
      {
        pattern: "a",
        segment: "a",
        expected: true,
      },
      {
        pattern: "*",
        segment: "b",
        expected: true,
      },
      {
        pattern: "a",
        segment: "b",
        expected: false,
      },
    ])("%j", ({ pattern, segment, expected }) => {
      const result = ParsedUrl.matchString(pattern, segment);
      expect(result).toBe(expected);
    });
  });

  describe(`${ParsedUrl.matchString.name}`, () => {
    it.each([
      {
        pattern: ["a", "b"],
        segment: ["a", "b"],
        expected: true,
      },
      {
        pattern: ["a", "*"],
        segment: ["a", "b"],
        expected: true,
      },
      {
        pattern: ["a", "*"],
        segment: ["a", "b", "c"],
        expected: true,
      },
      {
        pattern: ["a", "b"],
        segment: ["b", "a"],
        expected: false,
      },
      {
        pattern: ["a", "b"],
        segment: ["c", "d"],
        expected: false,
      },
      {
        pattern: ["a", "b"],
        segment: ["a", "b", "c"],
        expected: false,
      },
    ])("%j", ({ pattern, segment, expected }) => {
      const result = ParsedUrl.matchArray(pattern, segment);
      expect(result).toBe(expected);
    });
  });

  describe("constructor", () => {
    const testUrl = "https://example.com/";
    const expectedResult = ParsedUrl.getSegments(testUrl);

    it("should set segments on instance correctly", () => {
      const parsedUrl = new ParsedUrl("https://example.com/");
      expect(parsedUrl.segments).toEqual(expectedResult);
    });
  });

  describe("matchAnyPattern", () => {
    it.each([
      {
        patterns: ["example.com/", "sbd.example.com/"],
        url: "https://example.com/",
        expected: true,
      },
      {
        patterns: ["example.com/", "sbd.example.com/"],
        url: "https://sbd.example.com/",
        expected: true,
      },
      {
        patterns: ["example.com/", "sbd.example.com/"],
        url: "https://notexample.com/",
        expected: false,
      },
    ])("should return expected value", ({ patterns, url, expected }) => {
      const parsedPatterns = patterns.map(
        (pattern) => new ParsedPattern(pattern)
      );
      const parsedUrl = new ParsedUrl(url);
      const result = parsedUrl.matchAnyPattern(parsedPatterns);

      expect(result).toBe(expected);
    });
  });

  describe("matchPattern", () => {
    it.each([
      {
        pattern: "example.com/",
        url: "https://example.com/",
        expected: true,
      },
      {
        pattern: "example.com/",
        url: "http://example.com/",
        expected: true,
      },
      {
        pattern: "example.com/",
        url: "https://notexample.com/",
        expected: false,
      },
      {
        pattern: "example.com/",
        url: "https://www.example.com/",
        expected: false,
      },
      {
        pattern: "example.com/",
        url: "https://example.notcom/",
        expected: false,
      },
      {
        pattern: "example.com/",
        url: "https://example.com/notpath",
        expected: false,
      },
    ])("should return expected value", ({ pattern, url, expected }) => {
      const parsedPattern = new ParsedPattern(pattern);
      const parsedUrl = new ParsedUrl(url);
      const result = parsedUrl.matchPattern(parsedPattern);

      expect(result).toBe(expected);
    });
  });
});
