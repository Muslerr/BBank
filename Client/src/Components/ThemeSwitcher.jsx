import {Switch} from "@nextui-org/react";
import {MoonIcon} from "./Icons/MoonIcon";
import {SunIcon} from "./Icons/SunIcon";

export const ThemeSwitcher = ({toggleDarkMode}) => {
  

  return (
    <Switch
      defaultSelected
      size="lg"
      color="success"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onValueChange={toggleDarkMode}
      
    >
    </Switch>
  )
};