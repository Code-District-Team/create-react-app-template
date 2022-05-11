import { Button, Result } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const SomethingWentWrong = () => {
  const history = useHistory();

  return (
    <Result
      status="500"
      title=""
      subTitle="Sorry, something went wrong."
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default SomethingWentWrong;
