import { generateRandomElementId } from "../utility/generateRandomElementId";
import { mockMathRandomHelper } from "../test/helpers";

describe(`${generateRandomElementId.name}`, () => {
  mockMathRandomHelper(0.5);

  let result: string;

  beforeEach(() => {
    result = generateRandomElementId();
  });

  it("should return a string", () => {
    expect(typeof result).toBe("string");
  });

  it("should have a first character between a-z", () => {
    expect(result[0].match(/[a-z]/)).not.toBeNull();
  });
});
