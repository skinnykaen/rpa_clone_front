import { List, notification } from "antd";
import { WithPaginationProps, withPaginationLocal } from "@/hocs";
import { Role, UsersList } from "@/__generated__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "@/graphql/query";
import ListItem from "@/components/ListItem";
import { useNavigate } from "react-router-dom";
import { PROFILE_PAGE_ROUTE } from "@/consts";
import { DELETE_USER } from "@/graphql/mutations";

type StudentsTabProps = WithPaginationProps & {
    isActive: boolean;
}

function StudentsTab({
    onChangePage,
    isActive,
    page,
    pageSize,
}: StudentsTabProps) {
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
    );
    const [deleteUser, deleteUserResult] = useMutation<{ DeleteUser: Response }, { id: string }>(
        DELETE_USER,
        {
            onError: error => {
                notification.error({
                    message: 'Ошибка',
                    description: error?.message,
                })
            },
            onCompleted: () => {
                notification.success({
                    message: 'Успешно!',
                    description: 'Пользователь удален.',
                });
            },
            refetchQueries: [
                {
                    query: GET_ALL_USERS,
                    variables: {
                        active: isActive,
                        roles: [Role.Student],
                    }
                },
            ]
        }
    );
    const navigate = useNavigate();
    const openProfileStudent = (userId: number): void => {
        navigate(PROFILE_PAGE_ROUTE, {
            state: {
                userId,
                userRole: Role.Student,
            },
        })
        return
    };
    return (
        <List
            className='students'
            loading={loading || deleteUserResult.loading}
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
            renderItem={(user, index) => (
                <ListItem
                    index={index}
                    label={`${user.lastname} ${user.firstname} ${user.middlename}`}
                    handleClick={() => openProfileStudent(Number(user.id))}
                    handleDelete={() => deleteUser({ variables: { id: String(user.id) } })}
                />
            )}
        />
    );
}

const WithPaginationComponent = withPaginationLocal(StudentsTab, 10);

export default WithPaginationComponent;