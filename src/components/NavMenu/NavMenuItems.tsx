import {
    HomeOutlined,
    ProjectOutlined,
    TeamOutlined
} from '@ant-design/icons';

import {
    MAIN_PAGE_ROUTE, PROJECTS_PAGE_ROUTE,
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
];

export const NavMenuItemsStudent: NavMenuItem[] = [
    {
        key: '2',
        path: PROJECTS_PAGE_ROUTE,
        label: 'Проекты',
        icon: <ProjectOutlined />
    },
];

export const NavMenuItemsSuperAdmin: NavMenuItem[] = [
    {
        key: '2',
        path: PROJECTS_PAGE_ROUTE,
        label: 'Проекты',
        icon: <ProjectOutlined />
    },
    {
        key: '3',
        path: PROJECTS_PAGE_ROUTE,
        label: 'Ученики',
        icon: <TeamOutlined />
    },
];