import { Badge } from "./Badge";
import { DOMMessage, DOMMessageType } from "../types";
import { handleMessage } from "./handleMessage";
import { hasValidExtensionContext } from "../utility/hasValidExtensionContext";
import { isHttpProtocol } from "../utility/isHttpProtocol";

/**
 * Set up content scripts
 */
export function setupContentScripts(): void {
  // ignore non-http(s) pages
  if (!isHttpProtocol(window.self.location.href)) {
    return;
  }

  // create badge
  const badge = new Badge();
  badge.init();

  // mount in a later animation frame to avoid errors
  const delayCallback = window.requestIdleCallback ?? window.setTimeout;
  delayCallback(() => {
    badge.mount();
    badge.update();
  });

  // attach handleMessage listener
  chrome.runtime?.onMessage.addListener((msg: DOMMessage) => {
    handleMessage(msg, badge);

    // must return false or chrome will wait for a response
    return false;
  });

  // broadcast url changes
  const broadcastUrl = () => {
    if (!hasValidExtensionContext()) return;

    const url = window.self.location.href;

    chrome.runtime?.sendMessage({
      type: DOMMessageType.UrlChange,
      url,
    });
  };

  broadcastUrl();
  window.addEventListener("popstate", broadcastUrl);
}
