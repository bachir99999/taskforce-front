import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import "./LineChart.css";
import { chartColors } from "../themeChart";
import { Task } from "../../../types/task";
import {
  getLast8Weeks,
  getLast8WeeksDataByStatus,
} from "../../../lib/statsUtils/statsUtils";
import Loading from "../../Loading/Loading";

interface LineChartProps {
  taskList: Task[];
}

function LineChart({ taskList }: LineChartProps) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const stats = getLast8WeeksDataByStatus(taskList);

    const data = {
      labels: getLast8Weeks().map((date) => date.weekNumber),
      datasets: [
        {
          label: "A faire",
          data: stats.map((stat) => stat.todo),
          fill: false,
          borderColor: chartColors.todo,
          tension: 0.4,
        },
        {
          label: "En cours",
          data: stats.map((stat) => stat.in_progress),
          fill: false,
          borderColor: chartColors.inprogress,
          tension: 0.4,
        },
        {
          label: "Terminée",
          data: stats.map((stat) => stat.done),
          fill: false,
          borderColor: chartColors.done,
          tension: 0.4,
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: "#fff",
            font: {
              size: 14,
              family: "Arial, sans-serif",
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#fff", // Couleur des ticks de l'axe X
          },
          grid: {
            color: "rgba(0, 255, 255, 0.2)", // Couleur de la grille
          },
        },
        y: {
          ticks: {
            color: "#fff", // Couleur des ticks de l'axe Y
          },
          grid: {
            color: "rgba(0, 255, 255, 0.2)", // Couleur de la grille
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="line-chart-container">
      <div className="line-chart-title">
        Évolution des données sur les 8 dernières semaines
      </div>
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
        width="350px"
      />
    </div>
  );
}

export default LineChart;
