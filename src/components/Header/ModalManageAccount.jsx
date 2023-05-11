import React, { useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import UpdatePassword from './UpdatePassword';
import UpdateInformations from './UpdateInformations';

const ModalManageAccount = (props) => {

    const { openManageAccount, setOpenManageAccount } = props;

    const handleOk = () => {
        setOpenManageAccount(false);
    };

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: 'info',
            label: `Cập nhật thông tin`,
            children: <UpdateInformations />
        },
        {
            key: 'password',
            label: `Đổi mật khẩu`,
            children: <UpdatePassword />,
        },
    ];

    return (
        <>
            <Modal
                title="Quản lý tài khoản"
                width={window.innerWidth >= 768 ? "55vw" : "90vw"}
                open={openManageAccount}
                onOk={handleOk}
                onCancel={() => setOpenManageAccount(false)}
                footer = {null}
            >
                <Tabs defaultActiveKey="info" items={items} onChange={onChange} />
            </Modal>
        </>
    );
};

export default ModalManageAccount;