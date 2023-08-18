import { Button, Form, Input, notification } from 'antd';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { QueryOptions } from 'apollo-client';

import { CreateUserFormInputs } from './CreateUser.types';

import { NewUser, Role, UserHttp } from '@/__generated__/graphql';
import { CREATE_USER } from '@/graphql/mutations';
import { handlingGraphqlErrors } from '@/utils';

interface CreateUserProps {
    role: string;
    refetchQueries: QueryOptions[];
}

function CreateUser({ role, refetchQueries }: CreateUserProps) {
    const [form] = Form.useForm();
    const [createUser, { loading }] = useMutation<{ CreateUser: UserHttp }, { input: NewUser }>(
        CREATE_USER,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Пользователь успешно создан.',
                });
            },
            onError: error => {
                handlingGraphqlErrors(error);
            },
            refetchQueries: refetchQueries,
        },
    );
    const onFinish = (inputs: CreateUserFormInputs) => {
        createUser({
            variables: {
                input: {
                    email: inputs.email,
                    password: inputs.password,
                    lastname: inputs.lastname,
                    firstname: inputs.firstname,
                    middlename: inputs.middlename,
                    nickname: inputs.nickname,
                    role: role as Role,
                },
            },
        });
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
                    size='middle'
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
                    size='middle'
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
                            Создать
                        </Button>
                    )
                }
            </Form.Item>
        </Form>
    );
}

export default CreateUser;