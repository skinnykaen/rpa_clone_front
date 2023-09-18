import { Button, Modal, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';

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
        if (renderDrawer) {
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
        <div className={styles.list_item}>
            <Typography.Text className={styles.label} onClick={handleOnClick}>
                {
                    renderLabel()
                }
            </Typography.Text >
            {
                handleDelete &&
                <Tooltip title='Удалить'>
                    <Button icon={<CloseOutlined />} onClick={showDeleteConfirm}/>
                </Tooltip>
            }
            {
                renderDrawer ? renderDrawer(isOpenDrawer, setOpenDrawer, itemId) : <></>
            }
        </div>
    );
}

export default ListItem;