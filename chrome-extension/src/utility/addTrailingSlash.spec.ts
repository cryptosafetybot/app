import { addTrailingSlash } from "./addTrailingSlash";

const countSlashes = (str: string) => (str.match(/\//g) || []).length;

describe(`${addTrailingSlash.name}`, () => {
  describe.each(["", "/", "a", "//", "/a/a", "/a/a/"])("%s", (testStr) => {
    let result: string;

    beforeEach(() => {
      result = addTrailingSlash(testStr);
    });

    it("should end with a /", () => {
      expect(result.endsWith("/")).toBe(true);
    });

    it("should only add one slash maximum", () => {
      const numAdditionalSlashes = countSlashes(result) - countSlashes(testStr);
      expect(numAdditionalSlashes).toBeLessThanOrEqual(1);
    });
  });
});
