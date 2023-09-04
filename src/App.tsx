import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ApolloProvider } from '@apollo/client';

import PageLayout from '@/modules/PageLayout';
import LoginPage from '@/pages/Login';
import LogoutPage from '@/pages/Logout';
import ProfilePage from '@/pages/Profile';
import ProjectsPage from '@/pages/Projects';
import StudentsPage from '@/pages/Students';
import SettingsPage from '@/pages/Settings';
import ProjectPage from '@/pages/ProjectPage';
import ActivationPage from '@/pages/Activation';
import ClientsPage from '@/pages/Clients';
import TeachersPage from '@/pages/Teachers';
import UnitAdmins from '@/pages/UnitAdmins';
import RobboUnitsPage from '@/pages/RobboUnits';
import RobboGroupsPage from '@/pages/RobboGroups';
import {
    ACTIVATION_PAGE_ROUTE,
    APP_SETTINGS_PAGE_ROUTE,
    CLIENTS_PAGE_ROUTE,
    LOGIN_PAGE_ROUTE,
    LOGOUT_PAGE_ROUTE,
    PROFILE_PAGE_ROUTE,
    PROJECTS_PAGE_ROUTE,
    PROJECT_PAGE_ROUTE,
    ROBBO_GROUPS_PAGE_ROUTE,
    ROBBO_UNITS_PAGE_ROUTE,
    STUDENTS_PAGE_ROUTE,
    TEACHERS_PAGE_ROUTE,
    UNIT_ADMINS_PAGE_ROUTE,
} from '@/consts';
import { darkThemeConfig, defaultThemeConfig } from '@/themeConfig';
import { useAppSelector } from '@/store';
import { Roles, Themes } from '@/models';
import { graphqlClient } from '@/graphql/client';
import ProtectedRoute from '@/hocs/ProtectedRoute';


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
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin, Roles.Student, Roles.UnitAdmin, Roles.Teacher, Roles.Parent]}>
                                        <ProfilePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={PROJECTS_PAGE_ROUTE}
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin, Roles.Student]}>
                                        <ProjectsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={STUDENTS_PAGE_ROUTE}
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin, Roles.UnitAdmin, Roles.Teacher]}>
                                        <StudentsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={APP_SETTINGS_PAGE_ROUTE}
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin]}>
                                        <SettingsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={PROJECT_PAGE_ROUTE}
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin, Roles.Student]}>
                                        <ProjectPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={CLIENTS_PAGE_ROUTE}
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin, Roles.UnitAdmin]}>
                                        <ClientsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={TEACHERS_PAGE_ROUTE}
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin, Roles.UnitAdmin]}>
                                        <TeachersPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={UNIT_ADMINS_PAGE_ROUTE}
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin]}>
                                        <UnitAdmins />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={ROBBO_UNITS_PAGE_ROUTE}
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin, Roles.UnitAdmin]}>
                                        <RobboUnitsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={ROBBO_GROUPS_PAGE_ROUTE}
                                element={
                                    <ProtectedRoute allowedRoles={[Roles.SuperAdmin, Roles.UnitAdmin, Roles.Teacher]}>
                                        <RobboGroupsPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path={ACTIVATION_PAGE_ROUTE}
                                element={<ActivationPage />}
                            />
                        </Routes>
                    </PageLayout>
                </BrowserRouter>
            </ConfigProvider>
        </ApolloProvider >
    );
}

export default App;
