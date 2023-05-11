import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

const initialState = {
    carts: [],
}

export const orderSlider = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddActionBook: (state, action) => {
            let carts = state.carts
            const item = action.payload
            let isExistIndex = carts.findIndex(c => c._id === item._id)
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity
            }
            else {
                carts.push({ quantity: item.quantity, detail: item.detail , _id: item._id })
            }
            state.carts = carts
            message.success("Sản phẩm đã được thêm vào giỏ hàng!")

        },

        doUpdateCartAction: (state, action) => {
            // quantity, _id, book {....}
            
            let carts = state.carts
            const item = action.payload
            let isExistIndex = carts.findIndex(c => c._id === item._id)
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = item.quantity;
                if(carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity){
                    carts[isExistIndex].quantity = carts[isExistIndex.detail.quantity];
                }
            }else {
                carts.push({ quantity: item.quantity, detail: item.detail, _id: item._id })
            }
            state.carts = carts;
        },
         
        doDeleteAction: (state, action) => {
            state.carts = state.carts.filter(item => item._id !== action.payload._id);
        },

        doOrderAction: (state, action) => {
            state.carts = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { doAddActionBook, doUpdateCartAction, doDeleteAction, doOrderAction } = orderSlider.actions

export default orderSlider.reducer