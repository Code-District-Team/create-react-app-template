import React from "react";
import { Layout, Avatar } from "antd";
// import { useLocation } from 'react-router-dom';
// import routes from '../routes/routes';
import styles from './layout.module.scss';
import sitLogo from '../assets/images/logo.svg';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';

export default function Header({collapsed, setCollapsed}) {
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  // console.log(styles);
  const { Header } = Layout;
  // const location = useLocation();
  return (
    <Header className={styles['site-layout-background'] + ' header-wrap lih-header-wrap'} style={{ padding: '0', color: '#fff' }} >
    
      <div className="lih-header-logo-wrap">
        <div className="header-logo">
          <img src={sitLogo} alt="" className="lih-logo"/>
        </div>
        <div className="sider-collapsed-icon" onClick={onCollapse}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined/>}
        </div>
      </div>
      <div className="header-content">
        <div className="profile-setting-dropdwon">
          <div className="user-image">
            <Avatar icon={<UserOutlined />} />
          </div>
          <div className="user-name">
            <h5> <span> User Name </span> <DownOutlined /></h5>
          </div>
            
            
        </div>
       
      </div>
    </Header>
  );
}
