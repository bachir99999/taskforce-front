import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX, useEffect, useRef, useState } from "react";
import { verifSavedToken } from "../lib/api/auth";
import { toast, Zoom } from "react-toastify";
import { PuffLoader } from "react-spinners";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, logout } = useAuth();
  const [Loading, setLoading] = useState<boolean>(true);
  const toastId = useRef<string | number | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const res = await verifSavedToken(token, logout);

      setLoading(false);
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

  if (Loading) {
    return (
      <div className="loader">
        <PuffLoader color="#36d7b7" size={460} />
      </div>
    );
  }
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
function sleep(arg0: number) {
  throw new Error("Function not implemented.");
}
