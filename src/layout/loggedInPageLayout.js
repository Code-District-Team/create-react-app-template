import React from "react";
import { Layout } from "antd";
import Header from "../layout/header";
import Sider from "../layout/sider";
import Breadcrumbs from "../layout/breadcrumbs";
import "antd/dist/antd.css";

export default function LoggedInPageLayout({ children }) {
  const { Content } = Layout;
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumbs />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
