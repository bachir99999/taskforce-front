import { createContext, useContext, useState, ReactNode } from "react";
import { UserResponse } from "../types/user";

interface AuthContextType {
  token: string | null;
  user: UserResponse | null;
  login: (token: string, user: UserResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [user, setUSer] = useState<UserResponse | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = (token: string, user: UserResponse) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUSer(user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUSer(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.log("AuthContext is undefined");

    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
