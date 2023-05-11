import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import {useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate()
  return (


    <Result
      icon={<SmileOutlined />}
      title="Đơn hàng đã được đặt thành công!"
      extra={
        <Button
          onClick={() => navigate('/history')}
          type="primary">
          Xem lịch sử
        </Button>
      }
    />
  );

}

export default OrderSuccess;