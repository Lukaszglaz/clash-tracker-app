import {
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "../api/axios";
import { AuthContext, type User } from "./auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      console.log("AuthProvider: Inicjalizacja sesji...");
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("AuthProvider: Brak tokena w localStorage");
        setIsLoading(false);
        return;
      }

      try {
        console.log("AuthProvider: Pobieranie danych z /auth/me...");
        const response = await api.get("/auth/me");
        console.log("AuthProvider: Otrzymano dane:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("AuthProvider: Błąd pobierania danych:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!user, user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
