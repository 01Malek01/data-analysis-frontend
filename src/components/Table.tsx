import { Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";

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

export default function TableComponent({ data }) {
  const [dataToShow, setDataToShow] = useState<DataType[]>([]);
  const [columns, setColumns] = useState<TableColumnsType<DataType>>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Extract column titles
      const columnTitles = Object.keys(data[0]);
      const tableColumns: ColumnType[] = columnTitles.map((title) => ({
        title: title,
        dataIndex: title,
        key: title,
      }));
      setColumns(tableColumns);

      // Extract data
      const tableData = data.map((row, index) => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        key: index,
        ...row,
      }));
      setDataToShow(tableData);
    }
  }, [data]);

  return (
    <>
      <div>
        <Table
          scroll={{ x: "auto", y: "auto" }}
          pagination={false}
          dataSource={dataToShow}
          columns={columns}
          className="w-full"
        />
      </div>
    </>
  );
}
