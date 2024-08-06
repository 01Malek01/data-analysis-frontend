import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import LineChart from "./Charts/LineChart";
import RadarChart from "./Charts/RadarChart";
import { useGetFileData } from "../hooks/api/useGetFileData";
import LoadingSpinner from "./UI/LoadingSpinner/LoadingSpinner";
import useGetDownloadUrl, {
  DownloadUrlResponse,
} from "../hooks/api/useGetDownloadUrl";
import TableComponent from "./Table";
import ChartTypeDropdown from "./ChartTypeDropdown";
import { formatDate } from "../utils/FormatDate";

// Define types for props
interface VisualizationProps {
  id?: string ;
  type?: string;
}

// Define types for fetched data and file state
interface FetchedData {
  [key: string]: unknown;
}

interface FileState {
  name: string;
  createdAt: string;
  fileType: string;
  [key: string]: unknown;
}

const Visualization: React.FC<VisualizationProps> = ({ id, type }) => {
  const navigate = useNavigate();
  const { getFileData, isPending } = useGetFileData();
  const { downloadUrl } = useGetDownloadUrl(id);

  // State types
  const [fetchedData, setFetchedData] = useState<FetchedData | null>(null);
  const [fileState, setFileState] = useState<FileState | null>(null);
  const initialChartType = type || "bar";
  const [chartType, setChartType] = useState<string>(initialChartType);
  const [url, setUrl] = useState<DownloadUrlResponse | null>(null);

  useEffect(() => {
    if (downloadUrl) {
      setUrl(downloadUrl);
    }
    if (id) {
      getFileData({ id })
        .then((data) => {
          setFetchedData(data?.data);
          setFileState(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [getFileData, id, downloadUrl]);

  useEffect(() => {
    setChartType(initialChartType);
  }, [initialChartType]);

  const handleChartTypeChange = (newChartType: string) => {
    navigate(`/visualize/${id}/${newChartType}`, { replace: true });
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  let chartComponent;

  switch (chartType) {
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
    case "table":
      chartComponent = <TableComponent data={fetchedData} />;
      break;
    default:
      chartComponent = <div>Invalid chart type</div>;
      break;
  }

  return (
    <div className="w-full border border-blue-400 p-5 py-20 flex flex-col items-center justify-start mx-auto rounded-lg bg-slate-200/20 h-full">
      <div className="chart w-full m-2">{chartComponent}</div>
      <div className="description">
        {fileState && (
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1 justify-center items-start">
              <strong>Name:</strong> {fileState?.name}
              <strong>Date of Creation:</strong> {formatDate(fileState?.createdAt)}
              <strong>File Type:</strong> {fileState?.fileType}
              <Link
                className="text-blue-500 underline"
                to={(url as string) || ""}
                target="_blank"
              >
                Download Excel File
              </Link>
            </div>
            <div className="flex gap-5 flex-1">
              <ChartTypeDropdown onClick={handleChartTypeChange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualization;
