import { Menu } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import {
    Link,
    useLocation,
} from 'react-router-dom';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import { ACCESS_TOKEN, LOGIN_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from '@/consts';

function Profile() {
    const { pathname } = useLocation();
    let selectedKeys = '';
    switch (pathname) {
        case LOGIN_PAGE_ROUTE:
            selectedKeys = '2';
            break;
        case PROFILE_PAGE_ROUTE:
            selectedKeys = '1';
            break;
        default:
            selectedKeys = '';
    }
    let menuItems: ItemType[];
    if (localStorage.getItem(ACCESS_TOKEN)) {
        menuItems = [
            {
                key: '1',
                label: <Link to={PROFILE_PAGE_ROUTE}>Профиль</Link>,
                icon: <UserOutlined />,
            },
            {
                key: '3',
                label: 'Выйти',
                icon: <LogoutOutlined />,
            },
        ];
    } else {
        menuItems = [
            {
                key: '2',
                label: <Link to={LOGIN_PAGE_ROUTE}>Войти</Link>,
                icon: <UserOutlined />,
            },
        ];
    }
    return (
        <Menu
            mode='inline'
            defaultSelectedKeys={['']}
            selectedKeys={[selectedKeys]}
            items={menuItems}
            style={{ background: 'none' }}
        />
    );
}

export default Profile;