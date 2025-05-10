import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { Task } from "../../../types/task";
import "./BarChart.css";
import { chartColors } from "../themeChart";

interface BarChartProps {
  taskList: Task[];
}

function BarChart({ taskList }: BarChartProps) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          type: "bar",
          label: "Dataset 1",
          backgroundColor: chartColors.todo,
          hoverBackgroundColor: chartColors.todo400,
          data: [50, 25, 12, 48, 90, 76, 42],
        },
        {
          type: "bar",
          label: "Dataset 2",
          backgroundColor: chartColors.inprogress,
          hoverBackgroundColor: chartColors.inprogress400,
          data: [21, 84, 24, 75, 37, 65, 34],
        },
        {
          type: "bar",
          label: "Dataset 3",
          backgroundColor: chartColors.done,
          hoverBackgroundColor: chartColors.done400,
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
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
            color: "#fff", // Couleur de la grille
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: "#fff", // Couleur des ticks de l'axe Y
          },
          grid: {
            color: "#fff", // Couleur de la grille
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-title">Évolution des données</div>
      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        className="stats-bar-chart"
      />
    </div>
  );
}

export default BarChart;
