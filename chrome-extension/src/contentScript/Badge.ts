import { generateRandomElementId } from "../utility/generateRandomElementId";
import { getStoredOptions } from "../utility/getStoredOptions";
import { Option, OptionsConfig } from "../components/Options/optionsConfig";
import { SafetyRating } from "../types";

/**
 * UI which displays current verification status to users
 */
export class Badge {
  element: HTMLDivElement;
  styles: HTMLStyleElement;
  safetyRating: Exclude<SafetyRating, SafetyRating.Blocked>;

  static styles = `
    all: unset;

    position: fixed;
    z-index: 2147483647;
    top: 0;
    left: 50%; 
    transform: translateX(-50%);

    width: 50px;
    height: min-content;

    display: none;
    justify-content: center;
    align-items: center;

    padding: 5px 20px;

    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;

    box-shadow: 1px 1px 1px rgba(0,0,0,0.5);

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
  `;

  static verifiedStyles = `
    background-color: green;
    color: white;
    pointer-events: none;
    opacity: 0.8;
  `;

  static unverifiedStyles = `
    background-color: orange;
    color: white;
    pointer-events: none;
    opacity: 0.8;
  `;

  /**
   * Create HTML elements and set initial state
   */
  constructor() {
    // create styles element
    this.styles = document.createElement("style");

    // create badge element
    this.element = document.createElement("div");
    this.element.id = generateRandomElementId();

    // set initial rating
    this.safetyRating = SafetyRating.Unverified;
    this.setSafetyRating(this.safetyRating);
  }

  /**
   * Initialize the badge
   */
  init() {
    // set initial safety rating
    this.update();

    // listen for new options
    window.addEventListener("csa.updateOptions", () => {
      this.update();
    });

    // update options on focus
    window.addEventListener("focus", () => {
      this.update();
    });
  }

  /**
   * Update current state
   */
  update() {
    getStoredOptions().then((options) => this.onUpdateOptions(options));
  }

  /**
   * Handle option updates
   */
  onUpdateOptions(options: OptionsConfig) {
    const {
      [Option.EnableExtension]: enabled,
      [Option.ShowVerified]: showVerified,
      [Option.ShowUnverified]: showUnverified,
      [Option.ShowInAllFrames]: showInAllFrames,
    } = options;

    const calculateVisibleState = () => {
      // hide if extension not enabled
      if (!enabled) {
        return false;
      }

      // hide if verified not shown
      if (!showVerified && this.safetyRating === SafetyRating.Verified) {
        return false;
      }

      // hide if unverified not shown
      if (!showUnverified && this.safetyRating === SafetyRating.Unverified) {
        return false;
      }

      // hide if not shown in all frames
      if (!showInAllFrames && window.self !== window.top) {
        return false;
      }

      // show
      return true;
    };

    this.setVisibility(calculateVisibleState());
  }

  /**
   * Returns true if badge is mounted
   */
  isMountedSafe(): boolean {
    return !!this.element.parentNode;
  }

  /**
   * Add badge elements to the page
   */
  mount(): void {
    if (this.isMountedSafe()) return;

    document.head?.insertAdjacentElement("beforeend", this.styles);
    document.body?.insertAdjacentElement("beforeend", this.element);
  }

  /**
   * Remove badge elements from the page
   */
  unmount(): void {
    if (!this.isMountedSafe()) return;

    document.head?.removeChild(this.styles);
    document.body?.removeChild(this.element);
  }

  /**
   * Set badge styles
   */
  setStyles(styles = ""): void {
    this.styles.innerHTML = `#${this.element.id}{${styles}}`;
  }

  /**
   * Set badge inner html
   */
  setHTML(html = ""): void {
    this.element.innerHTML = html;
  }

  /**
   * Show/hide badge
   */
  setVisibility(visibility: boolean) {
    if (!this.isMountedSafe()) return;

    if (visibility) {
      this.element.style.display = "flex";
    } else {
      this.element.style.display = "";
    }
  }

  /**
   * Set badge safety rating state
   */
  setSafetyRating(
    safetyRating: Exclude<SafetyRating, SafetyRating.Blocked>
  ): void {
    this.safetyRating = safetyRating;

    switch (safetyRating) {
      case SafetyRating.Verified:
        this.setStyles(Badge.styles + Badge.verifiedStyles);
        this.setHTML("Verified");
        return;

      case SafetyRating.Unverified:
        this.setStyles(Badge.styles + Badge.unverifiedStyles);
        this.setHTML("Unverified");
        return;
    }
  }
}
