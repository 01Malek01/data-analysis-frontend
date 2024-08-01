import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LineChart";
import RadarChart from "./Charts/RadarChart";
import { useGetFileData } from "../hooks/api/useGetFileData";
import LoadingSpinner from "./UI/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";

function Visualization({ type, id }) {
  const { getFileData, isPending } = useGetFileData();
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    const fileId = localStorage.getItem("processedFileId") || id;
    if (fileId) {
      const res = new Promise((resolve, reject) => {
        getFileData({ id: fileId })
          .then((data) => {
            resolve(data);
            console.log(data);
            setFetchedData(data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
    console.log(fileId);
  }, [getFileData, id]);
  if (isPending) {
    return <LoadingSpinner />;
  }
  let chartComponent;

  switch (type) {
    case "bar":
      chartComponent = <BarChart data={fetchedData} />;
      break;
    case "pie":
      chartComponent = <PieChart data={fetchedData} />;
      break;
    case "line":
      chartComponent = <LineChart data={fetchedData} />;
      break;
    case "radar":
      chartComponent = <RadarChart data={fetchedData} />;
      break;
    default:
      chartComponent = <div>Invalid chart type</div>;
      break;
  }
  return (
    <div className="w-full mt-5 border-blue-400 p-5 py-20 flex items-center justify-center mx-auto rounded-lg  bg-slate-200/50 h-full">
      {chartComponent}
    </div>
  );
}

export default Visualization;
