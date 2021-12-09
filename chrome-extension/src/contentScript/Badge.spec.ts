import { Badge } from "./Badge";
import { Option } from "../components/Options/optionsConfig";
import { SafetyRating } from "../types";
import {
  mockInsertAdjacentElementHelper,
  mockRemoveChildHelper,
} from "../test/helpers";

describe(`${Badge.name}`, () => {
  describe("static props", () => {
    it.each(["styles", "verifiedStyles", "unverifiedStyles"])(
      `${Badge.name}.%s should be defined`,
      (prop) => {
        expect((Badge as Record<string, any>)[prop]).toBeDefined();
      }
    );
  });

  describe("instance", () => {
    function testSetup({
      parentNode,
      isMounted,
    }: {
      parentNode?: HTMLElement;
      isMounted?: boolean;
    } = {}) {
      const setup: Record<string, any> = {};

      setup.badge = new Badge();
      setup.badge.element = {
        id: setup.badge.element.id,
        style: setup.badge.element.style,
        parentNode,
      };

      if (typeof isMounted === "boolean") {
        setup.badge.isMountedSafe = jest.fn();
        setup.badge.isMountedSafe.mockImplementationOnce(() => isMounted);
      }

      return setup;
    }

    describe("constructor", () => {
      it.each(["styles", "element"])("badge.%s should be defined", (prop) => {
        const { badge } = testSetup();
        expect((badge as Record<string, any>)[prop]).toBeDefined();
      });

      it("badge.element.id should be defined", () => {
        const { badge } = testSetup();
        expect(badge.element.id).toBeDefined();
      });
    });

    describe("init", () => {
      it.todo("should call setSafetyRating");
      it.todo("should add csa.updateOptions listener to window");
      it.todo("should add focus listener to window");
    });

    describe("update", () => {
      it.todo("should call getStoredOptions");
      it.todo("should call onUpdateOptions correctly");
    });

    describe("onUpdateOptions", () => {
      describe(`${Option.EnableExtension}=false`, () => {
        it.todo("should call setVisibility correctly");
      });

      describe(`${Option.ShowVerified}=false`, () => {
        describe(`safetyRating=${SafetyRating.Verified}`, () => {
          it.todo("should call setVisibility correctly");
        });
        describe(`safetyRating=${SafetyRating.Unverified}`, () => {
          it.todo("should call setVisibility correctly");
        });
      });

      describe(`${Option.ShowUnverified}=false`, () => {
        describe(`safetyRating=${SafetyRating.Verified}`, () => {
          it.todo("should call setVisibility correctly");
        });
        describe(`safetyRating=${SafetyRating.Unverified}`, () => {
          it.todo("should call setVisibility correctly");
        });
      });

      describe(`${Option.ShowInAllFrames}=false`, () => {
        describe(`is parent frame`, () => {
          it.todo("should call setVisibility correctly");
        });
        describe(`is child frame`, () => {
          it.todo("should call setVisibility correctly");
        });
      });
    });

    describe("isMountedSafe", () => {
      describe("element has parentNode", () => {
        it("should return true", () => {
          const { badge } = testSetup({
            parentNode: document.createElement("div"),
          });
          expect(badge.isMountedSafe()).toBe(true);
        });
      });

      describe("element does not have parentNode", () => {
        it("should return false", () => {
          const { badge } = testSetup({ parentNode: undefined });
          expect(badge.isMountedSafe()).toBe(false);
        });
      });
    });

    describe("mount/unmount", () => {
      mockInsertAdjacentElementHelper();
      mockRemoveChildHelper();

      describe("element is mounted", () => {
        const isMounted = true;

        describe("mount", () => {
          it("should call isMountedSafe", () => {
            const { badge } = testSetup({ isMounted });
            badge.mount();

            expect(badge.isMountedSafe).toHaveBeenCalled();
          });

          it("should not mount badge", () => {
            const { badge } = testSetup({ isMounted });
            badge.mount();

            expect(document.head.insertAdjacentElement).not.toHaveBeenCalled();
            expect(document.body.insertAdjacentElement).not.toHaveBeenCalled();
          });
        });

        describe("unmount", () => {
          it("should call isMountedSafe", () => {
            const { badge } = testSetup({ isMounted });
            badge.unmount();

            expect(badge.isMountedSafe).toHaveBeenCalled();
          });

          it("should unmount badge", () => {
            const { badge } = testSetup({ isMounted });
            badge.unmount();

            expect(document.head.removeChild).toHaveBeenCalledWith(
              badge.styles
            );
            expect(document.body.removeChild).toHaveBeenCalledWith(
              badge.element
            );
          });
        });
      });

      describe("element is not mounted", () => {
        const isMounted = false;

        describe("mount", () => {
          it("should call isMountedSafe", () => {
            const { badge } = testSetup({ isMounted });
            badge.mount();

            expect(badge.isMountedSafe).toHaveBeenCalled();
          });

          it("should mount badge", () => {
            const { badge } = testSetup({ isMounted });
            badge.mount();

            expect(document.head.insertAdjacentElement).toHaveBeenCalledWith(
              "beforeend",
              badge.styles
            );
            expect(document.body.insertAdjacentElement).toHaveBeenCalledWith(
              "beforeend",
              badge.element
            );
          });
        });

        describe("unmount", () => {
          it("should call isMountedSafe", () => {
            const { badge } = testSetup({ isMounted });
            badge.unmount();

            expect(badge.isMountedSafe).toHaveBeenCalled();
          });

          it("should unmount badge", () => {
            const { badge } = testSetup({ isMounted });
            badge.unmount();

            expect(document.head.removeChild).not.toHaveBeenCalled();
            expect(document.body.removeChild).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe("setStyles", () => {
      const testStyles = "testStyles";

      it("should set styles correctly", () => {
        const { badge } = testSetup();
        badge.setStyles(testStyles);

        expect(badge.styles.innerHTML).toBe(
          `#${badge.element.id}{${testStyles}}`
        );
      });
    });

    describe("setHTML", () => {
      const testHTML = "testHTML";

      it("should set html correctly", () => {
        const { badge } = testSetup();
        badge.setHTML(testHTML);

        expect(badge.element.innerHTML).toBe(testHTML);
      });
    });

    describe("setVisibility", () => {
      describe("visibility=true", () => {
        const visibility = true;

        it("should update element styles correctly", () => {
          const { badge } = testSetup({ isMounted: true });
          badge.setVisibility(visibility);

          expect(badge.element.style.display).toBe("flex");
        });
      });

      describe("visibility=false", () => {
        const visibility = false;

        it("should update element styles correctly", () => {
          const { badge } = testSetup({ isMounted: true });
          badge.setVisibility(visibility);

          expect(badge.element.style.display).toBe("");
        });
      });
    });

    describe("setSafetyRating", () => {
      // mock badge
      const { badge } = testSetup();
      badge.setStyles = jest.fn();
      badge.setHTML = jest.fn();

      describe.each([SafetyRating.Verified, SafetyRating.Unverified] as Exclude<
        SafetyRating,
        SafetyRating.Blocked
      >[])("%s", (safetyRating) => {
        beforeEach(() => {
          badge.setSafetyRating(safetyRating);
        });

        it("should call setStyles", () => {
          expect(badge.setStyles).toHaveBeenCalled();
        });

        it("should call setHTML", () => {
          expect(badge.setHTML).toHaveBeenCalled();
        });
      });
    });
  });
});
