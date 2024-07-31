import { Button, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

// Define a type for the data rows
interface DataType {
  key: React.Key;
  
  [key: string]: unknown; // This allows for any additional keys with values of any type
}

// Define a type for the columns configuration
interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
}

interface DataPreviewStepProps {
  fileData: DataType[];
  nextStep: () => void;
}

export default function DataPreviewStep({
  fileData,
  nextStep,
}: DataPreviewStepProps) {
  const [data, setData] = useState<DataType[]>([]);
  const [columns, setColumns] = useState<TableColumnsType<DataType>>([]);

  useEffect(() => {
    if (fileData && fileData.length > 0) {
      // Extract column titles
      const columnTitles = Object.keys(fileData[0]);
      const tableColumns: ColumnType[] = columnTitles.map((title) => ({
        title: title,
        dataIndex: title,
        key: title,
      }));
      setColumns(tableColumns);

      // Extract data
      const tableData = fileData.map((row, index) => ({
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
       //@ts-expect-error
        key: index,
        ...row,
      }));
      setData(tableData);
    }
  }, [fileData]);

  return (
    <>
      <span className="m-2">Press Previous to change file</span>
      <div>
        <Table
          scroll={{ x: "auto", y: "auto" }}
          pagination={false}
          dataSource={data}
          columns={columns}
          className="w-full"
        />
        <Button
          onClick={nextStep}
          htmlType="submit"
          className="!min-w-60 !h-[3rem] !bg-blue-500 !text-white font-bold mb-6 py-2 px-4 rounded !flex !items-center !justify-center mx-auto mt-8 hover:scale-105 "
        >
          Proceed to Next Step <FaRegArrowAltCircleRight size={20} />
        </Button>
      </div>
    </>
  );
}
