import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useSelector } from 'react-redux';



const UpdatePassword = () => {
    const user = useSelector(state => state.account.user)
    const [form] = Form.useForm()
    const onFinish = (values) => {
        console.log('Success:', values);
        notification.warning({
            message: 'Thông báo',
            description: "Chức năng này đang được cập nhật!"
        })
    };
    useEffect(() => {
        form.setFieldValue('email', user.email)
    }, [user])
    return (
        <div className='update-password'>
            <Form
                onFinish={onFinish}
                form = {form}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 14}}
                    
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 14}}
                    rules={[{ required: true, message: 'Please input old password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="password"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 14}}
                    rules={[{ required: true, message: 'Please input new password!' }]}
                >
                    <Input.Password />
                </Form.Item>



                <Form.Item wrapperCol={{ span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default UpdatePassword;