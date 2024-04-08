import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/loginPage/LoginPage";
import HomePage from "./Pages/homePage/HomePage";
import { AuthProvider, AuthContext } from "./Contexts/AuthContext";
import { DataContext, DataProvider } from "./Contexts/DataContext";
import { useContext, useState } from "react";
import Loading from "./Components/Messages/Loading";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className={`${darkMode ? "dark" : ""} text-foreground bg-background`}>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route
              path="/login"
              element={<LoginPage toggleDarkMode={toggleDarkMode} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage toggleDarkMode={toggleDarkMode} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </main>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, error } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navigate to="/login" replace />
      </>
    );
  }

  return children;
};
export default App;
