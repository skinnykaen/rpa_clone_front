import { List } from "antd";

import { UserHttp } from "@/__generated__/graphql";
import ListItem from "@/components/ListItem";
import { WithPaginationProps, withPaginationLocal } from "@/hocs";

type UsersListProps = WithPaginationProps & {
    isLoading: boolean;
    users: UserHttp[] | undefined;
    countRows?: number;
    handleOnClick?(userId: number): void;
    handleDelete?(userId: number): void;
    renderDrawer?: (isOpen: boolean, setOpen: (isOpen: boolean) => void, userId: number,) => JSX.Element;
}

function UsersListComponent({
    isLoading,
    users,
    countRows = 0,
    page,
    pageSize,
    handleDelete,
    renderDrawer,
    onChangePage,
    handleOnClick,
}: UsersListProps) {
    return (
        <List
            className='user-list'
            loading={isLoading}
            bordered
            size='large'
            dataSource={users}
            pagination={{
                onChange: onChangePage,
                total: countRows,
                current: +page,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
            }}
            itemLayout='vertical'
            renderItem={(user, index) => (
                <ListItem
                    index={index}
                    itemId={Number(user.id)}
                    renderLabel={() => <>{user.lastname} {user.firstname} {user.middlename}</>}
                    renderDrawer={(isOpen, setOpen, itemId) => renderDrawer ? renderDrawer(isOpen, setOpen, Number(user.id)) : <></>}
                    handleDelete={handleDelete ? () => handleDelete(Number(user.id)) : undefined}
                    handleClick={handleOnClick ? () => handleOnClick(Number(user.id)): undefined}
                />
            )}
        />
    );
}

const WithPaginationComponent = withPaginationLocal(UsersListComponent, 10);

export default WithPaginationComponent;