import { mocked } from "ts-jest/utils";
import { storage } from "./storage";
import "@testing-library/jest-dom";

jest.mock("./storage");

// ensure storage callbacks are called
beforeEach(() => {
  const ms = mocked(storage);
  // @ts-ignore
  ms.get.mockImplementationOnce((k: any, cb: () => void) => cb({}));
  // @ts-ignore
  ms.set.mockImplementationOnce((k: any, cb: () => void) => cb());
  // @ts-ignore
  ms.remove.mockImplementationOnce((k: any, cb: () => void) => cb());
  // @ts-ignore
  ms.clear.mockImplementationOnce((cb: () => void) => cb());
  // @ts-ignore
  ms.getBytesInUse.mockImplementationOnce((cb: () => void) => cb(0));
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});
