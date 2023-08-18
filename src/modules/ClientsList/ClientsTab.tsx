import { List, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { useState } from "react";

import { WithPaginationProps, withPaginationLocal } from "@/hocs";
import { Role, UsersList } from "@/__generated__/graphql";
import { GET_ALL_USERS } from "@/graphql/query";
import ListItem from "@/components/ListItem";
import { DELETE_USER } from "@/graphql/mutations";
import { handlingGraphqlErrors } from "@/utils";
import ParentDrawer from "@/components/ParentDrawer";

type StudentsTabProps = WithPaginationProps & {
    isActive: boolean;
}

function ClientsTab({
    onChangePage,
    isActive,
    page,
    pageSize,
}: StudentsTabProps) {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const { loading, data } = useQuery<{ GetAllUsers: UsersList }, { page?: number, pageSize?: number, active: boolean, roles: Role[] }>(
        GET_ALL_USERS,
        {
            onError: error => {
                handlingGraphqlErrors(error);
            },
            variables: {
                active: isActive,
                roles: [Role.Parent],
            },
        },
    );
    const [deleteUser, deleteUserResult] = useMutation<{ DeleteUser: Response }, { id: string }>(
        DELETE_USER,
        {
            onError: error => {
                handlingGraphqlErrors(error);
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
                        roles: [Role.Parent],
                    },
                },
            ],
        },
    );
    const navigate = useNavigate();
    // const openProfileStudent = (userId: number): void => {
    //     navigate(PROFILE_PAGE_ROUTE, {
    //         state: {
    //             userId,
    //             userRole: Role.Parent,
    //         },
    //     })
    //     return
    // };
    const openParentDrawer = (isOpen: boolean) => {
        setOpenDrawer(isOpen);
    };
    return (
        <>
            <List
                className='clients'
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
                    <>
                        <ListItem
                            index={index}
                            rendreLabel={() => <>{user.lastname} {user.firstname} {user.middlename}</>}
                            handleClick={() => openParentDrawer(!isOpenDrawer)}
                            // handleClick={() => openProfileStudent(Number(user.id))}
                            handleDelete={() => deleteUser({ variables: { id: String(user.id) } })}
                        />
                        <ParentDrawer isOpen={isOpenDrawer} setOpen={setOpenDrawer} parentId={Number(user.id)} />
                    </>
                )}
            />
        </>
    );
}

const WithPaginationComponent = withPaginationLocal(ClientsTab, 10);

export default WithPaginationComponent;