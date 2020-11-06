import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import User from "../../models/user/user";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, Link  } from "react-router-dom";
import { redirectToUrl } from '../../utilities/generalUtility'
var md5 = require('md5');
export default function Login() {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onFinish = async (values) => {
    let encryptedPass = md5(values.password);
    try {
      let user = await dispatch(User.loginCall(values.email, encryptedPass, values.remember));
      const { from } = location.state || { from: {path: '/'} };
      redirectToUrl(user.tenant.domainPrefix, from.path)
    } catch(error){

    }

  };

  const onFinishFailed = (errorInfo) => {
    
  };

  return (
    <React.Fragment>
      <div className="login-container">
        <div className="lc-logo">
          <img src="images/logo.png" alt="" />
        </div>
        <Card bordered={false} className="login-card">
          <h4>Login to your account</h4>
          <Form name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical"
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
            <Input prefix={<UserOutlined className="site-form-item-icon text-primary" />} placeholder="Email" size="large" />
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
            <Input.Password prefix={<LockOutlined className="site-form-item-icon text-primary" />} placeholder="Password" size="large" />
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
