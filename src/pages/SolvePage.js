import { Button, Card, Form, Select, Space, Typography, Input, Alert, Spin } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import React from 'react';
import { useSolve } from '../hooks/solve.hook';

const { Text } = Typography;
const { TextArea } = Input;

export const SolvePage = () => {
    const [form] = Form.useForm();
    const {
        loading,
        state,
        hadleOnSelectTask,
        handleOnSelectLanguage,
        handleRunScript,
        handleSubmitScript
    } = useSolve(form);

    return (
        <Card >
            <Spin tip="Loading..." spinning={loading}>
                <Form
                    form={form}
                    name="solveForm"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        name='solveButtons'
                        wrapperCol={{
                            offset: 8,
                        }}>
                        <Space>
                            <Button
                                icon={<CaretRightOutlined />}
                                onClick={handleRunScript}
                            >
                                RUN
                            </Button>
                            <Button
                                type='primary'
                                onClick={handleSubmitScript}
                            >
                                SUBMIT
                            </Button>
                            {state.statusCode !== 0 &&
                                (state.isCompleted ?
                                    <Alert message="Completed" type="success" showIcon />
                                    : <Alert message="Is not completed" type="error" showIcon />)

                            }
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label="SELECT TASK"
                        name="task"
                    >
                        <Select
                            options={state.optionsTasks}
                            onSelect={hadleOnSelectTask}
                        />
                    </Form.Item>
                    {
                        state.description &&
                        <Form.Item
                            label="DESCRIPTION"
                            name="description"
                        >
                            <Text>{state.description}</Text>
                        </Form.Item>
                    }
                    {
                        state?.optionsLanguage.length > 0 &&
                        <Form.Item
                            label="SELECT LANGUAGE"
                            name="language"
                        >
                            <Select
                                options={state.optionsLanguage}
                                onSelect={handleOnSelectLanguage}
                            />
                        </Form.Item>
                    }
                    {
                        state.taskDetailsId &&
                        <Form.Item
                            label="SCRIPT"
                            name="script"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your script!',
                                },
                            ]}
                        >
                            <TextArea
                                rows={6}
                            />
                        </Form.Item>
                    }
                    {
                        state.statusCode !== 0 && (
                            <>
                                <Form.Item
                                    label="EXPECTED"
                                    name="expected"
                                >
                                    <Text>{state.expected}</Text>
                                </Form.Item>
                                <Form.Item
                                    label="YOUR RESULT"
                                    name="output"
                                >
                                    <Text>{state.output}</Text>
                                </Form.Item>
                            </>
                        )
                    }
                </Form>
            </Spin>
        </Card>
    )
}
