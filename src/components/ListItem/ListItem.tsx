import { Modal, Typography } from 'antd';
import { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import styles from './ListItem.module.scss';

interface ListItemProps {
    index: number;
    itemId: number;
    handleClick?(): void;
    handleDelete?(index: string): void;
    renderLabel: () => JSX.Element;
    renderDrawer?: (isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number) => JSX.Element;
}

function ListItem({
    index,
    itemId,
    renderLabel,
    handleDelete,
    handleClick,
    renderDrawer,
}: ListItemProps) {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const handleOnClick = () => {
        if (handleClick) {
            handleClick();
        }
        if (renderDrawer){
            console.log(isOpenDrawer);
            setOpenDrawer(!isOpenDrawer);
        }
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
            <Typography.Link className={styles.label} onClick={handleOnClick}>
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
            {
                renderDrawer ? renderDrawer(isOpenDrawer, setOpenDrawer, itemId) : <></>
            }
        </li>
    );
}

export default ListItem;