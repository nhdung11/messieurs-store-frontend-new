import React from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';



const BookSearch = (props) => {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        console.log("Success: ", values)
        let query = ''
        if(values.mainText) {
            // `&fullName=/${values.fullName}/i`
            query += `&mainText=/${values.mainText}/i`
        }
        if(values.author) {
            query += `&author=/${values.author}/i`
        }
        if(values.category) {
            query += `&category=/${values.category}/i`
        }
        if(query) {
            props.handleSearchBooks(query)
            props.setCurrentPageBooks(1)
            console.log("query search books: ", query)
        }
    };


    return (
        <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            style={{ padding: '1rem 1rem 2rem 1rem' }}
            form={form}
        >
            <Row gutter={24}>
                <Col xs={24} lg={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tên sách"
                        name="mainText"
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} lg={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tác giả"
                        name="author"
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={24} lg={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Thể loại"
                        name="category"
                    >
                        <Input />
                    </Form.Item>
                </Col>


            </Row>
            <div style={{ textAlign: 'right' }}>
                <Space size='large'>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                    onClick={() => {
                        props.setFiltersBooks("")
                        props.setSortQueryBooks("")
                        form.resetFields()
                    }}>
                        Clear
                    </Button>
                </Space>
            </div>

        </Form>
    )
}

export default BookSearch;