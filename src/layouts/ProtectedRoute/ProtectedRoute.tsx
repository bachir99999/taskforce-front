import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { JSX, useEffect, useRef, useState } from "react";
import { verifSavedToken } from "../../lib/api/authAPI";
import Loading from "../../components/Loading/Loading";
import { toast, Zoom } from "react-toastify";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, logout } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toastId = useRef<string | number | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const res = await verifSavedToken(token, logout);

      setIsLoading(false);
      if (
        !res &&
        (toastId.current === null || !toast.isActive(toastId.current))
      ) {
        toastId.current = toast.error(
          "Session expirée. Veuillez vous reconnecter.",
          {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
          }
        );
      }
    };
    verifyToken();
  }, [token]);

  if (isLoading) {
    return (
      <div className="loader">
        <Loading />
      </div>
    );
  }
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
