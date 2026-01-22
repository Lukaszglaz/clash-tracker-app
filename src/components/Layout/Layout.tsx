import { type FC, type ReactNode } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { useAuth } from "../../context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-bg-body text-text-main transition-colors duration-300">
      <Navbar isLoggedIn={isLoggedIn} onLogout={logout} />

      <main className="flex-1 relative">{children}</main>

      <Footer />
    </div>
  );
};
