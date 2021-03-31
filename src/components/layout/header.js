import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import User from "../redux/models/user/user";
import styles from "./layout.module.scss";

export default function Header({ collapsed, toggle }) {
  console.log(styles);
  const { Header } = Layout;
  const location = useLocation();

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="">Profile</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="">Change Password</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => User.logoutCall()}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Header>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: toggle,
      })}
      <div className="app-header-right">
        <div className="loggedin-user-dd">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a href="#menu" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} /> {User.getName()} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}