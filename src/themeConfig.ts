import { ThemeConfig, theme } from 'antd';

import { Colors } from '@/consts';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const defaultThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: Colors.PRIMARY,
        colorBgLayout: Colors.BG_LAYOUT,
        fontSize: 16,
        borderRadius: 12,
    },
    algorithm: defaultAlgorithm,
};

export const darkThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: Colors.PRIMARY,
        colorBgLayout: Colors.BG_LAYOUT_DARK,
        fontSize: 16,
        borderRadius: 12,
        colorBgContainer: Colors.BG_MAIN_DARK,
    },
    algorithm: darkAlgorithm,
};
