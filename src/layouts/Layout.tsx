import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { JSX } from "react";

const Layout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className={`app-container ${isLoginPage ? "centered-page" : ""}`}>
      {!isLoginPage && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
