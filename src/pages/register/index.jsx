import React, { useState } from 'react';
import { Button, Checkbox, Descriptions, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/apis';

import './register.scss'



const Register = () => {
    const navigate = useNavigate()
    const [isSubmit, setIsSubmit] = useState(false)

    const onFinish = async (values) => {
        const {fullName, email, password, phone} = values
        // console.log('Success:', values);
        setIsSubmit(true)
        const res = await callRegister(fullName, email, password, phone)
        setIsSubmit(false)
        if(res?.data?._id) {
            console.log("Register infor: ", res.data)
            message.success("Đăng ký tài khoản thành công!")
            navigate('/login')
        } else{
            notification.error({
                message: "Có lỗi xảy ra!",
                description: 
                    res.message && Array.isArray(res.message) > 0 ? res.message : "Email đã tồn tại",
                duration: 3
            })
        }
    };

    return (
        <div className='register-page'>
            {/* <main> */}
            <div className='container'>
                <section className='wrapper'>
                    <div className='heading'>
                        <h2>Đăng ký tài khoản</h2>
                        <Divider />
                    </div>
                    <Form
                        name="registor"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Họ tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!'
                                }
                            ]}
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

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={isSubmit}>
                                Đăng ký
                            </Button>
                        </Form.Item>
                        <Divider>Or</Divider>
                        <p style={{ marginTop: '2rem' }}>Bạn đã có tài khoản?
                            <Link to='/login'> Đăng nhập</Link>
                        </p>
                    </Form>
                </section>
            </div>
            {/* </main> */}
        </div>
    )

};

export default Register;