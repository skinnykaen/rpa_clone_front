import { useEffect, useState } from 'react';
import { Button, Form, Input, Switch, notification } from 'antd';

import { ProfileFormInputs } from './ProfileCard.types';

import { Role, UpdateUser, UserHttp } from '@/__generated__/graphql';
import { useMutation } from '@apollo/client';
import { SET_USER_IS_ACTIVE, UPDATE_USER } from '@/graphql/mutations';
import { GET_ALL_USERS, GET_USER_BY_ID } from '@/graphql/query';
import { QueryOptions } from 'apollo-client';

interface ProfileCardProps {
    isEditMode: boolean;
    profileData: UserHttp | undefined;
}

function ProfileCard({
    isEditMode,
    profileData,
}: ProfileCardProps) {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);

    const [updateUser, { loading }] = useMutation<{ UpdateUser: UserHttp }, { input: UpdateUser }>(
        UPDATE_USER,
        {
            onCompleted: () => {
                notification.success({
                    message: '',
                    description: 'Успешно обновлено',
                })
            },
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            refetchQueries: [
                {
                    query: GET_USER_BY_ID,
                    variables: { id: profileData?.id },
                } as QueryOptions<{ id: string }>
            ]
        }
    );
    const [setUserIsActive, setUserIsActiveResult] = useMutation<{ SetUserIsActive: Response }, { id: string, isActive: boolean }>(
        SET_USER_IS_ACTIVE,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Статус активации изменен.',
                })
            },
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            refetchQueries: [
                {
                    query: GET_USER_BY_ID,
                    variables: { id: profileData?.id },
                } as QueryOptions<{ id: string }>,
                {
                    query: GET_ALL_USERS,
                    variables: {
                        active: true,
                        roles: [Role.Student],
                    },
                } as QueryOptions<{ active: boolean, roles: Role[] }>
            ]
        }
    )
    return (
        <div>
            <Form
                name='profile'
                className='profile-form'
                onFinish={(inputs: ProfileFormInputs) => {
                    updateUser({
                        variables: {
                            input: {
                                id: profileData?.id || '0',
                                email: inputs.email,
                                firstname: inputs.firstname,
                                lastname: inputs.lastname,
                                middlename: inputs.middlename,
                                nickname: inputs.nickname
                            }
                        }
                    })
                }}
                form={form}
                disabled={!isEditMode}
                initialValues={{
                    email: profileData?.email,
                    nickname: profileData?.nickname,
                    firstname: profileData?.firstname,
                    lastname: profileData?.lastname,
                    middlename: profileData?.middlename,
                }}
            >
                <Form.Item name='email'>
                    <Input placeholder={'email'} size='large' />
                </Form.Item>
                <Form.Item name='nickname'>
                    <Input placeholder={'никнейм'} size='large' />
                </Form.Item>
                <Form.Item name='lastname'>
                    <Input placeholder={'фамилия'} size='large' />
                </Form.Item>
                <Form.Item name='firstname'>
                    <Input placeholder={'имя'} size='large' />
                </Form.Item>
                <Form.Item name='middlename'>
                    <Input placeholder={'отчетсво'} size='large' />
                </Form.Item>
                <Form.Item label={'Роль: '}>
                    {
                        profileData?.role
                    }
                </Form.Item>
                <Form.Item label={'Создан: '}>
                    {
                        profileData?.createdAt
                    }
                </Form.Item>
                <Form.Item label={'Последнее обновление: '}>
                    {
                        profileData?.updatedAt
                    }
                </Form.Item>
                <Form.Item name='active' label={'Активен'}>
                    <Switch
                        defaultChecked={profileData?.isActive}
                        loading={setUserIsActiveResult.loading}
                        onChange={() =>
                            setUserIsActive({
                                variables: {
                                    id: profileData?.id || '0',
                                    isActive: !profileData?.isActive,
                                },
                            })
                        }
                    />
                </Form.Item>
                {
                    isEditMode &&
                    <Form.Item>
                        <Button
                            loading={loading}
                            type='primary'
                            htmlType='submit'
                            className='profile-form-button'
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                }
            </Form>
        </div>
    );
}

export default ProfileCard;