
import {Steps } from 'antd';
import './order.scss'
import { useDispatch, useSelector } from 'react-redux';
import { doDeleteAction, doUpdateCartAction } from '../../redux/order/orderSlider';
import { useEffect, useState } from 'react';
import ViewOrder from '../../components/Order/ViewOrder';
import Payment from '../../components/Order/Payment'
import OrderSuccess from '../../components/Order/OrderSuccess';
const Order = () => {

    const carts = useSelector(state => state.order.carts)
    const [total, setTotal] = useState(0)
    const [currentStep, setCurrentStep] = useState(1)

    useEffect(() => {
        if (carts && carts.length > 0) {
            let sum = 0;
            carts.map(item => {
                sum += item.detail.price * item.quantity
            })
            setTotal(sum)
        } else {
            setTotal(0)
        }
    }, [carts])

    return (
        <div className="order-container">
            <div className='order-step'>
                <Steps
                    className='process-step'
                    size="small"
                    responsive={false}
                    current={currentStep}
                    status='wait'
                    items={[
                        {
                            title: 'Đơn hàng',
                        },
                        {
                            title: 'Đặt hàng',
                        },
                        {
                            title: 'Thanh toán',
                        },
                    ]}
                />
            </div>
            {currentStep === 1 && <ViewOrder total = {total} setCurrentStep = {setCurrentStep} carts={carts}/>}
            {currentStep === 2 && <Payment total = {total} setCurrentStep = {setCurrentStep} carts = {carts} />}
            {currentStep === 3 && <OrderSuccess />}
        </div>
    )
}


export default Order;