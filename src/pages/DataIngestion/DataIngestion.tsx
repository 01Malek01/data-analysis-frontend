import React, { useState } from "react";
import { Button, Steps, theme } from "antd";
import FileUpload from "../../components/FileProcessSteps/FileUploadStep";
import DataPreviewStep from "../../components/FileProcessSteps/DataPreviewStep";
import VisualizeStep from "../../components/FileProcessSteps/VisualizeStep";
import { useFileContext } from "../../Context/FileContext";

const DataIngestion: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const { fileData, setFileData } = useFileContext();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  type Steps = {
    title: string;
    content: React.ReactNode | string;
  };

  const steps: Steps[] = [
    {
      title: "Select File",
      content: <FileUpload setFileData={setFileData} nextStep={next} />,
    },
    {
      title: "Preview Data",
      content: <DataPreviewStep fileData={fileData} nextStep={next} />,
    },
    {
      title: "Visualize Data",
      content: <VisualizeStep fileData={fileData} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className="p-6 w-full h-fit  ">
      <Steps current={current} items={items} />
      <div className=" h-full" style={contentStyle}>
        {steps[current].content}
      </div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataIngestion;
