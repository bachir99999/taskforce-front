import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { JSX } from "react";

const Layout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const isUnProtectedPage = location.pathname === "/login";

  return (
    <div
      className={`app-container ${isUnProtectedPage ? "centered-page" : ""}`}
    >
      {!isUnProtectedPage && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
