import { Modal, Typography } from 'antd';
import { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import styles from './ListItem.module.scss';

import StudentDrawer from '@/components/StudentDrawer';

interface ListItemProps {
    index: number;
    renderLabel: () => JSX.Element
    handleDelete?(index: string): void;
    handleClick?(): void;
}

function ListItem({
    index,
    renderLabel,
    handleDelete,
    handleClick,
}: ListItemProps) {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const hanldeOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        setOpenDrawer(!isOpenDrawer);
    };
    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Вы точно хотите удалить?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Отмена',
            onOk() {
                handleDelete ? handleDelete(String(index)) : () => { return; };
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <li className={styles.list_item}>
            <Typography.Link className={styles.label} onClick={e => hanldeOnClick(e)}>
                {
                    renderLabel()
                }
            </Typography.Link >
            {
                handleDelete &&
                <button className={styles.delete_button} onClick={showDeleteConfirm}>
                    ×
                </button>
            }
            <StudentDrawer isOpen={isOpenDrawer} setOpen={setOpenDrawer} studentId={index} />
        </li>
    );
}

export default ListItem;