import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import qs from "qs";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import User from "../../redux/models/user/user";
import { deleteQueryParam, redirectToUrl, setFieldErrorsFromServer } from "../../utilities/generalUtility";
var md5 = require("md5");

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [form] = Form.useForm();
  const paramJson = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    console.log("paramJson: ", paramJson);
    if (paramJson.err) {
      message.error(paramJson.err);
      deleteQueryParam("err");
    }
  }, []);

  const onFinish = async (values) => {
    let encryptedPass = md5(values.password);
    try {
      let user = await dispatch(User.loginCall(values.email, encryptedPass, values.remember));
      // const { from } = location.state || { from: { path: "/" } };
      redirectToUrl(user.tenant.domainPrefix, "/");
    } catch (error) {
      setFieldErrorsFromServer(error, form, values);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <React.Fragment>
      <div className="login-container">
        <div className="lc-logo">
          <img src="images/logo.png" alt="" />
        </div>
        <Card bordered={false} className="login-card">
          <h4>Login to your account</h4>
          <Form
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                type="email"
                prefix={<UserOutlined className="site-form-item-icon text-primary" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon text-primary" />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/forgot-password" className="float-right" href="">
                Forgot password
              </Link>
            </Form.Item>
            <Form.Item className="mb-0">
              <Button block size="large" type="primary" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </React.Fragment>
  );
}