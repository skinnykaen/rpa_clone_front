import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

import { NavMenuItems } from './NavMenuItems';
import styles from './NavMenu.module.scss';

import {
  MAIN_PAGE_ROUTE,
  SECOND_PAGE_ROUTE,
} from '@/consts';

interface NavMenuProps {
}

function NavMenu({ }: NavMenuProps) {
  // choice selected item of nav menu
  const { pathname } = useLocation();
  let selectedKeys = '';
  switch (pathname) {
    case MAIN_PAGE_ROUTE:
      selectedKeys = '1';
      break;
    case SECOND_PAGE_ROUTE:
      selectedKeys = '2';
      break;
    default:
      selectedKeys = '';
  }

  return (
    <Menu
      mode='inline'
      className={styles.nav_menu}
      defaultSelectedKeys={[selectedKeys]}
      selectedKeys={[selectedKeys]}
      items={NavMenuItems.map((({
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

export default NavMenu;
