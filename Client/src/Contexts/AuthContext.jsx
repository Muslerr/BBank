import React, { createContext, useState, useEffect, useRef } from "react";
import { validateToken } from "../Services/apiService"; // Update the import path if necessary
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshError, setRefreshError] = useState(null);
  const isInitialRender = useRef(true);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);

        if (!isInitialRender.current && location.pathname !== "/login") {
          try {
            const isValid = await validateToken(storedToken);
            if (!isValid) {
              setToken(null);
              setIsAuthenticated(false);
              localStorage.removeItem("token");
              navigate("/login", {
                state: { error: "Session timed out, please log in again" },
              });
            }
          } catch (error) {
            setToken(null);
            setIsAuthenticated(false);
            localStorage.removeItem("token");
            navigate("/login", {
              state: { error: "Session timed out, please log in again" },
            });
          }
        }
      }

      setLoading(false);
      isInitialRender.current = false;
    };

    checkToken();
  }, [location.pathname, navigate]);

  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
    setRefreshError(null);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setRefreshError(null);
    localStorage.removeItem("token");
  };

  const authContextValue = {
    isAuthenticated,
    token,
    login,
    logout,
    loading,
    error: refreshError,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
