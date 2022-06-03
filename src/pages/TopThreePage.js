import { Card, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook';

const { Title } = Typography;

const columns = [
    {
        title: 'Name',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Success solutions',
        dataIndex: 'score',
        key: 'score',
    },
    {
        title: 'Tasks',
        dataIndex: 'completedTasks',
        key: 'completedTasks',
    },
];

export const TopThreePage = () => {
    const [dataSource, setDataSource] = useState(null);
    const { request, loading } = useHttp();

    useEffect(() => {
        const fetchTopThree = async () => {
            try {
                const response = await request('/api/CompletedTasks/topthree', 'GET');
                setDataSource(response);
            } catch (error) { }
        }

        fetchTopThree();
    }, [request]);

    return (
        <Card>
            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={false}
                title={() => <Title level={5}>TOP 3 Players</Title>}
            />
        </Card>
    )
}
