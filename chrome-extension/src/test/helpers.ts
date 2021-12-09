import { mocked } from "ts-jest/utils";
import { OptionsConfig } from "../components/Options/optionsConfig";
import { storage } from "../storage";

/**
 * QoL helper for testing functions that use Math.random
 */
export function mockMathRandomHelper(value: number) {
  const originalMath = global.Math;
  const mockMath = Object.create(global.Math);

  mockMath.random = () => value;
  global.Math = mockMath;

  afterAll(() => {
    global.Math = originalMath;
  });
}

/**
 * QoL helper for testing functions that reference `chrome` global
 */
export function mockChromeHelper() {
  const originalChrome = global.chrome;
  const mockChrome = Object.create(global.chrome || {});

  beforeAll(() => {
    mockChrome.tabs = {
      query: jest.fn(),
      sendMessage: jest.fn(),
      onActivated: {
        addListener: jest.fn(),
      },
    };

    mockChrome.runtime = {
      id: "fakeId",
      sendMessage: jest.fn(),
      onMessage: {
        addListener: jest.fn(),
      },
    };

    global.chrome = mockChrome;
  });

  afterAll(() => {
    global.chrome = originalChrome;
  });

  return mockChrome;
}

/**
 * QoL helper for testing functions that reference `process.env`
 */
export function mockEnvHelper(key: string, value: string | undefined) {
  const originalRAABU = process.env[key];

  beforeAll(() => {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  });

  afterAll(() => {
    process.env[key] = originalRAABU;
  });
}

/**
 * QoL helper for testing functions that reference storage
 */
export function mockOptions(fakeOptions: Partial<OptionsConfig> = {}) {
  mocked(storage).get.mockReset();
  mocked(storage).get.mockImplementation(
    (k: any, cb: (i: { [key: string]: any }) => void) => cb(fakeOptions)
  );
}

/**
 * QoL helper for testing functions that use document.*.insertAdjacentElement
 */
export function mockInsertAdjacentElementHelper() {
  const originalHeadIAE = document.head.insertAdjacentElement;
  const originalBodyIAE = document.body.insertAdjacentElement;

  beforeAll(() => {
    document.head.insertAdjacentElement = jest.fn();
    document.body.insertAdjacentElement = jest.fn();
  });

  afterAll(() => {
    document.head.insertAdjacentElement = originalHeadIAE;
    document.body.insertAdjacentElement = originalBodyIAE;
  });
}

/**
 * QoL helper for testing functions that use document.*.removeChild
 */
export function mockRemoveChildHelper() {
  const originalHeadRC = document.head.removeChild;
  const originalBodyRC = document.body.removeChild;

  beforeAll(() => {
    document.head.removeChild = jest.fn();
    document.body.removeChild = jest.fn();
  });

  afterAll(() => {
    document.head.removeChild = originalHeadRC;
    document.body.removeChild = originalBodyRC;
  });
}
