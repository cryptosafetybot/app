import { AppTitle as AppTitleComponent } from "../components/ui/AppTitle";
import { ChromeExtensionFrame } from "./common/ChromeExtensionFrame";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "App Title",
  component: AppTitleComponent,
  decorators: [
    (Story) => (
      <ChromeExtensionFrame>
        <Story />
      </ChromeExtensionFrame>
    ),
  ],
} as ComponentMeta<typeof AppTitleComponent>;

const Template: ComponentStory<typeof AppTitleComponent> = (args) => (
  <AppTitleComponent {...args} />
);

export const AppTitle = Template.bind({});
AppTitle.args = {
  title: "My App Title",
};
