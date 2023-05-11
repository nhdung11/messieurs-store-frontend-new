import React, { useState } from 'react';
import { Button, Modal, Table, message, notification } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { callBulkCreateUser } from '../../../services/apis';


const UserImport = (props) => {
    const [dataExcel, setDataExcel] = useState([])
    const { openUserImport, setOpenUserImport, fetchUser } = props

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const propsImport = {
        name: 'file',
        multiple: true,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        customRequest: dummyRequest,
        onChange(info) {
            console.log("Info : ", info)
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                const file = info.fileList[0].originFileObj;
                let reader = new FileReader();
                reader.readAsArrayBuffer(file)
                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    // console.log("E target: ", reader.result)
                    let workbook = XLSX.read(data, { type: 'array' })
                    // console.log("Work book: ", workbook)

                    // find the name of your sheet in the workbook first
                    let sheet = workbook.Sheets[workbook.SheetNames[0]];
                    console.log("sheet: ", sheet)
                    // convert to json format
                    const jsonData = XLSX.utils.sheet_to_json(sheet, {
                        header: ['fullName', 'email', 'phone'],
                        range: 1
                    });

                    if (jsonData && jsonData.length > 1) {
                        setDataExcel(jsonData)
                    }
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const columns = [
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
    ]
    const handleImportData = async () => {
        const data = dataExcel.map(item => {
            item.password = "1234567"
            return item
        })

        const res = await callBulkCreateUser(data)

        if (res.data) {
            notification.success({
                message: "Update thành công",
                description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`
            })
            setDataExcel([]);
            setOpenUserImport(false);
            fetchUser()
        } else {
            notification.error({
                message: "Có lỗi xảy ra!",
                description: res.message
            })
        }
        setOpenUserImport(false);
    }

    return (
        <>

            <Modal
                title="Import data user"
                open={openUserImport}
                width={'50vw'}
                onOk={() => handleImportData()}
                onCancel={() => {
                    setOpenUserImport(false);
                    setDataExcel([])
                }}
                okText="Import data"
                maskClosable={false}
                okButtonProps={{
                    disabled: dataExcel.length < 1
                }}
            >
                <Dragger {...propsImport}
                    showUploadList={dataExcel.length > 0}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                <div style={{ padding: '20px' }}>

                    <Table columns={columns} dataSource={dataExcel} rowKey={'_idt'} title={() => { return <span>Dữ liệu update:</span> }} />
                </div>
            </Modal>
        </>
    );
};

export default UserImport;