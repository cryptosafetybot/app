import Switch from "react-switch";
import { Field } from "./Field";
import { Label } from "./Label";
import { Row } from "./Row";
import { useAppTheme } from "../../themes";

interface BooleanFieldRowProps {
  label: string;
  value: boolean;
  setter: (value: boolean) => void;
}

/**
 * A form row that handles a boolean value
 */
export function BooleanFieldRow({
  label,
  value,
  setter,
}: BooleanFieldRowProps) {
  const theme = useAppTheme();

  return (
    <Row>
      <Label>{label}</Label>
      <Field>
        <Switch
          onChange={setter}
          checked={value}
          onColor={theme.switch.on}
          offColor={theme.switch.off}
          checkedIcon={false}
          uncheckedIcon={false}
          width={40}
          height={20}
        />
      </Field>
    </Row>
  );
}
