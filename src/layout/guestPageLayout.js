import { Layout } from "antd";
import React from "react";

export default function GuestPageLayout({ children }) {
  const { Content } = Layout;
  return (
    <React.Fragment>
      <Layout className="guest-layout">
        <Content>
          {children}
          {/* <Spinner></Spinner> */}
        </Content>
      </Layout>
    </React.Fragment>
  );
}
