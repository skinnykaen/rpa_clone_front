import { Space, Switch, Typography } from 'antd';

import { ThemeSwitcherProps } from './ThemeSwitcher.type';

import { useAppDispatch, useAppSelector } from '@/store';
import { themeSlice } from '@/store/slices';
import { Themes } from '@/models';

const { Text } = Typography;

function ThemeSwitcher({ style }: ThemeSwitcherProps) {
    const { theme } = useAppSelector(state => state.themeReducer);
    const dispatch = useAppDispatch();

    const onThemeChange = (value: boolean) => {
        dispatch(themeSlice.actions.setTheme(value ? Themes.DARK : Themes.DEFAULT));
    };

    return (
        <div style={style}>
            <Space>
                <Switch
                    onChange={onThemeChange}
                    defaultChecked={theme === Themes.DARK}
                />
                <Text>Тема</Text>
            </Space>
        </div>
    );
}

export default ThemeSwitcher;