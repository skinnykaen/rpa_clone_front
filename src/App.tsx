import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ApolloProvider } from '@apollo/client';

import PageLayout from '@/modules/PageLayout';
import LoginPage from '@/pages/Login';
import LogoutPage from '@/pages/Logout';
import ProfilePage from '@/pages/Profile';
import ProjectsPage from '@/pages/Projects';
import StudentsPage from '@/pages/Students';
import {
    LOGIN_PAGE_ROUTE,
    LOGOUT_PAGE_ROUTE,
    PROFILE_PAGE_ROUTE,
    PROJECTS_PAGE_ROUTE,
    STUDENTS_PAGE_ROUTE,
} from '@/consts';
import { darkThemeConfig, defaultThemeConfig } from '@/themeConfig';
import { useAppSelector } from '@/store';
import { Themes } from '@/models';
import { graphqlClient } from '@/graphql/client';

function App() {
    const { theme } = useAppSelector(state => state.themeReducer);
    return (
        <ApolloProvider client={graphqlClient}>
            <ConfigProvider theme={(theme === Themes.DARK) ? darkThemeConfig : defaultThemeConfig}>
                <BrowserRouter>
                    <PageLayout>
                        <Routes>
                            <Route
                                path={LOGIN_PAGE_ROUTE}
                                element={<LoginPage />}
                            />
                            <Route
                                path={LOGOUT_PAGE_ROUTE}
                                element={<LogoutPage />}
                            />
                            <Route
                                path={PROFILE_PAGE_ROUTE}
                                element={<ProfilePage />}
                            />
                            <Route
                                path={PROJECTS_PAGE_ROUTE}
                                element={<ProjectsPage />}
                            />
                             <Route
                                path={STUDENTS_PAGE_ROUTE}
                                element={<StudentsPage />}
                            />
                        </Routes>
                    </PageLayout>
                </BrowserRouter>
            </ConfigProvider>
        </ApolloProvider>
    );
}

export default App;
