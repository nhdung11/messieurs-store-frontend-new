import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import { callDashboard } from '../../services/apis';


const AdminPage = () => {   
    const [dataDashboard, setDataDashboard] = useState({
        countOrder: 0,
        countUser: 0
    })
    useEffect(() =>{
        const initDashboard = async () => {
            const res = await callDashboard()
            if(res && res.data) {
                setDataDashboard(res.data)
            }
        }
        initDashboard()
    }, [])

    const formatter = (value) => <CountUp end={value} separator="," />;
    

    return (
        <Row gutter={[40, 40]}>
            <Col span={window.innerWidth >= 768 ? 10 : 24}>
                <Card title="" bordered={false} >
                    <Statistic title="Tổng Users" value={dataDashboard.countUser}  formatter = {formatter}/>
                </Card>
            </Col>

            <Col span={window.innerWidth >= 768 ? 10 : 24}>
                <Card title="" bordered={false} >
                    <Statistic title="Tổng Orders" value={dataDashboard.countOrder} formatter = {formatter} />
                </Card>
            </Col>
        </Row>
    )
}

export default AdminPage;