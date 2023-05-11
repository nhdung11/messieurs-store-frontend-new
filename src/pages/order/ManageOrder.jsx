import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { callFetchOrder } from '../../services/apis';
import moment from 'moment';


const columns = [
    {
        title: 'Id',
        dataIndex: '_id',
        render: (text, record, index) => {
            return (
                <a>
                    {record._id}
                </a>
            )
        }
    },
    {
        title: 'Giá',
        dataIndex: 'totalPrice',
        sorter: true,
        render: (text, record, index) => {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
            return (
                <span>
                    {formatter.format(record.totalPrice)}
                </span>
            )
        },

    },
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        sorter: true,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        sorter: true,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        sorter: true,
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'createdAt',
        sorter: true,
        render: (text, record, index) => {
            return (
                <>
                    {moment(record.updatedAt).format('MM/DD/YYYY HH:mm:ss')}
                </>
            )
        },
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];



const ManageOrder = () => {
    const [currentOrderPage, setCurrentOrderPage] = useState(1)
    const [pageSizeOrder, setPageSizeOrder] = useState(5)
    const [listOrder, setListOrder] = useState([])
    const [total, setTotal] = useState(0)
    const [sortQueryOrder ,setSortQueryOrder] = useState()

    useEffect(() => {
        fetchOrder()
    }, [currentOrderPage, pageSizeOrder, sortQueryOrder])

    const fetchOrder = async () => {
        let query = `current=${currentOrderPage}&pageSize=${pageSizeOrder}`

        if(sortQueryOrder) {
            query += `&${sortQueryOrder}`
        }
        const res = await callFetchOrder(query)
        if (res && res.data) {
            setListOrder(res.data.result)
            setTotal(res.data.meta.total)
            console.log("res data manage order: ", res.data)
        }

    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', sorter);
        if(pagination.current !== currentOrderPage) {
            setCurrentOrderPage(pagination.current)
        }
        if(pagination.pageSize !== pageSizeOrder) {
            setPageSizeOrder(pagination.pageSize)
        }
        if (sorter && sorter.field) {
            const q = sorter.order === "ascend" ? `&sort=${sorter.field}` : sorter.order === "descend" ? `&sort=-${sorter.field}` : 'null'
            setSortQueryOrder(q)
        }
    };
    const renderTitleOrderTable = () => {
        return (
            <span>Danh sách đặt hàng</span>
        )
    }
    return (
        <Table
            columns={columns}
            dataSource={listOrder}
            onChange={onChange}
            title={renderTitleOrderTable}
            pagination={{
                current: currentOrderPage,
                pageSize: pageSizeOrder,
                total: total,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '30']
            }
            }
            rowKey={'_id'}
        />
    )
};

export default ManageOrder;