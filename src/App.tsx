import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import PageLayout from '@/modules/PageLayout';
import LoginPage from '@/pages/LoginPage';
import {
    LOGIN_PAGE_ROUTE,
} from '@/consts';
import { darkThemeConfig, defaultThemeConfig } from '@/themeConfig';
import { useAppSelector } from '@/store';
import { Themes } from '@/models';

function App() {
    const { theme } = useAppSelector(state => state.themeReducer);
    return (
        <ConfigProvider
            theme={(theme === Themes.DARK) ? darkThemeConfig : defaultThemeConfig}
        >
            <BrowserRouter>
                <PageLayout>
                    <Routes>
                        <Route
                            path={LOGIN_PAGE_ROUTE}
                            element={<LoginPage />}
                        />
                    </Routes>
                </PageLayout>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
