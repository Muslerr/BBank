import React from "react";
import { ThemeSwitcher } from "./Icons/ThemeSwitcher";
import {
  Card,
  Input,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";

const Header = ({ toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={`../../../public/bankLogo.png`}
            alt="Logo"
            className="w-16 h-16 mr-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Credit Card Management
          </h1>
        </div>
        <ThemeSwitcher toggleDarkMode={toggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;
