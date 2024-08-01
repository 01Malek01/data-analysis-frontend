import { useNavigate } from "react-router-dom";
import { useFileContext } from "../Context/FileContext";

type Props = {
  title: string;
  icon: JSX.Element;
  description: string;
  type: string;
};
function ChartChoice({ title, icon, description, type }: Props) {
  const navigate = useNavigate();
  const {fileId} = useFileContext();
  const onClick = () => {
    navigate(`/visualize/${fileId}/${type}`);
  };
  return (
    <div
      onClick={onClick}
      className="choice hover:outline hover:outline-2 hover:outline-blue-500 p-10 md:w-96 border bg-slate-200/50 border-blue-500 flex flex-col items-center justify-center cursor-pointer rounded-lg "
    >
      <span className="choice-title text-xl text-blue-500">{title}</span>
      <span className="choice-icon ">{icon}</span>
      <span className="choice-description ">{description}</span>
    </div>
  );
}

export default ChartChoice;
