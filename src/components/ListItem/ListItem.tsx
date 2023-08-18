import { Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import styles from './ListItem.module.scss';

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
            <Typography.Link className={styles.label} onClick={handleClick}>
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
        </li>
    );
}

export default ListItem;