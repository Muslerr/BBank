import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/loginPage/LoginPage";
import HomePage from "./Pages/homePage/HomePage";
import { AuthProvider, AuthContext } from "./Contexts/AuthContext";
import { DataContext,DataProvider } from "./Contexts/DataContext";
import { useContext ,useState} from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    console.log("ddd")
    setDarkMode(!darkMode);
  };
  
  
  return (
    <main className={`${darkMode ? "dark" : ""} text-foreground bg-background`}>
    <AuthProvider>
      <DataProvider>
      <Routes>
        <Route path="/login" element={<LoginPage toggleDarkMode={toggleDarkMode} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage  toggleDarkMode={toggleDarkMode} />
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
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default App;
