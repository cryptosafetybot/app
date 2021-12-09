import { Badge } from "./Badge";
import { DOMMessageType, SafetyRating, SafetyRatingDOMMessage } from "../types";
import { escapeDanger } from "../utility/escapeDanger";
import { handleMessage } from "./handleMessage";

jest.mock("../utility/escapeDanger");

describe(`${handleMessage.name}`, () => {
  const mockBadge = {
    setSafetyRating: jest.fn(),
  } as unknown as Badge;

  describe(`msg.type=${DOMMessageType.SafetyRating}`, () => {
    describe.each([SafetyRating.Verified, SafetyRating.Unverified])(
      `msg.safetyRating=%s`,
      (safetyRating) => {
        const testMessage = {
          type: DOMMessageType.SafetyRating,
          safetyRating,
        } as SafetyRatingDOMMessage;

        it("should call badge.setSafetyRating() correctly", () => {
          handleMessage(testMessage, mockBadge);
          expect(mockBadge.setSafetyRating).toHaveBeenCalledWith(safetyRating);
        });
      }
    );

    describe(`msg.safetyRating=${SafetyRating.Blocked}`, () => {
      const testMessage = {
        type: DOMMessageType.SafetyRating,
        safetyRating: SafetyRating.Blocked,
      } as SafetyRatingDOMMessage;

      it("should call escapeDanger", () => {
        handleMessage(testMessage, mockBadge);
        expect(escapeDanger).toHaveBeenCalled();
      });
    });
  });
});
