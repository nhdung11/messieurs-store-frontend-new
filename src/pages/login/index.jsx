import React, { useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, message, notification } from 'antd';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { callLogin } from '../../services/apis';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';

const App = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    const {username, password} = values
    // console.log('Success:', values);
    setIsSubmit(true)
    const res = await callLogin(username, password)
    setIsSubmit(false)
    console.log("res information login: ",res.data)
    if(res?.data) {
      localStorage.setItem("access_token", res.data.access_token)
      dispatch(doLoginAction(res.data))
      message.success("Đăng nhập thành công!")
      navigate('/')
    }else{
      notification.error({
        message: "Có lỗi xảy ra!",
        description: 
          res.message && Array.isArray(res.message) > 0 ? res.message : "Thông tin không chính xác!!!"

      })
    }
  };

  return (
    <div className='login-page'>
      <div className='container'>
        <section className='wrapper'>
          <div className='heading'>
            <h2>Đăng nhập</h2>
            <Divider />
          </div>
          <Form
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              labelCol={{ span: 24 }}
              label="Email"
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
              <Button type="primary" htmlType="submit" loading= {isSubmit}>
                Đăng nhập
              </Button>
            </Form.Item>
            <Divider>Or</Divider>
            <p>
              Chưa có tài khoản?
              <span>
                <Link to='/register'> Đăng ký</Link>
              </span>
            </p>
          </Form>
        </section>
      </div>
    </div>

  );
}

export default App;