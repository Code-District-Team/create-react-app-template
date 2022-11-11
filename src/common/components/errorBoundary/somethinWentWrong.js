import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SomethingWentWrong = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title=""
      subTitle="Sorry, something went wrong."
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate.goBack();
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default SomethingWentWrong;
