import { ParsedPattern } from "./ParsedPattern";

describe(`${ParsedPattern.name}`, () => {
  describe(`static ${ParsedPattern.getSegments.name}`, () => {
    it.each([
      {
        pattern: "example.com/",
        expected: {
          subdomains: [],
          domain: "example",
          tld: "com",
          paths: [],
        },
      },
      {
        pattern: "sbd.example.com/",
        expected: {
          subdomains: ["sbd"],
          domain: "example",
          tld: "com",
          paths: [],
        },
      },
      {
        pattern: "example.com/path/",
        expected: {
          subdomains: [],
          domain: "example",
          tld: "com",
          paths: ["path"],
        },
      },
      {
        pattern: "example.com/longer/path/",
        expected: {
          subdomains: [],
          domain: "example",
          tld: "com",
          paths: ["longer", "path"],
        },
      },
      {
        pattern: "sbd1.sbd2.example.com/",
        expected: {
          subdomains: ["sbd1", "sbd2"],
          domain: "example",
          tld: "com",
          paths: [],
        },
      },
    ])("%j", ({ pattern, expected }) => {
      const result = ParsedPattern.getSegments(pattern);
      expect(result).toEqual(expect.objectContaining(expected));
    });
  });

  describe("constructor", () => {
    const testPattern = "example.com/";
    const expectedResult = ParsedPattern.getSegments(testPattern);

    it("should set segments on instance correctly", () => {
      const parsedPattern = new ParsedPattern(testPattern);
      expect(parsedPattern.segments).toEqual(expectedResult);
    });
  });
});
