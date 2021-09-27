import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import User from "../../models/user/user";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { message } from 'antd';
import { redirectToUrl } from '../../utilities/generalUtility'
var md5 = require('md5');

export default function SetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onFinish = async (values) => {
    if(values.password !== values.confirmPassword){
      message.error('Password does not match!')
      return
    }
    let token = location.search.substring(7);
    let encryptedPass = md5(values.password);

    try {
      let user = await dispatch(User.resetPassword(encryptedPass, token, values.remember));
      const { from } = location.state || { from: {path: '/'} };
      redirectToUrl(user.tenant.domainPrefix, from.path)
    } catch(error){

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
          <h4>Set Password</h4>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Password must be atleast 8 characters long!",
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined className="site-form-item-icon text-primary" />
                }
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined className="site-form-item-icon text-primary" />
                }
                placeholder="Confirm Password"
                size="large"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item noStyle>
              <Button block size="large" type="primary" htmlType="submit">
                Done
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </React.Fragment>
  );
}