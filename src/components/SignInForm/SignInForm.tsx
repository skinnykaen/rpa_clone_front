import { Button, Col, Form, Input, Modal, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';

import ForgotPassword from '@/components/ForgotPassword';
import { SignIn, SignInResponse } from '@/__generated__/graphql';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ACCESS_TOKEN, PROFILE_PAGE_ROUTE, REFRESH_TOKEN } from '@/consts';
import { SignInFormInputs } from './SignInForm.types';
import { SIGN_IN } from '@/graphql/mutations';

function SignInForm() {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
    useEffect(() => {
        forceUpdate({});
    }, []);

    const navigate = useNavigate()
   
    const [signIn, { loading }] = useMutation<{ SignIn: SignInResponse }, { input: SignIn }>(
        SIGN_IN,
        {
            onCompleted: ({ SignIn }) => {
                localStorage.setItem(ACCESS_TOKEN, SignIn.accessToken);
                localStorage.setItem(REFRESH_TOKEN, SignIn.refreshToken);
                navigate(PROFILE_PAGE_ROUTE)
            },
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
        }
    );
    const onFinish = (inputs: SignInFormInputs) => {
        signIn({
            variables: {
                input: {
                    email: inputs.email,
                    password: inputs.password,
                }
            }
        })
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
                                loading={loading}
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
                <Col>
                    <Typography.Text
                        style={{ cursor: 'pointer' }}
                        onClick={() => setResetPasswordModalOpen(!resetPasswordModalOpen)}
                    >
                        Забыли пароль?
                    </Typography.Text>
                </Col>
            </Form>
            <Modal
                title='Восстановление доступа'
                open={resetPasswordModalOpen}
                footer={null}
                onCancel={() => setResetPasswordModalOpen(false)}
            >
                <ForgotPassword />
            </Modal>
        </>
    );
}

export default SignInForm;