import { escapeDanger } from "./escapeDanger";

describe(`${escapeDanger.name}`, () => {
  beforeEach(() => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { assign: jest.fn() };
  });

  describe("disable events", () => {
    const mockEventListener = jest.fn(
      () => "must return string to trigger beforeunload"
    );

    describe.each(["mousemove", "beforeunload", "unload"])(
      "%s",
      (eventName) => {
        beforeEach(() => {
          window.addEventListener(eventName, mockEventListener);

          escapeDanger();

          const event = new Event(eventName);
          window.dispatchEvent(event);
        });

        it("shouldn't call listener", () => {
          expect(mockEventListener).not.toHaveBeenCalled();
        });
      }
    );
  });

  describe("clear content", () => {
    const originalDocumentHeadInnerHTML = document.head.innerHTML;
    const originalDocumentBodyInnerHTML = document.body.innerHTML;

    const testDocumentHeadInnerHTML = `<title>Example</title>`;
    const testDocumentBodyInnerHTML = `<div>Example</div>`;

    beforeEach(() => {
      document.head.innerHTML = testDocumentHeadInnerHTML;
      document.body.innerHTML = testDocumentBodyInnerHTML;

      escapeDanger();
    });

    afterEach(() => {
      document.head.innerHTML = originalDocumentHeadInnerHTML;
      document.body.innerHTML = originalDocumentBodyInnerHTML;
    });

    it("should clear document.head", () => {
      expect(document.head.innerHTML).not.toBe(testDocumentHeadInnerHTML);
    });

    it("should clear document.body", () => {
      expect(document.body.innerHTML).not.toBe(testDocumentBodyInnerHTML);
    });
  });

  describe("redirect", () => {
    beforeEach(() => {
      escapeDanger();
    });

    it("should call window.location.assign", () => {
      expect(window.location.assign).toHaveBeenCalledTimes(1);
    });
  });
});
