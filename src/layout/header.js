import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { Header } = Layout;
  const location = useLocation();
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1"><Link to="/" >Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/projects" >Projects</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/users" >Users</Link></Menu.Item>
      </Menu>
    </Header>
  );
}
