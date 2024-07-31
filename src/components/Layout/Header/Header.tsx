import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbDatabaseImport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd"; // Assuming you're keeping Ant Design's Menu
import { useAuth0 } from "@auth0/auth0-react";
import type { MenuProps } from "antd"; // Importing type for MenuProps


interface MenuItem {
  label: string;
  key: string;
  icon?: React.ReactNode;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState<string>("home");
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const items: MenuItem[] = [
    {
      label: "Home",
      key: "/",
      icon: <FaHome />,
    },
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Ingest Data",
      key: "ingest-data",
      icon: <TbDatabaseImport />,
    },
    {
      label: isAuthenticated ? "Profile" : "",
      key: isAuthenticated ? "profile" : "",
    },
    {
      label: isAuthenticated ? "Sign Out" : "Sign In",
      key: isAuthenticated ? "logout" : "signin",
    },
  ];

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

  return (
    <div className="header flex items-center justify-between pt-2 h-fit">
      <div className="logo">
        <img
          className="size-[60px]"
          src="_852c2272-c1a1-418d-86f4-b23532dd0cb6.jpg"
          alt="logo"
        />
      </div>
      <div className="menu w-full flex-1">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          className="justify-end w-full py-2"
        />
      </div>
    </div>
  );
};

export default Header;
