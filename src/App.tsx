import { Route, Routes } from "react-router-dom";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import LoginForm from "./components/LoginForm/LoginForm";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Layout from "./layouts/Layout";
import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Route de connexion */}
        <Route path="/login" element={<LoginForm />} />

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
