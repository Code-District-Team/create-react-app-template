import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../layout/header";
import Sider from "../layout/sider";
import Breadcrumbs from "../layout/breadcrumbs";
import { usePromiseTracker } from "react-promise-tracker";
import Spinner from "../common/components/spinner/spinner";
import Footer from "./footer";
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
          {children}
          <Spinner></Spinner>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
