import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "../api/axios";

export interface User {
  email: string;
  isVerified: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
