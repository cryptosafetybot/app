import { isHttpProtocol } from "../utility/isHttpProtocol";
import {
  testSimpleExtUrl,
  testSimpleHttpsUrl,
  testSimpleHttpUrl,
} from "../test/sampleData";

describe(`${isHttpProtocol.name}`, () => {
  describe.each([
    { url: testSimpleHttpUrl, expected: true },
    { url: testSimpleHttpsUrl, expected: true },
    { url: testSimpleExtUrl, expected: false },
  ])("cases", ({ url, expected }) => {
    let result: boolean;

    beforeEach(() => {
      result = isHttpProtocol(url);
    });

    it(`should return ${expected} for ${url}`, () => {
      expect(result).toBe(expected);
    });
  });
});
