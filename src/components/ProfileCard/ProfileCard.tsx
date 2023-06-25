import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';

import { ProfileFormInputs } from './ProfileCard.types';

import { UserHttp } from '@/__generated__/graphql';

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
    // const layout = {
    //     labelCol: {
    //         span: 8,
    //     },
    //     wrapperCol: {
    //         span: 16,
    //     },
    // }

    return (
        <div>
            <Form
                name='profile'
                className='profile-form'
                onFinish={(inputs: ProfileFormInputs) => {
                    console.log(inputs)
                }}
                // {...layout}
                form={form}
                initialValues={{
                    email: profileData?.email,
                    nickname: profileData?.nickname,
                    firstname: profileData?.firstname,
                    lastname: profileData?.lastname,
                    middlename: profileData?.middlename,
                }}
                disabled={!isEditMode}
            >
                <Form.Item name='email'>
                    <Input placeholder={profileData?.email} size='large' />
                </Form.Item>
                <Form.Item name='nickname'>
                    <Input placeholder={profileData?.nickname} size='large' />
                </Form.Item>
                <Form.Item name='lastname'>
                    <Input placeholder={profileData?.lastname} size='large' />
                </Form.Item>
                <Form.Item name='firstname'>
                    <Input placeholder={profileData?.firstname} size='large' />
                </Form.Item>
                <Form.Item name='middlename'             >
                    <Input placeholder={profileData?.middlename} size='large' />
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
                {
                    isEditMode &&
                    <Form.Item >
                        <Button
                            type='primary' htmlType='submit'
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