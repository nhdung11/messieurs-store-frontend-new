import { Drawer } from 'antd';
import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { callFetchCategory } from "../../services/apis";



const FilterMobile = (props) => {
    const { openFilterMobile, setOpenFilterMobile, filtersBooks, setFiltersBooks, sortQueryBooks, setSortQueryBooks } = props
    const [form] = Form.useForm()
    const [listCategories, setListCategories] = useState([])
    // const [filtersBooks, setFiltersBooks] = useState('')
    // const [sortQueryBooks, setSortQueryBooks] = useState('sort=-sold')

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
        // console.log("values: ", filtersBooks)

    }

    
    const onClose = () => {
        setOpenFilterMobile(false);
    };



    return (
        <>
            <Drawer
                title="Lọc sản phẩm"
                placement="right"
                onClose={onClose}
                open={openFilterMobile}
                width='100%'
            >
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
                        <div style={{ display: 'flex', justifyContent: "space-around" }}>

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
            </Drawer>
        </>
    );
};

export default FilterMobile;