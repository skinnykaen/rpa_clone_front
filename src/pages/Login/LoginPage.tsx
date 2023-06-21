import { ACCESS_TOKEN, PROFILE_PAGE_ROUTE } from '@/consts';
import styles from './LoginPage.module.scss';

import AuthModule from '@/modules/Auth';
import { Navigate } from 'react-router-dom';

function LoginPage() {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        return <Navigate to={PROFILE_PAGE_ROUTE} />
    }
    return (
        <div className={styles.login_page}>
            <AuthModule />
        </div>
    );
}

export default LoginPage;