import { Route, Routes } from "react-router-dom";
import TaskBoard from "./pages/TaskBoard/TaskBoard";
import ProtectedRoute from "./layouts/ProtectedRoute/ProtectedRoute";
import Layout from "./layouts/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Identification from "./pages/Identification/Identification";
import Stats from "./pages/Stats/Stats";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <ToastContainer />
      <Layout>
        <Routes>
          {/* Route de connexion */}
          <Route path="/login" element={<Identification />} />

          {/* Route publique */}

          {/* Routes protégées */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TaskBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Route inconnue */}
          <Route path="*" element={<h1>Page non trouvée</h1>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
