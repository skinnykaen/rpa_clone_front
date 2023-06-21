import { Tabs, Typography } from 'antd';

import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';


function AuthModule() {
    return (
        <Tabs
            defaultActiveKey='1'
            items={[
                {
                    key: '1',
                    label: <Typography.Title level={3}>Вход</Typography.Title>,
                    children: <SignInForm />,
                },
                {
                    key: '2',
                    label: <Typography.Title level={3}>Регистация</Typography.Title>,
                    children: <SignUpForm />,
                },
            ]}
        />
    );
}

export default AuthModule;