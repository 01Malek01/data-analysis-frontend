import Visualization from "../../components/Visualization";
import { useParams } from "react-router-dom";

function VisualizePage() {
  const params = useParams();
  const chartType = params.chartType;
  const id = params.id;
  console.log(chartType);
  return <Visualization type={chartType} id= {id}/>;
}

export default VisualizePage;
