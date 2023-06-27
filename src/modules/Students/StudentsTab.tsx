import { List, notification } from "antd";
import { WithPaginationProps, withPaginationLocal } from "@/hocs";
import { Role, UsersList } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "@/graphql/query";

type StudentsTabProps = WithPaginationProps & {
    isActive: boolean;
}

function StudentsTab({
    onChangePage,
    isActive,
    page,
    pageSize,
}:StudentsTabProps) {
    const { loading, data } = useQuery<{ GetAllUsers: UsersList }, { page?: number, pageSize?: number, active: boolean, roles: Role[] }>(
        GET_ALL_USERS,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            variables: {
                active: isActive,
                roles: [Role.Student],
            }
        }
    )
    return (
        <List
            className='students'
            loading={loading}
            bordered
            size='large'
            dataSource={data?.GetAllUsers.users}
            pagination={{
                onChange: onChangePage,
                total: data?.GetAllUsers.countRows,
                current: +page,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
            }}
            itemLayout='vertical'
            renderItem={(user) => (
                <p>{user.email}</p>
            )}
        />
    );
}

const withPaginationComponent = withPaginationLocal(StudentsTab, 10);

export default withPaginationComponent