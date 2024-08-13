import Visualization from "../../components/Visualization";
import {  useParams } from "react-router-dom";

function VisualizePage() {
  const params = useParams();
  const chartType =  params.chartType;

  const id = params.id;
  return <Visualization type={chartType} id={id as string} />;
}

export default VisualizePage;
