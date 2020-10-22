import React from "react";
import { Layout } from "antd";
import Header from "../layout/header";
import Sider from "../layout/sider";
import Breadcrumbs from "../layout/breadcrumbs";
import "antd/dist/antd.css";
import Footer from "./footer";
import styles from './layout.module.scss';

export default function LoggedInPageLayout({ children }) {
  const { Content } = Layout;
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider />
        <Layout className={styles["site-layout"]}>
          <Header />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumbs />
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
  );
}
