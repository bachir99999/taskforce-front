import { useEffect, useState } from "react";
import "./Stats.css";
import { useAuth } from "../../context/AuthContext";
import TaskForce from "../../assets/TaskForce1.png";
import { Task } from "../../types/task";
import DoughnutChart from "../../components/StatsCharts/DoughnutChart/DoughnutChart";
import BarChart from "../../components/StatsCharts/BarChart/BarChart";
import LineChart from "../../components/StatsCharts/LineChart/LineChart";
import { getAllTasksOfUser } from "../../lib/api/userAPI";
import Loading from "../../components/Loading/Loading";

function Stats() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      getAllTasksOfUser(user.id)
        .then((data) => {
          setTasks(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="stats-container">
      <img src={TaskForce} alt="Logo" className="app-logo" />
      <div className="stats-charts">
        <div className="stats-doughnut">
          <DoughnutChart taskList={tasks} />
        </div>
        <div className="stats-bar">
          <BarChart taskList={tasks} />
        </div>
        <div className="stats-line">
          <LineChart taskList={tasks} />
        </div>
      </div>
    </div>
  );
}

export default Stats;
