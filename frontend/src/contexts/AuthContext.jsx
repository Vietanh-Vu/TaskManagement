import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  axios.defaults.baseURL = "http://localhost:8080/api";
  async function logout() {
    // make request to save trie to database
    try {
      const response = await axios.post("/users/exit");
    } catch (error) {
      console.error(error);
    }
    // remove cookies and navigate to login route
    Cookies.remove("username");
    Cookies.remove("password");
    Cookies.remove("credentials");
  }

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:8080/api";
    axios.defaults.headers.common["Authorization"] = `Basic ${Cookies.get(
      "credentials"
    )}`;

    return () => {};
  }, []);

  return (
    <AuthContext.Provider
      value={{
        axios,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext is used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
