/**
 * List of configurable options
 */
export enum Option {
  EnableExtension = "EnableExtension",
  ShowVerified = "ShowVerified",
  ShowUnverified = "ShowUnverified",
  ShowInAllFrames = "ShowInAllFrames",
}

/**
 * Define setting types
 */
export interface OptionsConfig {
  [Option.EnableExtension]: boolean;
  [Option.ShowVerified]: boolean;
  [Option.ShowUnverified]: boolean;
  [Option.ShowInAllFrames]: boolean;
}

/**
 * Define options
 *
 * This is the single source of truth used to generate options fields, state,
 * stories, etc.
 */
export const optionsConfig: Record<Option, SingleOption> = {
  [Option.EnableExtension]: {
    name: "Enable URL verification",
    type: "boolean",
    defaultValue: true,
  },
  [Option.ShowVerified]: {
    name: "Show verified badge",
    type: "boolean",
    defaultValue: true,
  },
  [Option.ShowUnverified]: {
    name: "Show unverified badge",
    type: "boolean",
    defaultValue: false,
  },
  [Option.ShowInAllFrames]: {
    name: "Show badges in all frames",
    type: "boolean",
    defaultValue: false,
  },
};

/**
 * Single Option: Boolean
 */
export interface SingleOptionBoolean {
  name: string;
  type: "boolean";
  defaultValue: boolean;
}

/**
 * Single Option
 */
export type SingleOption = SingleOptionBoolean;

/**
 * Calculated initial values
 */
export const initialOptions = {} as OptionsConfig;
for (const [key, option] of Object.entries(optionsConfig)) {
  const typedKey = key as keyof OptionsConfig;
  initialOptions[typedKey] = option.defaultValue;
}
