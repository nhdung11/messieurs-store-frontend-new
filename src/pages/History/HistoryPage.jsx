import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import './history.scss'
import { callOrderHistory } from '../../services/apis';
import moment from 'moment';
import ReactJson from 'react-json-view';

const columns = [
    {
        title: 'STT',
        dataIndex: 'number',
        key: 'number',
        width: '48px',
        responsive: ['sm','md', 'lg']
    },
    {
        title: 'Thời gian',
        dataIndex: 'createdAt',
        key: 'createAt',
        responsive: ['xs','sm','md', 'lg']
    },
    {
        title: 'Tổng số tiền',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        responsive: ['sm','md', 'lg']
    },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        responsive: ['sm','md', 'lg']
    },
    {
        title: 'Chi tiết',
        dataIndex: 'detail',
        key: 'detail',
        responsive: ['xs','sm','md', 'lg', 'xl']
    },
];



const HistoryPage = () => {
    const [listOrder, setListOrder] = useState([])
    useEffect(() => {
        fetchHistoryOrder()
    }, [])

    const dataOrder = listOrder.map((order, index) => {
        return {
            number: index + 1,
            createdAt: moment(order.createdAt).format("DD/MM/YYYY HH:mm:ss"),
            totalPrice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice),
            status: <Tag color="green">Thành công</Tag>,
            detail: <ReactJson
                src={order.detail}
                name="Chi tiết đơn mua"
                displayDataTypes={false}
                displayObjectSize={false }
            />
        }
    })
    console.log("dataOrder : ", dataOrder)

    const fetchHistoryOrder = async () => {
        const res = await callOrderHistory()
        if (res && res.data) {
            setListOrder(res.data)
        }
    }
    // console.log("listOrder: ", listOrder)


    const renderTitleHistory = () => {

        return (
            <h3>
                Lịch sử đặt hàng
            </h3>
        )
    }

    return (
        <div className='history-page'>
            <div className='history-table'>

                <Table
                    columns={columns}
                    dataSource={dataOrder}
                    title={renderTitleHistory}
                    rowKey={'_id'}
                />
            </div>

        </div>
    )
};

export default HistoryPage;