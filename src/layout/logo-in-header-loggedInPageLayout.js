import React, {useState} from "react";
import { Layout } from "antd";
import Header from "../layout/logo-in-header-header";
import Sider from "../layout/logo-in-header-sider";
import Breadcrumbs from "../layout/breadcrumbs";
import "antd/dist/antd.css";
import Footer from "./footer";
import styles from './layout.module.scss';

export default function LoggedInPageLayout({ children }) {
  const { Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Layout className={styles["site-layout"]}>
          <Sider collapsed={collapsed} setCollapsed={setCollapsed}/>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumbs />
              {children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
  );
}
