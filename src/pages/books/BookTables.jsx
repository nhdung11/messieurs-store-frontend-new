import React, { useEffect, useState } from 'react';
import { Button, Modal, Popconfirm, Table, message, notification } from 'antd';
import { ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { callDeleteBook, callFetchBooks } from '../../services/apis';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import moment from 'moment';
import BookSearch from './BookSearch';
import BookViewDetail from './BookViewDetail';
import BookModalCreate from './BookModalCreate';
import BookModalUpdate from './BookModalUpdate';






const BookTables = () => {
    const [listBooks, setListBooks] = useState([])
    const [isLoadingBooks, setIsLoadingBooks] = useState(false)
    const [currentPageBooks, setCurrentPageBooks] = useState(1)
    const [pageSizeBooks, setPageSizeBooks] = useState(5)
    const [total, setTotal] = useState(0)
    const [filtersBooks, setFiltersBooks] = useState('')
    const [sortQueryBooks, setSortQueryBooks] = useState()
    const [isOpenBookDetail, setIsOpenBookDetail] = useState(false)
    const [dataBookDetail, setDataBookDetail] = useState({})
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false)

    useEffect(() => {
        fetchBooks()
    }, [currentPageBooks, pageSizeBooks, filtersBooks, sortQueryBooks])

    const fetchBooks = async () => {
        setIsLoadingBooks(true)

        let query = `current=${currentPageBooks}&pageSize=${pageSizeBooks}`

        if (filtersBooks) {
            query += `&${filtersBooks}`
            // console.log("query: ", query)
        }

        if (sortQueryBooks) {
            query += `&${sortQueryBooks}`
        }
        const res = await callFetchBooks(query)
        console.log("Res data books: ", res)
        console.log("Query: ", query)
        if (res && res.data) {
            setListBooks(res.data.result);
            setTotal(res.data.meta.total)
        }


        setIsLoadingBooks(false)
    }



    const columns = [
        {
            title: 'Id - Tên sách',
            dataIndex: '_id',
            ellipsis: true,
            render: (text, record, index) => {

                return (
                    <>
                        <a onClick={() => {
                            setIsOpenBookDetail(true)
                            setDataBookDetail(record)
                            console.log("record: ", record)
                        }}>
                            {record._id}
                        </a>
                        <br />
                        <span>
                            Tên: {record.mainText}
                        </span>
                    </>

                )
            },
            responsive: ['xs']
        },
        {
            title: 'Id',
            dataIndex: '_id',
            ellipsis: true,
            render: (text, record, index) => {

                return (
                    <a onClick={() => {
                        setIsOpenBookDetail(true)
                        setDataBookDetail(record)
                        console.log("record: ", record)
                    }}>
                        {record._id}
                    </a>
                )
            },
            responsive: ['sm', 'md', 'lg']
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            sorter: true,
            responsive: ['sm', 'md', 'lg']
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: true,
            responsive: ['md', 'lg']
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: true,
            responsive: ['sm', 'md', 'lg']
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            sorter: true,
            render: (text, record, index) => {
                const formatter = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });
                return (
                    <span>
                        {formatter.format(record.price)}
                    </span>
                )
            },
            responsive: ['md', 'lg']
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>
                        {moment(record.updatedAt).format('MM/DD/YYYY HH:mm:ss')}
                    </>
                )
            },
            responsive: ['md', 'lg']
        },
        {
            title: 'Action',
            width: 90,
            render: (text, record, index) => {

                return (<>
                    <Popconfirm
                        placement='bottomRight'
                        title="Xác nhận xóa book"
                        description="Bạn có chắc chắn muốn xóa book này?"
                        onConfirm={() => handleDeleteBook(record._id)}
                        okButtonProps={{ loading: confirmLoading }}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <span
                            style={{ color: 'red', fontSize: '16px', cursor: 'pointer' }}
                        >
                            <AiOutlineDelete />
                        </span>
                    </Popconfirm>

                    <a
                        onClick={() => {
                            setOpenModalUpdate(true)
                            setDataBookDetail(record)

                        }}
                        style={{ border: 'none', background: 'inherit', color: ' #ff9933', fontSize: '16px', marginLeft: '16px' }}
                    >
                        <AiOutlineEdit />

                    </a>
                </>)
            },
            responsive: ['xs', 'sm', 'md', 'lg']
        },
    ];
    const handleSearchBooks = (query) => {
        setFiltersBooks(query)
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params-pagination', pagination);
        
        if (pagination.current !== currentPageBooks) {
            setCurrentPageBooks(pagination.current)
        }
        if (pagination.pageSize !== pageSizeBooks) {
            setPageSizeBooks(pagination.pageSize)
        }
        if (sorter && sorter.field) {
            const q = sorter.order === "ascend" ? `&sort=${sorter.field}` : sorter.order === "descend" ? `&sort=-${sorter.field}` : 'null'
            setSortQueryBooks(q)
        }
    };

    // Function Export 

    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    };

    const renderTitleBookTable = () => {
        return (
            <div className='table-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table list books</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        className='table-btn__export'
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={() => downloadExcel(listBooks)}
                    >Export</Button>
                    <Button
                        className='table-btn__add'
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => {
                            setOpenModalCreate(true)
                        }}
                    >Thêm mới</Button>
                    <Button
                        type='ghost'
                        onClick={() => {
                            setFiltersBooks("")
                            setSortQueryBooks("")
                            // fetchBooks()
                        }}
                    >
                        <ReloadOutlined />
                    </Button>

                </span>

            </div>
        )
    }

    const handleDeleteBook = async (id) => {
        setConfirmLoading(true)
        const res = await callDeleteBook(id)
        if (res && res.data) {
            message.success("Xóa book thành công!")
            fetchBooks()
        } else {
            notification.error({
                message: "Có lỗi xảy ra!",
                description: res.message
            })
        }
        setConfirmLoading(false)
    }

    return (
        <>
            <BookSearch
                setFiltersBooks={setFiltersBooks}
                setSortQueryBooks={setSortQueryBooks}
                handleSearchBooks={handleSearchBooks}
                setCurrentPageBooks={setCurrentPageBooks}
            />
            <Table
                columns={columns}
                dataSource={listBooks}
                title={renderTitleBookTable}
                onChange={onChange}
                loading={isLoadingBooks}
                rowKey={'_id'}
                pagination={{
                    current: currentPageBooks,
                    pageSize: pageSizeBooks,
                    showSizeChanger: true,
                    total: total,
                    pageSizeOptions: ['5', '10', '20', '30']
                }}
            />
            <BookViewDetail
                isOpenBookDetail={isOpenBookDetail}
                setIsOpenBookDetail={setIsOpenBookDetail}
                dataBookDetail={dataBookDetail}
                setDataBookDetail={setDataBookDetail}
            />
            {/* <BookModalCreate openModalCreate = {openModalCreate} setOpenModalCreate= {setOpenModalCreate}/> */}
            <BookModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchBooks={fetchBooks}
            />
            <BookModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataBookDetail={dataBookDetail}
                fetchBooks={fetchBooks}
            />
        </>
    )
}

export default BookTables;