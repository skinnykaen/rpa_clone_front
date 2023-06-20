import { Tabs, Typography } from 'antd';

import SignIn from './SignIn';
import SignUp from './SignUp';

function AuthModule() {
    return (
        <Tabs
            defaultActiveKey='1'
            items={[
                {
                    key: '1',
                    label:  <Typography.Title level={3}>Вход</Typography.Title>,
                    children: <SignIn />,
                },
                {
                    key: '2',
                    label: <Typography.Title level={3}>Регистация</Typography.Title>,
                    children: <SignUp needSelectRole={false}/>,
                },
            ]}
        />
    );
}

export default AuthModule;