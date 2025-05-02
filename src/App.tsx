import { Route, Routes } from "react-router-dom";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Layout from "./layouts/Layout";
import "./App.css";
import Identification from "./components/Identification/Identification";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Route de connexion */}
        <Route path="/login" element={<Identification />} />

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
              <h1>Statistiques</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <h1>Mon profile</h1>
            </ProtectedRoute>
          }
        />

        {/* Route inconnue */}
        <Route path="*" element={<h1>Page non trouvée</h1>} />
      </Routes>
    </Layout>
  );
}

export default App;
