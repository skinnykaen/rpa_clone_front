import { Button, Form, Input, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';

import ForgotPassword from '@/components/ForgotPassword';

function SignInForm() {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [modalOpen, setOpen] = useState(false);
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (input: any) => {
        console.log(input);
    };

    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите ваш email',
                        },
                    ]}
                >
                    <Input
                        placeholder='Email'
                        size='middle'
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите ваш пароль',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder='Пароль'
                        size='middle'
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {
                        () => (
                            <Button
                                type='primary'
                                htmlType='submit'
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                            >
                                Войти
                            </Button>
                        )
                    }
                </Form.Item>
                <Typography.Text
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpen(!modalOpen)}>
                    Забыли пароль?
                </Typography.Text>
            </Form>
            <Modal
                title='Восстановление доступа'
                open={modalOpen}
                footer={null}
                onCancel={() => setOpen(false)}
            >
                <ForgotPassword />
            </Modal>
        </>
    );
}

export default SignInForm;