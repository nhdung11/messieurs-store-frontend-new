

import { Button, Divider, Empty, Form, Input, InputNumber, Radio, Spin, message, notification } from 'antd';
// import '../../pages/order/order.scss'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { doDeleteAction, doOrderAction, doUpdateCartAction } from '../../redux/order/orderSlider';
import './payment.scss'
import { callCreateOrder } from '../../services/apis';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Payment = (props) => {
    const [form] = Form.useForm()
    const { total, setCurrentStep, carts } = props
    const [isSubmit, setIsSubmit] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.account.user)
    const handleChangeInput = (value, book) => {
        if (!value || value < 1) return;
        if (!isNaN(value)) {
            dispatch(doUpdateCartAction({ quantity: value, detail: book, _id: book._id }))
        }

    }

    const handleDeleteOrder = (id) => {
        dispatch(doDeleteAction({ _id: id }))
    }
    const onFinish = async (value) => {
        setIsSubmit(true)
        const detailData = carts.map(book => {

            return {
                bookName: book.detail.mainText,
                quantity: book.quantity,
                _id: book._id
            }
        })

        const data = {
            name: value.name,
            address: value.address,
            phone: value.phone,
            totalPrice: total,
            detail: detailData
        }
        console.log("data for API order: ", data)
        const res = await callCreateOrder(data)
        if (res && res.data) {
            message.success("Đặt hàng thành công!")
            dispatch(doOrderAction())
            setCurrentStep(3)
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false)
    }
    // setCurrentStep(3)

    return (

        <div className="order">
            <div className="order-list">
                {carts.map((book, index) => {

                    return (
                        <div className='order-item' key={`item-${book._id}`}>
                            <img
                                className='order-item--image'
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`}
                            />
                            <div className='order-item--content'>
                                <div className='order-item--text'>
                                    <span>{book?.detail?.mainText}</span>
                                </div>
                                <span className='order-item-price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price)}
                                </span>
                                <div>
                                    <InputNumber value={book.quantity} onChange={(value) => {
                                        handleChangeInput(value, book)
                                    }} />
                                </div>

                                <div className='order-item-total'>
                                    <span>{`Tổng: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.quantity * book?.detail?.price)}`}</span>
                                </div>
                                <div className='order-item--delete'
                                    onClick={() => handleDeleteOrder(book._id)}
                                >
                                    <AiOutlineDelete />
                                </div>
                            </div>
                        </div>
                    )
                })}
                {carts.length === 0 &&
                    <div className='order-item--empty'>
                        <Empty description="Không có sản phẩm trong giỏ hàng" />
                    </div>
                }
            </div>
            <div className="order-payment">
                <Form
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="Tên người nhận"
                        name="name"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                    >
                        <Input size='small' />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input size='small' />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input.TextArea rows={4} size='small' />
                    </Form.Item>
                </Form>
                <div className='info'>
                    <div className='method'>
                        <div>Hình thức thanh toán</div>
                        <Radio checked={true} className='method-radio'>
                            Thanh toán khi nhận hàng
                        </Radio>
                    </div>
                </div>

                <Divider />

                <div className="caculater">
                    <span>Tổng tiền</span>
                    <span className="price-text">
                        {`${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}`}
                    </span>
                </div>

                <Divider />
                <div>
                    <button
                        className="btn"
                        onClick={() => form.submit()}
                        disabled={isSubmit}
                    >
                        {isSubmit && <span><LoadingOutlined /> &nbsp;</span>}
                        Đặt Hàng ({carts?.length ?? 0})
                    </button>
                </div>

            </div>




        </div>

    )
}

export default Payment;




