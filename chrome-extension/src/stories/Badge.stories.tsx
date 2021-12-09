import { BadgeComponent } from "./common/BadgeComponent";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SafetyRating } from "../types";

export default {
  title: "Badge",
  component: BadgeComponent,
  argTypes: {
    safetyRating: {
      name: "Safety Rating",
      options: [SafetyRating.Verified, SafetyRating.Unverified],
      control: {
        type: "select",
        labels: {
          [SafetyRating.Verified]: "Verified",
          [SafetyRating.Unverified]: "Unverified",
        },
      },
    },
  },
} as ComponentMeta<typeof BadgeComponent>;

const Template: ComponentStory<typeof BadgeComponent> = (args) => (
  <BadgeComponent {...args} />
);

export const Badge = Template.bind({});
Badge.args = {
  safetyRating: SafetyRating.Verified,
};
