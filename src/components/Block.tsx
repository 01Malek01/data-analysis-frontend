import { formatDate } from "../utils/FormatDate";
function Block({
  name,
  fileType,
  createdAt,
  onClick,
}: {
  name: string;
  fileType?: string;
  createdAt: string;
  onClick?: () => void;
  chartType?: string;
}) {
  const formattedDate = formatDate(createdAt);

  return (
    <div className="block-wrapper">
      <div
        onClick={onClick}
        className="block-container flex-wrap flex gap-8 p-3 bg-slate-600/5 dark:bg-slate-800 rounded outline outline-blue-300 my-5 cursor-pointer hover:scale-105 transition-all"
      >
        <span className="text-sm flex-1 dark:text-white">
          File name: <p className="text-purple-600">{name}</p>
        </span>
        {fileType && (
          <span className="text-sm flex-1 dark:text-white ">
            File type:{" "}
            <span className="text-purple-600">{fileType?.slice(0, 50)}...</span>
          </span>
        )}
        <span className="text-sm flex-1   dark:text-white">
          Created at: <span className="text-purple-600 ">{formattedDate}</span>
        </span>
      </div>
    </div>
  );
}

export default Block;
