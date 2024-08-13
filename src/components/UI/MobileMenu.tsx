import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import { TbDatabaseImport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

type MenuItem = Required<MenuProps>["items"][number];
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const MobileMenu= ({ className }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [current, setCurrent] = useState<string>("home");
  const navigate = useNavigate();
  const controls = useAnimation();
  const items: MenuItem[] = [
    {
      label: "Home",
      key: "/",
      icon: <FaHome />,
    },
    ...(isAuthenticated
      ? [
          {
            label: "Dashboard",
            key: "dashboard",
            icon: <MdDashboard />,
          },
        ]
      : []),
    {
      label: "Ingest Data",
      key: "ingest-data",
      icon: <TbDatabaseImport />,
    },
    ...(isAuthenticated
      ? [
          {
            label: "Account",
            key: "account",
            children: [
              {
                label: "Sign Out",
                key: "logout",
              },
              {
                label: "Profile",
                key: "profile",
              },
            ],
          },
        ]
      : [
          {
            label: "Sign In",
            key: "signin",
          },
        ]),
  ];
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "signin") {
      loginWithRedirect();
    } else if (e.key === "logout") {
      logout();
    } else {
      navigate(e.key);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        controls.start({ backgroundColor: "rgba(255, 255, 255,0.6)" });
      } else {
        controls.start({ backgroundColor: "#fff" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <div className={`${className}`} style={{ width: 256 }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <motion.div
        animate={controls}
        initial={{ backgroundColor: "#fff" }}
        className="w-fit transition-all duration-300 ease-in-out"
      >
        <Menu
          className={`bg-inherit ${collapsed ? "w-0" : "w-60"}`}
          selectedKeys={[current]}
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          // theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </motion.div>
    </div>
  );
};

export default MobileMenu;
