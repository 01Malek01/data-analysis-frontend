import { useEffect } from "react";
import { useFileContext } from "../../Context/FileContext";
import useGetAllFiles from "../../hooks/api/useGetAllFiles";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import FilterOptions from "../../components/FilterOptions";

export default function Dashboard() {
  const { allFiles, setAllFiles, filteredFiles, setFilteredFiles } =
    useFileContext();
  const { files, isLoading, isSuccess, isError } = useGetAllFiles();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) toast.loading("Fetching data...");
    if (isSuccess) {
      toast.dismiss();
      toast.success("Data fetched successfully");
      setAllFiles(files);
      setFilteredFiles(files);
    }
    if (isError) {
      toast.error("Failed to fetch data");
    }
  }, [
    allFiles,
    setAllFiles,
    files,
    isLoading,
    isSuccess,
    isError,
    setFilteredFiles,
  ]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-4 h-screen">
        <div className="recent-files lg:col-span-1 w-full bg-slate-100  rounded-xl p-3 mt-5">
          <h2 className="text-2xl mb-3"> Recent Files</h2>
          {allFiles && allFiles?.length > 0 ? (
            allFiles
              ?.slice(-5)
              ?.reverse()
              .map((file) => (
                <Block
                  onClick={() => navigate(`/visualize/${file._id}/bar`)}
                  key={file._id}
                  name={file.name}
                  createdAt={file.createdAt}
                />
              ))
          ) : (
            <div className="text-center text-xl mt-20">
              {" "}
              No recent files at the moment.
            </div>
          )}
        </div>
        <div className="all-files lg:col-span-2 w-full p-3">
          <h2 className="text-2xl mb-3">All Files</h2>
          <FilterOptions />
          {allFiles && allFiles?.length > 0 ? (
            filteredFiles && filteredFiles?.length > 0 ? (
              filteredFiles?.map((file) => (
                <Block
                  onClick={() => navigate(`/visualize/${file._id}/bar`)}
                  key={file._id}
                  name={file.name}
                  fileType={file.fileType}
                  createdAt={file.createdAt}
                />
              ))
            ) : (
              allFiles?.map((file) => (
                <Block
                  onClick={() => navigate(`/visualize/${file._id}/bar`)}
                  key={file._id}
                  name={file.name}
                  fileType={file.fileType}
                  createdAt={file.createdAt}
                />
              ))
            )
          ) : isSuccess ? (
            <div className="text-center text-xl mt-20">
              {" "}
              No files found.
              <Link className="text-blue-500 underline" to="/ingest-data">
                {" "}
                Ingest data now
              </Link>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        <div className="options lg:col-span-1 w-full bg-slate-100  rounded-xl p-3 mt-5">
          options
        </div>
      </div>
    </div>
  );
}
