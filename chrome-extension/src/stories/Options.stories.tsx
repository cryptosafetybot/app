import { action } from "@storybook/addon-actions";
import { ChromeExtensionFrame } from "./common/ChromeExtensionFrame";
import { Option, optionsConfig } from "../components/Options/optionsConfig";
import { OptionsForm as OptionsComponent } from "../components/Options/OptionsForm";
import {
  Args,
  ArgTypes,
  ComponentMeta,
  ComponentStory,
} from "@storybook/react";

export default {
  title: "Options",
  component: OptionsComponent,
  decorators: [
    (Story) => (
      <ChromeExtensionFrame>
        <Story />
      </ChromeExtensionFrame>
    ),
  ],
  args: getArgsFromOptionsConfig(),
  argTypes: getArgTypesFromOptionsConfig(),
} as ComponentMeta<typeof OptionsComponent>;

const Template: ComponentStory<typeof OptionsComponent> = (args) => (
  <OptionsComponent {...args} />
);

export const Options = Template.bind({});
Options.args = {
  [Option.EnableExtension]: true,
  [Option.ShowVerified]: false,
  [Option.ShowUnverified]: false,
  [Option.ShowInAllFrames]: false,
};

/**
 * Generate args from single source of truth
 */
function getArgsFromOptionsConfig() {
  // options
  const args: Args = {};
  args.setters = {};
  for (const [key, option] of Object.entries(optionsConfig)) {
    args[key] = option.defaultValue;
    args.setters[key] = action(`${key}`);
  }

  return args;
}

/**
 * Generate argTypes from single source of truth
 */
function getArgTypesFromOptionsConfig() {
  const argTypes: ArgTypes = {};
  argTypes.setters = { control: "none" };

  for (const [key, option] of Object.entries(optionsConfig)) {
    argTypes[key] = {
      name: option.name,
      control: { type: option.type },
    };
  }
  return argTypes;
}
