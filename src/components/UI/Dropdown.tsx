import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

// const onClick: MenuProps["onClick"] = ({ key }) => {
//   message.info(`Click on item ${key}`);
// };

// const items: MenuProps["items"] = [
//   {
//     label: "1st menu item",
//     key: "1",
//   },
//   {
//     label: "2nd menu item",
//     key: "2",
//   },
//   {
//     label: "3rd menu item",
//     key: "3",
//   },
// ];

const DropdownMenu = ({
  items,
  onClick,
  title,
}: {
  items: MenuProps["items"];
  onClick: MenuProps["onClick"];
  title: string;
}) => (
  <Dropdown menu={{ items, onClick }} className="cursor-pointer">
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        {title}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default DropdownMenu;
