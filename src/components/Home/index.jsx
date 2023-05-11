// import React from 'react'

import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, Rate, Row } from "antd";
import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import Products from "./products";
import { useEffect, useState } from "react";
import { callFetchCategory } from "../../services/apis";
import { useOutletContext } from "react-router-dom";


const HomePage = () => {
    const [form] = Form.useForm()
    const [searchTerm, setSearchTerm] = useOutletContext()
    const [listCategories, setListCategories] = useState([])
    const [filtersBooks, setFiltersBooks] = useState('')
    const [sortQueryBooks, setSortQueryBooks] = useState('sort=-sold')
    useEffect(() => {
        const initCategory = async () => {
            const res = await callFetchCategory()
            // console.log("Res category homepage: ", res)
            if (res && res?.data) {
                const d = res.data.map(item => {
                    return { label: item, value: item }
                })
                setListCategories(d)

            }
        }

        initCategory()
    }, [])

    const onFinish = (values) => {
        console.log('Success:', values);
        if (values?.range?.from >= 0 && values?.range?.to > 0) {
            let q = `&price>=${values?.range?.from}&price<=${values?.range?.to}`
            if (values?.category?.length) {
                q += `&category=${values.category.join(',')}`
            }
            setSortQueryBooks(q)
            console.log("sort query book: ", sortQueryBooks)
        }
    };

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const handleOnValuesChange = (changeValues, values) => {
        if (changeValues.category) {
            const cate = changeValues.category
            if (cate && cate.length > 0) {
                const category = cate.join(',')
                setFiltersBooks(`category=${category}`)
            } else {
                setFiltersBooks('')
            }
        }
        console.log("values: ", values)

    }


    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>

            <div className="home-container" style={{ maxWidth: 1440, margin: '0 auto', minHeight: "100vh" }}>
                <Row gutter={[20, 20]}>
                    <Col md={4} sm={0} xs={0} >
                        <div style={{ padding: "20px 20px 10px 20px", background: '#fff', borderRadius: 5 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <h4 style={{ padding: '10px 10px 0 10px' }}>
                                    <FilterTwoTone /> Bộ lọc tìm kiếm
                                </h4>
                                <ReloadOutlined onClick={() => {
                                    form.resetFields()
                                    setFiltersBooks('')
                                    setSearchTerm('')
                                }} />
                            </div>
                            <Divider />
                            <Form
                                onFinish={onFinish}
                                form={form}
                                onValuesChange={(changeValues, values) => handleOnValuesChange(changeValues, values)}
                            >
                                <Form.Item
                                    name="category"
                                    label="Danh mục sản phẩm"
                                    labelCol={{ span: 24 }}
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            {listCategories.map(item => {
                                                return (
                                                    <Col span={24} key={item.label} style={{ padding: "7px 0" }}>
                                                        <Checkbox value={item.value}>{item.label}</Checkbox>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Khoảng giá"
                                    labelCol={{ span: 24 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: "space-between" }}>

                                        <Form.Item name={['range', 'from']}>
                                            <InputNumber
                                                name='from'
                                                min={1}
                                                onChange={onChange}
                                                placeholder="đ Từ"
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            />
                                        </Form.Item>
                                        <span style={{ margin: '0 5px' }}>  -  </span>
                                        <Form.Item name={['range', 'to']}>

                                            <InputNumber
                                                name='to'
                                                min={1}
                                                onChange={onChange}
                                                placeholder="đ Đến"
                                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            />
                                        </Form.Item>

                                    </div>

                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        // onClick={() => form.submit()}
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: '100%' }}
                                    >
                                        Áp dụng
                                    </Button>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Đánh giá"
                                    labelCol={{ span: 24 }}
                                >
                                    <div>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="rate-text"></span>
                                    </div>
                                    <div>
                                        <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="rate-text">trở lên</span>
                                    </div>
                                    <div>
                                        <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="rate-text">trở lên</span>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col md={20} xs={24} >
                        <div style={{ padding: "20px 16px", background: '#fff', borderRadius: 5 }}>

                            <Products
                                filtersBooks={filtersBooks}
                                setFiltersBooks={setFiltersBooks}
                                sortQueryBooks={sortQueryBooks}
                                setSortQueryBooks={setSortQueryBooks}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                        </div>
                    </Col>
                </Row>


            </div>
        </div>
    )
}

export default HomePage;
