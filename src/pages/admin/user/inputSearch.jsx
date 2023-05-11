import React from 'react';
import { Button, Col, Form, Input, Row, Space, theme } from 'antd';






const InputSearch = (props) => {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        let query = ''
        if (values.fullName) {
            query += `&fullName=/${values.fullName}/i`
        }
        if (values.email) {
            query += `&email=/${values.email}/i`
        }
        if (values.phone) {
            query += `&phone=/${values.phone}/i`
        }

        if(query) {
            props.handleSearch(query)
            props.setCurrentPage(1)
            console.log(' search query', query)
        }

    };

    return (
        <Form
            name="admin-search"
            onFinish={onFinish}
            autoComplete="off"
            style={{ padding: '1rem 1rem 2rem 1rem' }}
            form={form}
        >

            <Row gutter={24}>
                <Col xs={24} lg={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Họ và tên"
                        name="fullName"

                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"

                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={8}>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Số điện thoại"
                        name="phone"

                    >
                        <Input />
                    </Form.Item></Col>
            </Row>

            <div style={{ textAlign: 'right' }}>
                <Space size="large">
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button onClick={() => {
                        props.setFilters("");
                        props.setSortQuery("");
                        form.resetFields();
                    }}>
                        Clear
                    </Button>

                </Space>
            </div>
        </Form>


    );
}
export default InputSearch;