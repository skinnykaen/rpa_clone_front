import { Button, Form, Input, Switch } from 'antd';
import { useEffect, useState } from 'react';

interface SignUpProps {
    role: number;
}

function SignUpForm({
    role,
}: SignUpProps) {
    const [form] = Form.useForm();
    const [checked, setChecked] = useState(false);
    const onFinish = (input: any) => {
        console.log(input);
    };

    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);

    return (
        <Form
            onFinish={onFinish}
            form={form}
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
                    {
                        min: 8,
                        message: 'Пароль должен содержать не меньше 8 символов',
                    },
                ]}
            >
                <Input.Password
                    placeholder='Пароль'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='password_repeat'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, повторите пароль',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают!'));
                        },
                    }),
                ]}
            >
                <Input
                    type='password'
                    placeholder='Пароль'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                label='Принимаю условия пользовательского соглашения'
                name='terms_of_use'
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                    () => ({
                        validator(_, value) {
                            if (value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Ознакомьтесь с пользовательким соглашением!'));
                        },
                    }),
                ]}
            >
                <Switch
                    checked={checked}
                    onChange={(checked) => setChecked(checked)}
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
                            Зарегистрироваться
                        </Button>
                    )
                }

            </Form.Item>
        </Form>
    );
}

export default SignUpForm;