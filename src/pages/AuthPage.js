import { Button, Card, Form, Input, message, Space, Spin } from 'antd';
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const AuthPage = () => {
    const { login } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [form] = Form.useForm();

    const registerHandler = async () => {
        try {
            await form.validateFields();
            await request('api/auth/register', 'POST', form.getFieldsValue());
            message.success('The user is successfully registered.');
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            await form.validateFields();
            const { token, userId, userName, role } = await request('api/auth/login', 'POST', form.getFieldsValue());
            login(token, userId, userName, role);
        } catch (e) { }
    }


    return (
        <Card
            title='Cognizant challenge: login\register'
        >
            <Spin tip="Loading..." spinning={loading}>
                <Form
                    form={form}
                    name="authForm"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="loginButtons"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}>
                        <Space>
                            <Button
                                type='primary'
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Login
                            </Button>
                            <Button
                                disabled={loading}
                                onClick={registerHandler}
                            >
                                Register
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Spin>
        </Card>
    )
}
