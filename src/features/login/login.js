import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import User from "../../models/user/user";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

export default function Login() {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onFinish = async (values) => {
    await dispatch(User.loginCall(values.username, values.password));

    // Logged in.
    const { from } = location.state || { from: {path: `/dashboard`} };
    history.replace(from);

  };

  const onFinishFailed = (errorInfo) => {
    
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
