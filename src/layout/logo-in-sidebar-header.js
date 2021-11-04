import React from "react";
import { Layout } from "antd";
// import { useLocation } from 'react-router-dom';
// import routes from '../routes/routes';
import styles from './layout.module.scss';
import sitLogo from '../assets/images/logo.svg';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

export default function Header({collapsed, setCollapsed}) {
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  // console.log(styles);
  const { Header } = Layout;
  // const location = useLocation();
  return (
    <Header className={styles['site-layout-background'] + ' header-wrap'} style={{ padding: '0', color: '#fff' }} >
      <div className="sider-collapsed-icon" onClick={onCollapse}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined/>}
      </div>
      <div className="header-content">
          <img src={sitLogo} alt=""/>
      </div>
    </Header>
  );
}
