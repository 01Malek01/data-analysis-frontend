import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function BarChart({ data }) {
  const xValues = data?.map((el) => Object.values(el)[0]);
  const yValues = data?.map((el) => Object.values(el)[1]);

  // const labels = [...xValues];
  const dataToShow = {
    labels: xValues,
    datasets: [
      {
        label: "Bar Dataset",
        data: yValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      
      <Bar data={dataToShow} options={options as any} />
    </div>
  );
}
