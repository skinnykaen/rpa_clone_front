import { List } from "antd";

import { UserHttp } from "@/__generated__/graphql";
import ListItem from "@/components/ListItem";
import { WithPaginationProps, withPaginationLocal } from "@/hocs";
import { useState } from "react";

type UsersListProps = WithPaginationProps & {
    isLoading: boolean;
    users: UserHttp[] | undefined;
    countRows: number;
    // openDrawer(isOpen: boolean): void;
    handleDelete?(userId: number): void;
    // isOpenDrawer?: boolean;
    drawerRender?: (userId: number, isOpen: boolean, setOpen:(isOpen: boolean)=> void) => JSX.Element
}

function UsersListComponent({
    isLoading,
    users,
    countRows,
    // isOpenDrawer,
    page,
    pageSize,
    // openDrawer,
    handleDelete,
    drawerRender,
    onChangePage,
}: UsersListProps) {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
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
                <>
                    <ListItem
                        index={Number(user.id)}
                        renderLabel={() => <>{user.lastname} {user.firstname} {user.middlename}</>}
                        // handleClick={() => setOpenDrawer(!isOpenDrawer)}
                        handleDelete={() => handleDelete ? handleDelete(Number(user.id)) : undefined}
                    />
                    {/* {
                        drawerRender ? drawerRender(Number(user.id), isOpenDrawer, setOpenDrawer) : <></>
                    } */}
                </>
            )}
        />
    );
}

const WithPaginationComponent = withPaginationLocal(UsersListComponent, 10);

export default WithPaginationComponent;