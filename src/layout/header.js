import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from 'react-router-dom';
import routes from '../routes/routes';
import styles from './layout.module.scss';

export default function Header() {
  console.log(styles);
  const { Header } = Layout;
  const location = useLocation();
  return (
    <Header className={styles['site-layout-background']} style={{ padding: 0 }} >
    </Header>
  );
}
