import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
