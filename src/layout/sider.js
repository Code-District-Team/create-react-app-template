import React from "react";
import { Menu, Layout } from "antd";
import { Link } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
//import styles from "./layout.module.scss";
import navigations from './navigations';
import { isRolePresent } from '../utilities/generalUtility';
import User from "../models/user/user";

export default function Sider({ collapsed }) {

  // get current user's role

  const { Sider } = Layout;
  const { SubMenu } = Menu;

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="ant-layout-sider-logo">
        <img src="images/logo.png" alt="" />
      </div>
      <Menu defaultSelectedKeys={["1"]} mode="inline">
        {navigations.map((navigation, i) => {
          const hasRole = isRolePresent(navigation.roles, User.roles());
          
          if (!hasRole) {
            return null;
          }

          if ((navigation.children?.length ?? 0) > 0) {
            return (
              <SubMenu key={i} icon={<UserOutlined />} title={navigation.name}>
                {navigation.children.map((subNavigation, j) => {
                  const navHasRole = isRolePresent(subNavigation.roles, User.roles());
                  return navHasRole ? <Menu.Item key={`${i}_${j}`}><Link to={subNavigation.path}>{subNavigation.name}</Link></Menu.Item> : null;
                })}
              </SubMenu>
            );
          } else {
            return  (
              <Menu.Item key={i} icon={navigation.icon}>
                <Link to={navigation.path}>{navigation.name}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Sider>
  );
}
