import React, { useEffect, useState } from 'react';
import { Button, Divider, Modal, Popconfirm, Popover, Table, message, notification } from 'antd';
import InputSearch from './inputSearch';
import { callDeleteUser, callFetchBooks, callFetchUser } from '../../../services/apis';
import UserViewDetail from './userViewDetail';
import { ExportOutlined, ImportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import UserModalCreate from './userModalCreate';
import UserImport from './userImport';
import { useSelector } from 'react-redux';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import UserModalUpdate from './userModalUpdate';
import moment from 'moment';
import './userTable.scss';

const UserTable = () => {
    const [listUser, setListUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [filters, setFilters] = useState("")
    const [sortQuery, setSortQuery] = useState("")
    const [openViewDetail, setOpenViewDetail] = useState(false)
    const [dataViewDetail, setDataViewDetail] = useState({})
    const user = useSelector(state => state.account.user)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openUserImport, setOpenUserImport] = useState(false)
    const [isModalUpdated, setIsModalUpdated] = useState(false)
    const [dataUpdated, setDataUpdated] = useState({})

    // Variables of deleter user

    const [confirmLoading, setConfirmLoading] = useState(false);

    const columns = [
        {
            title: 'Id - Họ và tên',
            dataIndex: '_id',
            ellipsis: true,
            width:'50vw',
            render: (text, record, index) => {

                return (
                    <>
                        <a onClick={() => {
                            setOpenViewDetail(true)
                            setDataViewDetail(record)
                        }}
                        >
                            ID: {record._id}
                        </a>
                        <br/>
                        <span>
                            Tên: {record.fullName}
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
                        setOpenViewDetail(true)
                        setDataViewDetail(record)
                    }}
                    >
                        {record._id}
                    </a>
                )

            },
            responsive: ['sm','md', 'lg']

        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            sorter: true,
            responsive: ["sm", 'md', 'lg']
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            responsive: ["md", "lg"]
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: true,
            responsive: ["md","lg"]
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (text, record, index) => {
                
                return (
                    <span>
                        {moment(record.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
                    </span>
                )  
            },
            responsive: ["lg"],
        },
        {
            title: 'Action',
            width: 80,
            render: (text, record, index) => {
                return (<>
                    <Popconfirm
                        placement='bottomRight'
                        title="Xác nhận xóa user"
                        description="Bạn có chắc chắn muốn xóa user này?"
                        onConfirm={() => handleDeleterUser(record._id)}
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
                        style={{ border: 'none', background: 'inherit', color: ' #ff9933', fontSize: '16px', marginLeft: '16px' }}
                        onClick={() => {
                            setIsModalUpdated(true)
                            setDataUpdated(record)
                            console.log("Edit dataUpdate - record: ", dataUpdated)
                        }}
                    >
                        <AiOutlineEdit />

                    </a>
                </>)
            },
            responsive: ['xs','sm', 'md']
        }
    ];


    const handleDeleterUser = async (id) => {
        setConfirmLoading(true)
        const res = await callDeleteUser(id)
        if (res && res.data) {
            message.success("Xoá user thành công!")
            fetchUser()
        } else {
            notification.error({
                message: "Có lỗi xảy ra!",
                description: res.message
            })
        }
        setConfirmLoading(false)
    }



    const fetchUser = async () => {
        setIsLoading(true)
        let query = `current=${currentPage}&pageSize=${pageSize}`
        if (filters) {
            query += `${filters}`
        }

        if (sortQuery) {
            query += `${sortQuery}`
        }

        const res = await callFetchUser(query)
        console.log("Query table: ...", query)
        console.log("Res fetch user: ", res.data)
        if (res && res.data) {
            setListUser(res.data.result);
            console.log("List User: ", listUser)
            setTotal(res.data.meta.total);

        }
        setIsLoading(false)
    }

    const handleSearch = (query) => {
        setFilters(query)
        // console.log("Query handleSearch:", query)
    }



    const onChange = (pagination, filters, sorter, extra) => {
        // console.log("pagination infor:", pagination)
        // console.log("filter infor:", filters)
        console.log("sorter infor:", sorter)
        // console.log("extra infor:", extra)
        if (pagination && pagination.current !== currentPage) {
            setCurrentPage(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
        }
        if (sorter && sorter.field) {
            // const q = sorter.order === 'ascend' ? `&sort=${sorter.field}` : `&sort=-${sorter.field}`
            const q = sorter.order === "ascend" ? `&sort=${sorter.field}` : sorter.order === "descend" ? `&sort=-${sorter.field}` : 'null'
            setSortQuery(q)
        }

    };

    // Const variables for the MODAL CREATE


    const showModal = () => {
        setIsModalOpen(true);
    };
    // End MODAL variables

    // User Import Variables


    // Function Export
    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    };
    useEffect(() => {
        fetchUser()
    }, [currentPage, pageSize, filters, sortQuery])
    const renderTitleTable = () => {

        return (
            <div className='table-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table list users</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        className='table-btn__export'
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={() => downloadExcel(listUser)}
                    >Export</Button>
                    <Button
                        className='table-btn__import'
                        icon={<ImportOutlined />}
                        type="primary"
                        onClick={() => setOpenUserImport(true)}
                    >Import</Button>
                    <Button
                        className='table-btn__add'
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={showModal}
                    >Thêm mới</Button>
                    <Button
                        type='ghost'
                        onClick={() => {
                            fetchUser()
                        }}
                    >
                        <ReloadOutlined />
                    </Button>

                </span>

            </div>
        )
    }




    return (
        <>
            <InputSearch handleSearch={handleSearch} setFilters={setFilters} setSortQuery={setSortQuery} setCurrentPage={setCurrentPage} fetchUser={fetchUser} />
            <Table
                columns={columns}
                dataSource={listUser}
                onChange={onChange}
                rowKey={'_id'}
                title={renderTitleTable}
                loading={isLoading}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    pageSizeOptions: ['5', '10', '15'],
                }}
            />
            <UserViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
            />
            <UserModalCreate
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchUser={fetchUser}
            />
            <UserImport
                openUserImport={openUserImport}
                setOpenUserImport={setOpenUserImport}
                fetchUser={fetchUser}
            />
            <UserModalUpdate
                isModalUpdated={isModalUpdated}
                setIsModalUpdated={setIsModalUpdated}
                dataUpdated={dataUpdated}
                fetchUser={fetchUser}

            />

        </>
    )
};

export default UserTable;