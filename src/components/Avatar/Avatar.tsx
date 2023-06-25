import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import styles from './Avatar.module.scss';

function AvatarComponent() {
    return (
        <div className={styles.avatar}>
            <Avatar
                size={{ xs: 64, sm: 62, md: 120, lg: 184, xl: 240, xxl: 300 }}
                icon={<UserOutlined />}
            />
        </div>

    )
}

export default AvatarComponent;