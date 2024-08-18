// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from "react";
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
import Notes from "./Notes";
import ExportPdfButton from "./ExportAsPDF";

// Define types for props
interface VisualizationProps {
  id: string;
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

const Visualization = ({ id, type }: VisualizationProps) => {
  const navigate = useNavigate();
  const { getFileData, isPending } = useGetFileData();
  const { downloadUrl } = useGetDownloadUrl(id || "");

  // State types
  const [fetchedData, setFetchedData] = useState<FetchedData | null>(null);
  const [fileState, setFileState] = useState<FileState | null>(null);

  const initialChartType = type || "bar";
  const [chartType, setChartType] = useState<string>(initialChartType);
  const [url, setUrl] = useState<DownloadUrlResponse | null>(null);

  useEffect(() => {
    if (downloadUrl) {
      setUrl(downloadUrl.uploadUrl);
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
      chartComponent = <BarChart id="exportable" data={fetchedData} />;
      break;
    case "pie":
      chartComponent = <PieChart id="exportable" data={fetchedData} />;
      break;
    case "line":
      chartComponent = <LineChart id="exportable" data={fetchedData} />;
      break;
    case "radar":
      chartComponent = <RadarChart id="exportable" data={fetchedData} />;
      break;
    case "table":
      chartComponent = <TableComponent id="exportable" data={fetchedData} />;
      break;
    default:
      chartComponent = <div>Invalid chart type</div>;
      break;
  }

  return (
    <div className="w-full border border-blue-400 p-10 py-20 flex flex-col items-center justify-start mx-auto rounded-lg bg-slate-200/20 h-full">
      <h1 className="text-2xl m-5">Visualization of {fileState?.name}</h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 w-full justify-between items-center">
        <div
          className="chart w-full m-3 col-span-9 dark:bg-slate-200 rounded-md p-2"
          id="exportable"
        >
          {chartComponent}
        </div>

        <div className="md:col-span-3 md:self-start md:mx-auto mt-3 md:mt-3   dark:bg-slate-200 rounded-md p-2 ">
          <Notes id={id} />
        </div>
      </div>
      <div className="description grid grid-cols-1 md:grid-cols-6 items-center justify-between w-full mt-5 ">
        {fileState && (
          <div className="flex flex-col gap-1 col-span-4 ">
            <strong className="dark:text-white">Name:</strong>{" "}
            <span className="text-purple-600">{fileState?.name}</span>
            <strong className="dark:text-white">Date of Creation:</strong>{" "}
            <span className="text-purple-600">
              {formatDate(fileState?.createdAt)}
            </span>
            <strong className="dark:text-white">File Type:</strong>{" "}
            <span className="text-purple-600">{fileState?.fileType}</span>
            <Link
              className="text-blue-500 underline"
              to={(url as string) || ""}
              target="_blank"
            >
              Download Excel File
            </Link>
          </div>
        )}
        <div className="actions w-full flex flex-col col-span-2">
          <div className="flex gap-5 w-full text-center">
            <ChartTypeDropdown onClick={handleChartTypeChange} />
          </div>
          <ExportPdfButton elementId="exportable" />
        </div>
      </div>
    </div>
  );
};

export default Visualization;
