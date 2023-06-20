import styles from './LoginPage.module.scss';

import AuthModule from '@/modules/Auth';

function LoginPage() {
    return (
        <div className={styles.login_page}>
            <AuthModule />
        </div>
    );
}

export default LoginPage;