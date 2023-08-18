import { Avatar, Upload, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';


import { useState } from 'react';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';

import styles from './Avatar.module.scss';

function AvatarComponent() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    console.log(imageUrl);

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Вы можете загрузить только изображения формата JPG/PNG');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Изображение должно быть меньше 2МБ!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    return (
        <div className={styles.avatar}>
            <Upload
                className='avatar-uploader'
                showUploadList={false}
                action='http://localhost:5050/avatar'
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <Avatar
                        size={{ xs: 64, sm: 62, md: 120, lg: 184, xl: 240, xxl: 300 }}
                        src={imageUrl}
                    />
                    : <Avatar
                        size={{ xs: 64, sm: 62, md: 120, lg: 184, xl: 240, xxl: 300 }}
                        icon={<UserOutlined />}
                    />}
            </Upload>
        </div>

    );
}

export default AvatarComponent;