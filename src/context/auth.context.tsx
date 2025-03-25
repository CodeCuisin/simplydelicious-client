import React, { useState, useEffect, useContext, ReactNode } from "react";
import axios from "axios";
import { Recipe } from "../pages/types";

// Define the AuthContext Type
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User;
  storeToken: (token: string) => void;
  logOutUser: () => void;
  authenticateUser: () => void;
}

// Define User Type
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  bio?: string | null;
  image?: string | null;
  recipes: Recipe[];
}

const emptyObj = {
  id: 0,
  name: "",
  email: "",
  password: "",
  recipes: []
};
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
  const [user, setUser] = useState<User>({ id: 0,
    name: "",
    email: "",
    password: "",
    recipes: []});

  // Store token in local storage and authenticate user
  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true); // Update state immediately
    authenticateUser();
  };

  // Remove token from storage
  const removeToken = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); 
    setUser(emptyObj);
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
          setUser(emptyObj);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setUser(emptyObj);
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
