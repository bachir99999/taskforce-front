import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskBoard />} />
        <Route path="/stats" element={<h1>Statistiques</h1>} />
        <Route path="/user" element={<h1>Mon profile</h1>} />
      </Routes>
    </div>
  );
}

export default App;
