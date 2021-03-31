import { Spin } from "antd";
import React from "react";

const LoadingSpinner = (props) => (
  <div
    style={{
      display: "flex",
      minHeight: props.size == "small" ? 100 : 500,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spin size={props.size == "small" ? "default" : "large"} />
  </div>
);

export default LoadingSpinner;
