import { DOMMessage, DOMMessageType } from "../types";
import { getActiveTab } from "../utility/getActiveTab";
import { handleUrlChange } from "./handleUrlChange";
import { hasValidExtensionContext } from "../utility/hasValidExtensionContext";
import { Option } from "../components/Options/optionsConfig";
import { Verifier } from "./Verifier";

/**
 * Processes messages received by the service worker
 */
export function handleMessage(msg: DOMMessage, verifier: Verifier): void {
  /**
   * Pass current message on to active tab
   */
  const relayMessageToActiveTab = async () => {
    if (!hasValidExtensionContext()) return;

    const tab = await getActiveTab();
    if (tab.id) chrome.tabs?.sendMessage(tab.id, msg);
  };

  switch (msg.type) {
    // url change
    case DOMMessageType.UrlChange:
      handleUrlChange(verifier);
      break;

    // update options
    case DOMMessageType.UpdateOptions:
      relayMessageToActiveTab();

      // if extension was just enabled, run verification again
      const { [Option.EnableExtension]: enabled } = msg.options;
      if (enabled) {
        handleUrlChange(verifier);
      }

      break;
  }
}
