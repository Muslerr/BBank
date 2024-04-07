import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import { Card, Input, Button, CardHeader, CardBody } from "@nextui-org/react";
import {EyeFilledIcon} from "../../Components/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../../Components/EyeSlashFilledIcon";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card css={{ mw: "400px" }}>
        <CardHeader>
          <h1 className="text-500">Login</h1>
        </CardHeader>
        <CardBody>
          {error && <h1 color="error">{error}</h1>}
          <form onSubmit={handleSubmit}>
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
                className="max-w-xs"
                
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
