import React from "react";
import { Layout } from "antd";
import moment from "moment";

export default function Footer() {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: "center" }}>
      Code District &copy;{moment().year()} Created by Ali Ehsan
    </Footer>
  );
}
