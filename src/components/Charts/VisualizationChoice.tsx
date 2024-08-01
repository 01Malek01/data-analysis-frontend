import { FaChartBar } from "react-icons/fa";
import ChartChoice from "../ChartChoice";
import { FaChartPie } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { AiOutlineRadarChart } from "react-icons/ai";

function VisualizationChoice() {

  return (
    <div className="wrapper">
      <div className="choices-container w-full h-full mb-10  ">
      <h1>Pick how you want to visualize your data</h1>
      <div className="flex md:flex-row flex-col gap-5 items-center justify-between">
        <ChartChoice
          title="Bar Chart"
          icon={<FaChartBar size={100} color="black" />}
          description=""
          type="bar"
          />
        <ChartChoice
          title="Pie Chart"
          icon={<FaChartPie size={100} color="black" />}
          description=""
          type="pie"
          />
        <ChartChoice
          title="Line Chart"
          icon={<FaChartLine size={100} color="black" />}
          description=""
          type="line"
          />
        <ChartChoice
          title="Radar Chart"
          icon={<AiOutlineRadarChart size={100} color="black" />}
          description=""
          type="radar"
          />
          </div>
      </div>
    </div>
  );
}

export default VisualizationChoice;
