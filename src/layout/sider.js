import React from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
//import styles from "./layout.module.scss";
import navigations from "./navigations";
import { isRolePresent } from "utilities/generalUtility";
import User from "models/user/user";

export default function Sider({ collapsed, setCollapsed }) {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsedWidth, setCollapsedWidth] = React.useState(80);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const onBreakpoint = (broken) => {
    // * Hide sider on screen width less than 768px
    if (broken) {
      setCollapsedWidth(0);
    } else {
      setCollapsedWidth(80);
    }
  };
  return (
    <Sider
      breakpoint="md"
      collapsible
      collapsed={collapsed}
      collapsedWidth={collapsedWidth}
      onCollapse={onCollapse}
      onBreakpoint={onBreakpoint}
      trigger={null}
    >
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
                  const navHasRole = isRolePresent(
                    subNavigation.roles,
                    User.roles()
                  );
                  return navHasRole ? (
                    <Menu.Item key={`${i}_${j}`}>
                      <Link to={subNavigation.path}>{subNavigation.name}</Link>
                    </Menu.Item>
                  ) : null;
                })}
              </SubMenu>
            );
          } else {
            return (
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
