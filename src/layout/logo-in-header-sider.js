import React, { useState } from "react";
import { Menu, Layout } from "antd";
import { Link } from 'react-router-dom';
import { UserOutlined } from "@ant-design/icons";
// import styles from "./layout.module.scss";
import navigations from './navigations';
// import sitLogo from '../assets/images/logo.svg';

export default function Sider({ collapsed, setCollapsed }) {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  // const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  // onBreakpoint = {(v)=> {v == "sm" ? setWidth(0) : v == "md" ? setWidth(80) : setWidth(0)}}
  const [collapsedWidth, setCollapsedWidth] = useState(80);

  const onBreakpoint = (broken)=>{
    if(broken){
      setCollapsedWidth(0);
    } else {
      setCollapsedWidth(80);
    }
  }
  
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} breakpoint={"md"} 
      onBreakpoint={onBreakpoint}
      collapsedWidth={collapsedWidth}
      className="sider-wrap"
    >
      {/* <div className={styles["logo"] + ' sider-logo'} >
        <img src={sitLogo} alt="" />
      </div> */}
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" className="sider-menu-wrap">
        {navigations.map((navigation, i) => {
          if ((navigation.children?.length ?? 0) > 0) {
            return (
              <SubMenu key={i} icon={<UserOutlined />} title={navigation.name}>
                {navigation.children.map((subNavigation, j) => (
                  <Menu.Item key={`${i}_${j}`}><Link to={subNavigation.path}>{subNavigation.name}</Link></Menu.Item>
                ))}
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
