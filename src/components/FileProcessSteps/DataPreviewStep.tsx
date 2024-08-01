import { Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import CustomButton from "../UI/CustomButton";

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

export default function DataPreviewStep({ fileData, nextStep }) {
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
        <CustomButton title="Proceed to next step" onClick={nextStep} styles="mb-7" />
      </div>
    </>
  );
}
