import { BooleanFieldRow } from "../ui/SwitchRow";
import { Option, optionsConfig, OptionsConfig } from "./optionsConfig";
import { Section } from "../ui/Section";

interface OptionsFormProps extends OptionsConfig {
  setters: Record<Option, (value: any) => void>;
}

export function OptionsForm(options: OptionsFormProps) {
  // generate options fields from single source of truth
  const optionElements = {} as Record<Option, JSX.Element>;
  for (let [key, option] of Object.entries(optionsConfig)) {
    const typedKey = key as Option;
    switch (option.type) {
      case "boolean":
        optionElements[typedKey] = (
          <BooleanFieldRow
            label={option.name}
            value={options[typedKey]}
            setter={options.setters[typedKey]}
          />
        );
        break;
    }
  }

  return (
    <Section.Wrapper>
      <Section.Header>{optionElements[Option.EnableExtension]}</Section.Header>
      {options[Option.EnableExtension] && (
        <Section.Content>
          {optionElements[Option.ShowVerified]}
          {optionElements[Option.ShowUnverified]}
          {optionElements[Option.ShowInAllFrames]}
        </Section.Content>
      )}
    </Section.Wrapper>
  );
}
