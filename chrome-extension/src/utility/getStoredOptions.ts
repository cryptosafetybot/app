import { hasValidExtensionContext } from "./hasValidExtensionContext";
import { storage } from "../storage";
import {
  optionsConfig,
  OptionsConfig,
  initialOptions,
} from "../components/Options/optionsConfig";

/**
 * Retrieves an option or list of options from storage
 */
export function getStoredOptions(keys: string[] = Object.keys(optionsConfig)) {
  return new Promise<OptionsConfig>((resolve) => {
    // fail silently if no valid extension context
    if (!hasValidExtensionContext()) return resolve({} as OptionsConfig);

    storage.get(keys, (storedOptions: Partial<OptionsConfig>) => {
      resolve({ ...initialOptions, ...storedOptions });
    });
  });
}
