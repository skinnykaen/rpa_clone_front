import {
    HomeOutlined,
    ProjectOutlined,
    TeamOutlined,
    SettingOutlined,
} from '@ant-design/icons';

import {
    APP_SETTINGS_PAGE_ROUTE,
    MAIN_PAGE_ROUTE, PROJECTS_PAGE_ROUTE, STUDENTS_PAGE_ROUTE,
} from '@/consts';
import { NavMenuItem } from './NavMenu.types';

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
        key: '1',
        path: MAIN_PAGE_ROUTE,
        label: 'Главная',
        icon: <HomeOutlined />,
    },
    {
        key: '2',
        path: PROJECTS_PAGE_ROUTE,
        label: 'Проекты',
        icon: <ProjectOutlined />
    },
];

export const NavMenuItemsSuperAdmin: NavMenuItem[] = [
    {
        key: '1',
        path: MAIN_PAGE_ROUTE,
        label: 'Главная',
        icon: <HomeOutlined />,
    },
    {
        key: '2',
        path: PROJECTS_PAGE_ROUTE,
        label: 'Проекты',
        icon: <ProjectOutlined />
    },
    {
        key: '3',
        path: STUDENTS_PAGE_ROUTE,
        label: 'Ученики',
        icon: <TeamOutlined />
    },
    {
        key: '4',
        path: APP_SETTINGS_PAGE_ROUTE,
        label: 'Настройки',
        icon: <SettingOutlined />
    },
];