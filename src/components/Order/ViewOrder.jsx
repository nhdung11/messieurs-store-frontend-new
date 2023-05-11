
import { Divider, Empty, InputNumber, Steps } from 'antd';
// import '../../pages/order/order.scss'
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { doDeleteAction, doUpdateCartAction } from '../../redux/order/orderSlider';


const ViewOrder = (props) => {
    const {total, setCurrentStep, carts} = props
    const dispatch = useDispatch()

    const handleChangeInput = (value, book) => {
        if (!value || value < 1) return;
        if (!isNaN(value)) {
            dispatch(doUpdateCartAction({ quantity: value, detail: book, _id: book._id }))
        }

    }

    const handleDeleteOrder = (id) => {
        dispatch(doDeleteAction({ _id: id }))
    }
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
                                {/* <div className='order-item--quantity'>
                                        <button><AiOutlineMinus /></button>
                                        <input onChange={(e) => {
                                            setCurrentQuantity(e.target.value)
                                            handleChangeInput(e.target.value, book)
                                        }} value={book.quantity} />
                                        <button  ><AiOutlinePlus /></button>
                                    </div> */}
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
            <div className="order-payment order-payment--view">

                <div className='payment-title'>
                    <span>Tạm tính</span>
                </div>
                <Divider />
                <div className='payment-total'>
                    <span>Tổng tiền</span>
                    <span className=''>
                        {`${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}`}
                    </span>
                </div>
                <Divider />

                <button className='payment-btn'
                    onClick={() => { carts.length > 0 && setCurrentStep(2)}}
                >
                    Mua Hàng ({carts?.length ?? 0})
                </button>

            </div>
            {/* {currentStep === 1 && <ViewOrder total={total} carts={carts} setCurrentStep = {setCurrentStep}/>}
                {currentStep === 2 && <Payment total={total} setCurrentStep= {setCurrentStep}/>} */}
        </div>

    )
}

export default ViewOrder;