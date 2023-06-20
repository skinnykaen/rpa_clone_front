import { Divider, Layout, Row } from 'antd';

import styles from './AppSider.module.scss';

// import { ReactComponent as Logo } from '@/assets/logo.svg';

import { Colors } from '@/consts';
import NavMenu from '@/components/NavMenu';
import Profile from '@/components/ProfileMenuItem';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useAppSelector } from '@/store';
import { Themes } from '@/models';

const { Sider } = Layout;

function AppSider() {
	const { theme } = useAppSelector(state => state.themeReducer);
	return (
		<Sider
			breakpoint='lg'
			collapsedWidth='0'
			width={220}
			style={{ backgroundColor: (theme === Themes.DARK) ? Colors.BG_MAIN_DARK : Colors.BG_MAIN }}
			className={styles.sider}
		>
			<Row justify='center'>
				<div className={styles.logo}>
					{/* <Logo /> */}
					LOGO
				</div>
			</Row>
			<Divider style={{ margin: '12px 0' }} />
			<NavMenu />
			<Divider style={{ margin: '12px 0' }} />
			<Profile />
			<ThemeSwitcher style={{ marginLeft: '26px', marginTop: '12px' }} />
		</Sider>
	);
}

export default AppSider;