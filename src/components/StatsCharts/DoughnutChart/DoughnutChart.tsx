import { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import { Chart } from "primereact/chart";
import "./DoughnutChart.css";
import { chartColors } from "../themeChart";
import { color } from "chart.js/helpers";

interface DoughnutChartProps {
  taskList: Task[];
}

function DoughnutChart({ taskList }: DoughnutChartProps) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ["A faire", "En cours", "Terminé"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            chartColors.todo,
            chartColors.inprogress,
            chartColors.done,
          ],
          hoverBackgroundColor: [
            chartColors.todo400,
            chartColors.inprogress400,
            chartColors.done400,
          ],
          borderColor: [chartColors.black],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      cutout: "60%",
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
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="doughnut-chart-container">
      <div className="dougnut-title">Proportion des états</div>
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}

export default DoughnutChart;
