import { useContext } from "react";
import { Button, ConfigProvider, Space } from "antd";
import { css } from "@emotion/react";
import { TbAnalyze } from "react-icons/tb";

const GradientButton = ({ title, onClick }: { title: string , onClick: () => void }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();

  const gradientClassName = css`
    background: linear-gradient(135deg, #6253e1, #04befe);
    color: white; /* Ensure text color is visible over gradient */
    border: none; /* Remove border for a seamless effect */
    padding: 8px 16px; /* Adjust padding as needed */
    border-radius: 4px; /* Add rounded corners */
    transition: all 0.3s;
    cursor: pointer; /* Add pointer cursor for interaction */

    &:hover {
      opacity: 0.8; /* Adjust hover opacity as desired */
    }
  `;

  return (
    <ConfigProvider>
      <Space>
        <Button
          type="primary"
          size="large"
          icon={<TbAnalyze />}
          className={`${rootPrefixCls}-btn ${gradientClassName} z-20`}
          onClick={onClick}
        >
          {title}
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default GradientButton;
