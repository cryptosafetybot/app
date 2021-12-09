import { hasValidExtensionContext } from "./hasValidExtensionContext";
import { OptionsConfig } from "../components/Options/optionsConfig";
import { storage } from "../storage";

/**
 * Sets option(s) in storage
 */
export function setStoredOptions(options: Partial<OptionsConfig>) {
  return new Promise<void>((resolve) => {
    // fail silently if no valid extension context
    if (!hasValidExtensionContext()) return resolve();

    storage.set(options, resolve);
  });
}
