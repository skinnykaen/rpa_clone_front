import {
    HomeOutlined,
    ReadOutlined,
} from '@ant-design/icons';

import {
    MAIN_PAGE_ROUTE,
    SECOND_PAGE_ROUTE,
} from '@/consts';

interface NavMenuItem {
    key: string;
    path: string;
    label: string;
    icon?: JSX.Element;
}

export const NavMenuItems: NavMenuItem[] = [
    {
        key: '1',
        path: MAIN_PAGE_ROUTE,
        label: 'Главная',
        icon: <HomeOutlined />,
    },
    {
        key: '2',
        path: SECOND_PAGE_ROUTE,
        label: 'Вторая',
        icon: <ReadOutlined />,
    },
];
