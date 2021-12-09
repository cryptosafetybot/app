import { DOMMessageType } from "../types";
import { getActiveTab } from "../utility/getActiveTab";
import { getStoredOptions } from "../utility/getStoredOptions";
import { hasValidExtensionContext } from "../utility/hasValidExtensionContext";
import { isHttpProtocol } from "../utility/isHttpProtocol";
import { Option } from "../components/Options/optionsConfig";
import { Verifier } from "./Verifier";

/**
 * Fired when user url changes
 */
export async function handleUrlChange(verifier: Verifier): Promise<void> {
  // ignore if extension not enabled
  const { [Option.EnableExtension]: enabled } = await getStoredOptions();
  if (!enabled) return;

  // ignore if extension has invalid context
  if (!hasValidExtensionContext()) return;

  // get new tab
  const tab = await getActiveTab();

  // ensure sufficient data exists to verify
  if (!tab.id) return;
  if (!tab.url) return;
  if (!isHttpProtocol(tab.url)) return;

  // broadcast new safety rating
  chrome.tabs?.sendMessage(tab.id, {
    type: DOMMessageType.SafetyRating,
    safetyRating: await verifier.getSafetyRating(tab.url),
  });
}
