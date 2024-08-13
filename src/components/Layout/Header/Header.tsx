import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbDatabaseImport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import type { MenuProps } from "antd"; 
import MobileMenu from "../../UI/MobileMenu";

interface MenuItem {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
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
      label: isAuthenticated ? "Dashboard" : "",
      key: isAuthenticated ? "dashboard" : "dashboard",
      icon: isAuthenticated ? <MdDashboard /> : "",
    },
    {
      label: "Ingest Data",
      key: "ingest-data",
      icon: <TbDatabaseImport />,
    },
    {
      label: isAuthenticated ? "Account" : "",
      key: isAuthenticated ? "account" : "",
      children: [
        {
          label: isAuthenticated ? "Sign Out" : "Sign In",
          key: isAuthenticated ? "logout" : "signin-child",
        },
        {
          label: isAuthenticated ? "Profile" : "",
          key: isAuthenticated ? "profile" : "profile",
        },
      ],
    },
    {
      label: isAuthenticated ? "" : "Sign In",
      key: isAuthenticated ? "" : "signin",
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "signin") {
      loginWithRedirect();
    } else if (e.key === "logout") {
      logout();
    }  else {
      navigate(e.key);
    }
  };

  return (
    <div className="header  w-full  flex flex-col md:flex-row items-center  dark:!bg-slate-300/70 dark:text-white justify-between  h-[70px]">
      <div className="logo  flex items-center justify-center  ">
        <img
          className="size-[40px] md:size-[60px] object-contain rounded-full  "
          src="_852c2272-c1a1-418d-86f4-b23532dd0cb6.jpg"
          alt="logo"
        />
      </div>
      <div className="menu w-full flex-1  top-0 fixed md:relative z-20 md:z-0 ">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{ border: "none",height:"100%" }}
          className="justify-center md:justify-end w-full h-full py-2 hidden md:flex  dark:!text-white dark:!bg-slate-300/70"
        />
        
        <MobileMenu className="md:hidden" />
      </div>
    </div>
  );
};

export default Header;
