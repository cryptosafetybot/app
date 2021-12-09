import { OptionsConfig } from "../components/Options/optionsConfig";

interface CustomEventMap {
  "csa.updateOptions": CustomEvent<{ options: OptionsConfig }>;
}

declare global {
  interface Window {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Window, ev: CustomEventMap[K]) => void
    ): void;
  }
}
export {};
