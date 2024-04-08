import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export const ThemeSwitcher = ({ toggleDarkMode }) => {
  return (
    <Switch
      defaultSelected
      size="lg"
      color="success"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onValueChange={toggleDarkMode}
    ></Switch>
  );
};
