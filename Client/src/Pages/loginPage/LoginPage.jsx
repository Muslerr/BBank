import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  Card,
  Input,
  Button,
  CardHeader,
  CardBody,
  CardFooter,Image
} from "@nextui-org/react";
import { EyeFilledIcon } from "../../Components/Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Components/Icons/EyeSlashFilledIcon";
import { ThemeSwitcher } from "../../Components/ThemeSwitcher";
import ErrorMessage from "../../Components/ErrorMessage";

const LoginPage = ({ toggleDarkMode }) => {
  const { login } = useContext(AuthContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [errorKey, setErrorKey] = useState(0);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoFill = async () => {
    try {
      console.log(formData);
      const response = await axios.post("/User/Login", {
        username: "admin",
        password: "123456",
      });
      const token = response.data.token;
      if (token) {
        login(token);
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post("/User/Login", formData);
      const token = response.data.token;
      if (token) {
        login(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setErrorKey((prevKey) => prevKey + 1);
    }
  };


  return (
    <div className="w-full max-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center">
          <Image
              src={`../../../public/bankLogo.png`}
              alt="Logo"
              className="w-16 h-16 mr-4"

            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Credit Card Management</h1>
          </div>
          <ThemeSwitcher toggleDarkMode={toggleDarkMode} />
        </div>
        </header>
      <div className="flex items-center flex-col justify-center h-screen">
      {error && (
              <ErrorMessage
                num={errorKey}
                message={error}
              />
            )}
        <Card className="p-5 w-[80%] sm:w-1/3" variant="fill">
          <CardHeader>
            <h1 className="text-500">Login</h1>
            
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody>
              <div className="mb-4">
                <Input
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Password"
                  required
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button type="submit" className="w-full m-1">
                Login
              </Button>
              <Button
                onPress={handleAutoFill}
                className="w-full"
                color="primary"
              >
                AutoFill
              </Button>
            </CardFooter>
          </form>
        </Card>
        
      </div>
      <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400">
          &copy; 2023 Credit Card Management. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
