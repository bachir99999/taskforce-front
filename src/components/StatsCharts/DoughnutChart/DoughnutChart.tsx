import { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import { Chart } from "primereact/chart";
import "./DoughnutChart.css";
import { chartColors } from "../themeChart";
import { countStatuses } from "../../../lib/statsUtils/statsUtils";
import Loading from "../../Loading/Loading";

interface DoughnutChartProps {
  taskList: Task[];
}

function DoughnutChart({ taskList }: DoughnutChartProps) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const countStatus = countStatuses(taskList);

    const data = {
      labels: ["A faire", "En cours", "Terminée"],
      datasets: [
        {
          data: [
            countStatus["TODO"] ?? 0,
            countStatus["IN_PROGRESS"] ?? 0,
            countStatus["DONE"] ?? 0,
          ],
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
      maintainAspectRatio: false,
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
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="doughnut-chart-container">
      <div className="dougnut-title">Proportion des états</div>
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        width="350px"
        className="w-full md:w-30rem"
      />
    </div>
  );
}

export default DoughnutChart;
