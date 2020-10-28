import React from "react";
import { Layout } from "antd";
import Header from "../layout/header";
import Sider from "../layout/sider";
import Breadcrumbs from "../layout/breadcrumbs";
import { usePromiseTracker } from 'react-promise-tracker'
import "antd/dist/antd.css";
import Spinner from '../common/components/spinner/spinner'
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
            <Spinner>
            {children}
            </Spinner>
          </Content>
          <Footer />
        </Layout>
      </Layout>
  );
}
