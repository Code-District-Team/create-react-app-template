import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";

export default function GuestPageLayout({ children }) {
  const { Content } = Layout;
  return (
    <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
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
  );
}
