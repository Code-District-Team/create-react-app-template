import { Layout } from "antd";
import React, { useState } from "react";
import Breadcrumbs from "../components/layout/breadcrumbs";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Sider from "../components/layout/sider";
import styles from "./layout.module.scss";

export default function LoggedInPageLayout({ children }) {
  const { Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Sider collapsed={collapsed} />
      <Layout className={styles["site-layout"]}>
        <Header collapsed={collapsed} toggle={toggle} />
        <Content>
          {/* <Breadcrumbs /> */}
          <Breadcrumbs />
          {children}
          {/* <Spinner></Spinner> */}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
