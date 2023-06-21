import { Button, Form, Input, Checkbox, notification } from 'antd';
import { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Response, SignUp } from '@/__generated__/graphql';
import { SignUpFormInputs } from './SignUpForm.types';

function SignUpForm() {
    const [form] = Form.useForm();
    const SIGN_UP = gql`
    mutation SignUp($input: SignUp!){
        SignUp(input: $input) {
            ... on Response{
                    ok
                }
            }
        }
    `;
    const [signUp, {loading}] = useMutation<{ SignIn: Response }, { input: SignUp }>(
        SIGN_UP,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'На ваш email была отправлена инструкция для активации.',
                })
            },
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
        }
    );
    const onFinish = (inputs: SignUpFormInputs) => {
        signUp({
            variables: {
                input: {
                    email: inputs.email,
                    password: inputs.password,
                    lastname: inputs.lastname,
                    firstname: inputs.firstname,
                    middlename: inputs.middlename,
                    nickname: inputs.nickname,
                }
            }
        })
    };
    console.log(signUp);
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
                <Input.Password
                    placeholder='Пароль'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='lastname'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите вашу Фамилию!',
                    },
                ]}
            >
                <Input
                    placeholder='Фамилия'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='firstname'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваше Имя!',
                    },
                ]}
            >
                <Input
                    placeholder='Имя'
                    size='large'
                />
            </Form.Item>
            <Form.Item
                name='middlename'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваше Отчество!',
                    },
                ]}
            >
                <Input
                    placeholder='Отчество'
                    size='large'
                />
            </Form.Item>
            <Form.Item
                name='nickname'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите ваш Nickname!',
                    },
                ]}
            >
                <Input
                    placeholder='Никнейм'
                    size='large'
                />
            </Form.Item>
            <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Ознакомьтесь с пользовательким соглашением!')),
                    },
                ]}
            >
                <Checkbox>
                    Я прочитал условия <a href="">пользователького соглашения</a>
                </Checkbox>
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
                            Зарегистрироваться
                        </Button>
                    )
                }

            </Form.Item>
        </Form>
    );
}

export default SignUpForm;