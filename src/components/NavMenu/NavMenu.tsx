import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

import { NavMenuItems, NavMenuItemsStudent, NavMenuItemsSuperAdmin, NavMenuItemsTeacher, NavMenuItemsUnitAdmin } from './NavMenuItems';
import styles from './NavMenu.module.scss';
import { NavMenuItem } from './NavMenu.types';

import {
  APP_SETTINGS_PAGE_ROUTE,
  CLIENTS_PAGE_ROUTE,
  COURSES_PAGE_ROUTE,
  MAIN_PAGE_ROUTE,
  PROJECTS_PAGE_ROUTE,
  ROBBO_GROUPS_PAGE_ROUTE,
  ROBBO_UNITS_PAGE_ROUTE,
  STUDENTS_PAGE_ROUTE,
  TEACHERS_PAGE_ROUTE,
  UNIT_ADMINS_PAGE_ROUTE,
} from '@/consts';
import { Role } from '@/__generated__/graphql';
import { useAppSelector } from '@/store';
import { MenuItemsKeys } from '@/consts/menuItems';

function NavMenu() {
  const { pathname } = useLocation();
  const { userRole } = useAppSelector(state => state.authReducer);
  let menuItems: NavMenuItem[];
  switch (userRole) {
    case Role.SuperAdmin as string:
      menuItems = NavMenuItemsSuperAdmin;
      break;
    case Role.Student as string:
      menuItems = NavMenuItemsStudent;
      break;
    case Role.UnitAdmin as string:
      menuItems = NavMenuItemsUnitAdmin;
      break;
    case Role.Teacher as string:
      menuItems = NavMenuItemsTeacher;
      break;
    default:
      menuItems = NavMenuItems;
  }
  // choice selected item of nav menu
  const selectedKeys = selectActiveKeys(pathname);
  //TODO make global loading
  return (
    <Menu
      mode='inline'
      className={styles.nav_menu}
      defaultSelectedKeys={[selectedKeys]}
      selectedKeys={[selectedKeys]}
      items={menuItems.map((({
        key, path, label, icon,
      }): MenuItemType => (
        {
          key,
          label: <Link to={path}>{label}</Link>,
          icon,
        }
      )))}
    />
  );
}

function selectActiveKeys(pathname: string): string {
  let selectedKeys = '';
  switch (pathname) {
    case MAIN_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.MAIN_PAGE_ROUTE;
      break;
    case PROJECTS_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.PROJECTS_PAGE_ROUTE;
      break;
    case STUDENTS_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.STUDENTS_PAGE_ROUTE;
      break;
    case APP_SETTINGS_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.APP_SETTINGS_PAGE_ROUTE;
      break;
    case CLIENTS_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.CLIENTS_PAGE_ROUTE;
      break;
    case TEACHERS_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.TEACHERS_PAGE_ROUTE;
      break;
    case UNIT_ADMINS_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.UNIT_ADMINS_PAGE_ROUTE;
      break;
    case ROBBO_UNITS_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.ROBBO_UNITS_PAGE_ROUTE;
      break;
    case ROBBO_GROUPS_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.ROBBO_GROUPS_PAGE_ROUTE;
      break;
    case COURSES_PAGE_ROUTE:
      selectedKeys = MenuItemsKeys.COURSES_PAGE_ROUTE;
      break;
    default:
      selectedKeys = '';
  }
  return selectedKeys;
}

export default NavMenu;
