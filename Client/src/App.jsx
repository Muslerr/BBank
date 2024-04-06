import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/loginPage/LoginPage";
import HomePage from "./Pages/homePage/HomePage";
import { AuthProvider, AuthContext } from "./Contexts/AuthContext";
import { DataContext,DataProvider } from "./Contexts/DataContext";
import { useContext } from "react";

const App = () => {
  return (
    
    <AuthProvider>
      <DataProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      </DataProvider>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default App;
