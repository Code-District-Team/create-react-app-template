import React from "react";
import { Layout } from "antd";
import Spinner from '../common/components/spinner/spinner'

export default function GuestPageLayout({ children }) {
  const { Content } = Layout;
  return (
    <React.Fragment>
        <Layout className="guest-layout">
          <Content>
            {children}
            <Spinner></Spinner>
          </Content>
      </Layout>
    </React.Fragment>
  );
}
