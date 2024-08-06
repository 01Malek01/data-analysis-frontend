import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

// Define the handleChartTypeChange function outside the component if it's used elsewhere.


function ChartTypeDropdown({onClick} : {onClick: (key) => void}) {
  const menu = (
    <Menu onClick={({ key }) => onClick(key)}>
      <Menu.Item key="bar">Bar</Menu.Item>
      <Menu.Item key="pie">Pie</Menu.Item>
      <Menu.Item key="line">Line</Menu.Item>
      <Menu.Item key="radar">Radar</Menu.Item>
      <Menu.Item key="table">Table</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex gap-5">
      <Dropdown overlay={menu}>
        <Button style={{ marginTop: "10px" }}>
          Select Visualization Type <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default ChartTypeDropdown;
