import { Card, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook';

const columns = [
    {
        title: 'User',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
    },
    {
        title: 'Task',
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

            />
        </Card>)
}
