import { Badge } from "./Badge";
import { DOMMessage, DOMMessageType, SafetyRating } from "../types";
import { escapeDanger } from "../utility/escapeDanger";

/**
 * Processes messages received by the service worker
 */
export function handleMessage(msg: DOMMessage, badge: Badge): void {
  switch (msg.type) {
    // update badge with current safety rating
    case DOMMessageType.SafetyRating:
      if (msg.safetyRating === SafetyRating.Blocked) {
        escapeDanger();
        return;
      }

      badge.setSafetyRating(msg.safetyRating);
      break;

    // update options
    case DOMMessageType.UpdateOptions:
      const updateOptionsEvent = new CustomEvent("csa.updateOptions", {
        detail: { options: msg.options },
      });
      window.dispatchEvent(updateOptionsEvent);
      break;
  }
}
