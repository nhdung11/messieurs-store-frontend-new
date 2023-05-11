import React, { useEffect, useState } from 'react';

import { Button, Divider, Form, Input, Modal, message, notification } from 'antd';
import { callDeleteUser, callLogout, callUpdateUser } from '../../../services/apis';
import { useSelector } from 'react-redux';

const UserModalUpdate = (props) => {

    const [form] = Form.useForm()
    const { isModalUpdated, setIsModalUpdated, dataUpdated, fetchUser} = props
    const [isSubmit, setIsSubmit] = useState(false)
    const user = useSelector(state => state.account.user)
    const handleOk = () => {
        form.submit()
        setIsModalUpdated(false);
    };

    const handleCancel = () => {
        setIsModalUpdated(false);
        console.log("urlAvatar: ", avatar)
    };
    const avatar = user.avatar;

    const onFinish = async (values) => {
        setIsSubmit(true)
        const { _id, fullName, phone } = values;
        const res = await callUpdateUser(_id, fullName, phone, avatar)
        console.log("res update người dùng mới: ", res.data)
        if (res && res?.data) {
            message.success("Cập nhật thành công!")
            form.resetFields()
            setIsModalUpdated(false)
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
    // console.log("isSubmit: ", isSubmit)

    useEffect(() => {
        form.setFieldsValue(dataUpdated)
    }, [dataUpdated])

    return (
        <>
            <Modal
                title="Cập nhật người dùng"
                open={isModalUpdated}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Cập nhật"
                cancelText="Hủy"
                confirmLoading={isSubmit}
                forceRender 
            >
                <Divider />
                <Form

                    name="basic"
                    onFinish={onFinish}
                    form={form}
                    // autoComplete='off'
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
                        hidden
                        label="Id"
                        name="_id"
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
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
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

export default UserModalUpdate;