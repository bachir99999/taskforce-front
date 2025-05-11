import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { Task } from "../../../types/task";
import "./BarChart.css";
import { chartColors } from "../themeChart";
import {
  getLast12Months,
  getLast12MonthsData,
} from "../../../lib/statsUtils/statsUtils";
import Loading from "../../Loading/Loading";

interface BarChartProps {
  taskList: Task[];
}

function BarChart({ taskList }: BarChartProps) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const tasksTODO = taskList.filter((task) => task.status === "TODO");
    const tasksIN_PROGRESS = taskList.filter(
      (task) => task.status === "IN_PROGRESS"
    );
    const tasksDONE = taskList.filter((task) => task.status === "DONE");

    const data = {
      labels: getLast12Months(),
      datasets: [
        {
          type: "bar",
          label: "A faire",
          backgroundColor: chartColors.todo,
          hoverBackgroundColor: chartColors.todo400,
          data: getLast12MonthsData(tasksTODO).map((value) => value.count),
        },
        {
          type: "bar",
          label: "En cours",
          backgroundColor: chartColors.inprogress,
          hoverBackgroundColor: chartColors.inprogress400,
          data: getLast12MonthsData(tasksIN_PROGRESS).map(
            (value) => value.count
          ),
        },
        {
          type: "bar",
          label: "Terminée",
          backgroundColor: chartColors.done,
          hoverBackgroundColor: chartColors.done400,
          data: getLast12MonthsData(tasksDONE).map((value) => value.count),
        },
      ],
    };

    const options = {
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: "#fff", // Couleur des labels
            font: {
              size: 14,
              family: "Arial, sans-serif",
            },
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: "#fff", // Couleur des ticks de l'axe X
          },
          grid: {
            color: "rgba(0, 255, 255, 0.2)", // Couleur de la grille
          },
        },
        y: {
          stacked: true,
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
    <div className="bar-chart-container">
      <div className="bar-chart-title">Évolution des données sur une année</div>
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        className="stats-bar-chart"
        width="350px"
      />
    </div>
  );
}

export default BarChart;
