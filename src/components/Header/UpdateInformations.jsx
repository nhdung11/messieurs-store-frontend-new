import { Avatar, Button, Form, Input, Upload, message, notification } from 'antd';
import './updateInformation.scss'
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callUploadAvatar } from '../../services/apis'

const UpdateInformations = () => {
    const [form] = Form.useForm()
    const user = useSelector(state => state.account.user)
    const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "")
    const onFinish = (values) => {
        console.log('Success onfinish:', values);
        notification.warning({
            message: 'Thông báo',
            description: "Chức năng này đang được cập nhật!"
        })
    };
    console.log("user: ", user)

    useEffect(() => {
        form.setFieldsValue(user)
    }, [user])
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`

    const handleOnchangeAvatar =(info) => {
        if(info?.file?.status === 'uploading'){
        }
        if(info?.file?.status === 'done'){
            message.success("Upload file thành công!")
        }
        if(info?.file?.status === 'error') {
            message.error("Upload file thất bại")
        } 
    }

    const handleUploadAvata = async ({file, onSuccess, onError}) => {
        const res = await callUploadAvatar(file)
        if(res && res.data) {
            const newAvatar = res.data.fileUploaded
            setUserAvatar(newAvatar)
            onSuccess('ok')
        }else{
            onError("Đã có lỗi khi update file")
        }
    }
    return (
        <div className="information">

            <div className="infor-image">
                <Avatar className='avatar' size={window.innerWidth >=768 ? 160 : 120} src = {urlAvatar} />
                <Upload 
                    // maxCount={1}
                    // multiple= {false}
                    showUploadList= {false}
                    // onChange={(info) => handleOnchangeAvatar(info)}
                    // customRequest={handleUploadAvata}
                >
                    <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>
            </div>
            <div className="infor-content">
                <div>
                    <Form
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            label="Email"
                            labelCol={{ span: 24 }}
                            name="email"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            label="Tên hiển thị"
                            labelCol={{ span: 24 }}
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            labelCol={{ span: 24 }}
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                    <div>
                        <button
                            className='btn-update'
                            onClick={() => { form.submit() }}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateInformations;