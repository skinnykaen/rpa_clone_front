import {
    HomeOutlined,
    ProjectOutlined,
    SettingOutlined,
    TeamOutlined,
    RobotOutlined,
} from '@ant-design/icons';

import { NavMenuItem } from './NavMenu.types';

import {
    APP_SETTINGS_PAGE_ROUTE,
    CLIENTS_PAGE_ROUTE,
    MAIN_PAGE_ROUTE,
    PROJECTS_PAGE_ROUTE,
    ROBBO_GROUPS_PAGE_ROUTE,
    ROBBO_UNITS_PAGE_ROUTE,
    STUDENTS_PAGE_ROUTE,
    TEACHERS_PAGE_ROUTE,
    UNIT_ADMINS_PAGE_ROUTE,
} from '@/consts';
import { MenuItemsKeys } from '@/consts/menuItems';

export const NavMenuItems: NavMenuItem[] = [
    {
        key: MenuItemsKeys.MAIN_PAGE_ROUTE,
        path: MAIN_PAGE_ROUTE,
        label: 'Главная',
        icon: <HomeOutlined />,
    },
];

export const NavMenuItemsStudent: NavMenuItem[] = [
    {
        key:  MenuItemsKeys.MAIN_PAGE_ROUTE,
        path: MAIN_PAGE_ROUTE,
        label: 'Главная',
        icon: <HomeOutlined />,
    },
    {
        key:  MenuItemsKeys.PROJECTS_PAGE_ROUTE,
        path: PROJECTS_PAGE_ROUTE,
        label: 'Проекты',
        icon: <ProjectOutlined />,
    },
];

export const NavMenuItemsTeacher: NavMenuItem[] = [
    {
        key:  MenuItemsKeys.MAIN_PAGE_ROUTE,
        path: MAIN_PAGE_ROUTE,
        label: 'Главная',
        icon: <HomeOutlined />,
    },
    {
        key: MenuItemsKeys.STUDENTS_PAGE_ROUTE,
        path: STUDENTS_PAGE_ROUTE,
        label: 'Ученики',
        icon: <TeamOutlined />,
    },
    {
        key: MenuItemsKeys.ROBBO_GROUPS_PAGE_ROUTE,
        path: ROBBO_GROUPS_PAGE_ROUTE,
        label: 'Роббо группы',
        icon: <RobotOutlined />,
    },
];

export const NavMenuItemsUnitAdmin: NavMenuItem[] = [
    {
        key:  MenuItemsKeys.MAIN_PAGE_ROUTE,
        path: MAIN_PAGE_ROUTE,
        label: 'Главная',
        icon: <HomeOutlined />,
    },
    {
        key: MenuItemsKeys.CLIENTS_PAGE_ROUTE,
        path: CLIENTS_PAGE_ROUTE,
        label: 'Клиенты',
        icon: <TeamOutlined />,
    },
    {
        key: MenuItemsKeys.STUDENTS_PAGE_ROUTE,
        path: STUDENTS_PAGE_ROUTE,
        label: 'Ученики',
        icon: <TeamOutlined />,
    },
    {
        key: MenuItemsKeys.TEACHERS_PAGE_ROUTE,
        path: TEACHERS_PAGE_ROUTE,
        label: 'Педагоги',
        icon: <TeamOutlined />,
    },
    {
        key: MenuItemsKeys.ROBBO_UNITS_PAGE_ROUTE,
        path: ROBBO_UNITS_PAGE_ROUTE,
        label: 'Роббо юниты',
        icon: <RobotOutlined />,
    },
    {
        key: MenuItemsKeys.ROBBO_GROUPS_PAGE_ROUTE,
        path: ROBBO_GROUPS_PAGE_ROUTE,
        label: 'Роббо группы',
        icon: <RobotOutlined />,
    },
];

export const NavMenuItemsSuperAdmin: NavMenuItem[] = [
    {
        key: MenuItemsKeys.MAIN_PAGE_ROUTE,
        path: MAIN_PAGE_ROUTE,
        label: 'Главная',
        icon: <HomeOutlined />,
    },
    {
        key: MenuItemsKeys.PROJECTS_PAGE_ROUTE,
        path: PROJECTS_PAGE_ROUTE,
        label: 'Проекты',
        icon: <ProjectOutlined />,
    },
    {
        key: MenuItemsKeys.STUDENTS_PAGE_ROUTE,
        path: STUDENTS_PAGE_ROUTE,
        label: 'Ученики',
        icon: <TeamOutlined />,
    },
    {
        key: MenuItemsKeys.CLIENTS_PAGE_ROUTE,
        path: CLIENTS_PAGE_ROUTE,
        label: 'Клиенты',
        icon: <TeamOutlined />,
    },
    {
        key: MenuItemsKeys.TEACHERS_PAGE_ROUTE,
        path: TEACHERS_PAGE_ROUTE,
        label: 'Педагоги',
        icon: <TeamOutlined />,
    },
    {
        key: MenuItemsKeys.UNIT_ADMINS_PAGE_ROUTE,
        path: UNIT_ADMINS_PAGE_ROUTE,
        label: 'Юнит админы',
        icon: <TeamOutlined />,
    },
    {
        key: MenuItemsKeys.ROBBO_UNITS_PAGE_ROUTE,
        path: ROBBO_UNITS_PAGE_ROUTE,
        label: 'Роббо юниты',
        icon: <RobotOutlined />,
    },
    {
        key: MenuItemsKeys.ROBBO_GROUPS_PAGE_ROUTE,
        path: ROBBO_GROUPS_PAGE_ROUTE,
        label: 'Роббо группы',
        icon: <RobotOutlined />,
    },
    {
        key: MenuItemsKeys.APP_SETTINGS_PAGE_ROUTE,
        path: APP_SETTINGS_PAGE_ROUTE,
        label: 'Настройки',
        icon: <SettingOutlined />,
    },
];