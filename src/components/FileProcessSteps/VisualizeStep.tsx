import { useEffect, useState } from "react";
import VisualizationChoice from "../Charts/VisualizationChoice";

function VisualizeStep({ fileData }) {

  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    console.log("file data", fileData);

    const isValidData = fileData.every((obj) => {
      // Get the first two properties of the object
      const keys = Object.keys(obj).slice(0, 2);
      const values = keys.map((key) => obj[key]);

      // Check if there are at least two properties and validate the types
      if (values.length < 2) return false;
      // eslint-disable-next-line
      //@ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [firstValue, secondValue] = values;
      return typeof secondValue === "number";
    });

    if (isValidData) {
      console.log("File data is valid");
      setIsValid(true);
    } else {
      console.log("File data is invalid");
      setIsValid(false);
    }
  }, [fileData]);

  return (
    <div>
      {isValid ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        <VisualizationChoice fileData={fileData} />
      ) : (
        <span className="m-2 text-red-500">
          Sheet must be 2 columns and data must be numeric to visualize it using
          charts.{" "}
        </span>
      )}
    </div>
  ); 
}

export default VisualizeStep;
