import React, { useState } from 'react';
import { Badge, Button, Descriptions, Drawer } from 'antd';
import moment from 'moment/moment';

const UserViewDetail = (props) => {
    const { createdAt, email, fullName, phone, role, _id, updatedAt } = props.dataViewDetail
    const onClose = () => {
        props.setOpenViewDetail(false);
    };

    return (
        <>
            <Drawer 
            title="Detail Information" 
            placement="right" 
            width={window.innerWidth >= 768 ? '65vw' : '100vw'} 
            onClose={onClose} 
            open={props.openViewDetail}>
                <Descriptions
                    title="User Information"
                    bordered
                    column={window.innerWidth >=  768 ? 2 : 1}
                >
                    <Descriptions.Item label="Id">{_id}</Descriptions.Item>
                    <Descriptions.Item label="Name">{fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={2}>{role}</Descriptions.Item>
                    <Descriptions.Item label="Created At" >
                        {moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(updatedAt).format("DD/MM/YYYY HH:mm:ss")}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    );
};

export default UserViewDetail;