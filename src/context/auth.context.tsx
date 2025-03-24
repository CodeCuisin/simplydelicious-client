import React, { useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";

// Define the AuthContext Type
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  storeToken: (token: string) => void;
  logOutUser: () => void;
  authenticateUser: () => void;
}

// Define User Type
interface User {
  _id: string;
  email: string;
  name: string;
}

// Create AuthContext with Default Value as Undefined
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Custom Hook to Use Context
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Define Props for Provider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProviderWrapper: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  // Store token in local storage and authenticate user
  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true); // Update state immediately
    authenticateUser();
  };

  // Remove token from storage
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  // Authenticate user with stored token
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`http://localhost:5005/auth/verify`, { // Fixed URL here
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setUser(null);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  // Logout function
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  // Run authentication on mount
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, logOutUser, storeToken, authenticateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProviderWrapper, AuthContext, useAuth };
