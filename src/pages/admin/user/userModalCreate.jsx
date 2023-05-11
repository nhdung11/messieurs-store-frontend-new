import React, { useState } from 'react';

import { Button, Divider, Form, Input, Modal, message, notification } from 'antd';
import { callRegister } from '../../../services/apis';

const UserModalCreate = (props) => {

    const [form] = Form.useForm()
    const { isModalOpen, setIsModalOpen, fetchUser } = props
    const [isSubmit, setIsSubmit] = useState(false)
    const handleOk = () => {
        form.submit()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        const { email, fullName, password, phone } = values
        console.log("value: ", values)
        setIsSubmit(true)
        const res = await callRegister(fullName, email, password, phone)
        console.log("res thêm người dùng mới: ", res.data)
        if (res && res?.data) {
            message.success("Thêm người dùng mới thành công!")
            form.resetFields()
            setIsModalOpen(false)
            fetchUser()
        } else {
            notification.error({
                message: "Có lỗi xảy ra!",
                description:
                    res.message && Array.isArray(res.message) > 0 ? res.message : "Email đã tồn tại",
                duration: 3
            })
        }

        setIsSubmit(false)
    };

    return (
        <>
            <Modal
                title="Thêm người dùng mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Tạo mới"
                cancelText="Hủy"
                confirmLoading={isSubmit}
            >
                <Divider />
                <Form

                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="Tên hiển thị"
                        name="fullName"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserModalCreate;