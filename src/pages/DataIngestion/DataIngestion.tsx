import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import FileUpload from "../../components/FileProcessSteps/FileUploadStep";
import DataPreviewStep from "../../components/FileProcessSteps/DataPreviewStep";
import VisualizeStep from "../../components/FileProcessSteps/VisualizeStep";

const DataIngestion: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [fileData, setFileData] = useState<JSON | null>(null);

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
      content: (
        <DataPreviewStep setFileData={setFileData} fileData={fileData} nextStep={next} />
      ),
    },
    {
      title: "Visualize Data",
      content: <VisualizeStep nextStep={next} fileData={fileData} />,
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
    <div className="p-6 w-full ">
      <Steps current={current} items={items} />
      <div className=" h-full" style={contentStyle}>
        {steps[current].content}
      </div>
      <div style={{ marginTop: 24 }}>
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
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
