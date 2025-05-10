import { useState } from "react";
import "./Stats.css";
import { useAuth } from "../../context/AuthContext";
import { Task } from "../../types/task";
import DoughnutChart from "../../components/StatsCharts/DoughnutChart/DoughnutChart";
import BarChart from "../../components/StatsCharts/BarChart/BarChart";

function Stats() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  return (
    <div className="stats-container">
      <h1>Stats</h1>
      <div className="stats-charts">
        <div className="stats-doughnut">
          <DoughnutChart taskList={[]} />
        </div>
        <div className="stats-bar">
          <BarChart taskList={[]} />
        </div>
      </div>
    </div>
  );
}

export default Stats;
