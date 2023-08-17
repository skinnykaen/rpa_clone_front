import { Modal, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styles from './ListItem.module.scss'

interface ListItemProps {
    index: number;
    rendreLabel: () => JSX.Element
    handleDelete?(index: string): void;
    handleClick?(): void;
}

function ListItem({
    index,
    rendreLabel,
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
                handleDelete ? handleDelete(String(index)) : () => { return };
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    return (
        <li className={styles.list_item}>
            <Typography.Link className={styles.label} onClick={handleClick}>
                {rendreLabel()}
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